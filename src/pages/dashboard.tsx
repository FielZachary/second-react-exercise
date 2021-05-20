import { useRouter } from "next/router"
import { useEffect } from "react"

import { useAppSelector } from "../app/redux/hooks"

export default function Dashboard() {
    const router = useRouter()
    const user = useAppSelector((state) => state.users.User)

    useEffect(() => {
        if (user.isSignedIn === false) {
            router.push("/landing")
        }
    })

    return <div>Dashboard</div>
}
