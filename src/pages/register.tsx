import "antd/dist/antd.css" // or 'antd/dist/antd.less'

import { Button, Card, Form, Input, Row } from "antd"
import { useRouter } from "next/router"

import { useAppDispatch } from "../app/redux/hooks"
import { register } from "../app/redux/user/user.slice"
import User from "../domain/entities/User"

const tailLayout = {
    wrapperCol: { offset: 8, span: 10 },
}

export default function Register() {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        // await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        //     .then((userCredential) => {
        //         // Signed in
        //         const currentUser = userCredential.user;
        //         const user = new User(currentUser.uid, currentUser.email, true)
        //         dispatch(signIn(user))
        //         // ...
        //     })
        const newUser = new User(values.email, true)
        newUser.password = values.password
        await dispatch(register(newUser))

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
                <h1 style={{ fontSize: 40, textAlign: "center" }}>Register</h1>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label={"Email"}
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input placeholder={"Use a valid email"} style={{ width: 300 }} />
                    </Form.Item>

                    <Form.Item
                        label={"Password"}
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder={"At least 5 characters"} style={{ width: 300 }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Already have an account?
                    </Button>
                </div>
            </Card>
        </Row>
    )
}
