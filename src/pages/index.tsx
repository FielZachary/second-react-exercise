// import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
// import { fetchList } from "../app/redux/item/item.slice"

// import "firebase/auth";
//
// import firebase from "firebase/app";
import { useRouter } from "next/router"
import { useEffect } from "react"

import { useAppSelector } from "../app/redux/hooks"

// const firebaseConfig = {
//     apiKey: "AIzaSyDl9IiCvWKxaGl1fKvyWRJu3ShTbYbT_Fo",
//     authDomain: "todo-5de9a.firebaseapp.com",
//     projectId: "todo-5de9a",
//     storageBucket: "todo-5de9a.appspot.com",
//     messagingSenderId: "885055285273",
//     appId: "1:885055285273:web:2161ea79cc72b41bfd2288"
// };
//
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }else {
//     firebase.app(); // if already initialized, use that one
// }
//
//
//
// export { firebase }

export default function Home() {
    const user = useAppSelector((state) => state.users.User)
    const router = useRouter()
    // const items = useAppSelector((state) => state.items.items)
    // const loading = useAppSelector((state) => state.items.loading)
    // const dispatch = useAppDispatch()
    // const handleClick = () => {
    //     dispatch(fetchList())
    // }

    useEffect(() => {
        if (user.isSignedIn === false) {
            router.push("/login")
        } else if (user.isSignedIn === true) {
            router.push("/dashboard")
        }
    })

    return <div>Loading</div>
}
