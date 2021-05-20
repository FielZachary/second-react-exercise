import "antd/dist/antd.css" // or 'antd/dist/antd.less'

import { Button, Card, Checkbox, Form, Input, Row } from "antd"
import { useRouter } from "next/router"

import { useAppDispatch } from "../app/redux/hooks"
import { signIn } from "../app/redux/user/user.slice"
import User from "../domain/entities/User"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 10 },
}

export default function Login() {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        const newUser = new User(values.email, true)
        newUser.password = values.password
        await dispatch(signIn(newUser))

        router.push("/dashboard")
    }

    const onFinishFailed = (errorInfo: any) => errorInfo

    const onFill = () => {
        form.setFieldsValue({
            note: "Hello world!",
            gender: "male",
        })
    }

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Card style={{ width: 350, height: 430 }}>
                <h1 style={{ fontSize: 40, textAlign: "center" }}>Login</h1>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input placeholder={"Email"} style={{ width: 300 }} />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input.Password placeholder={"Password"} style={{ width: 300 }} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="link" htmlType="button" onClick={onFill}>
                            Forgot Password or Username?
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    )
}
