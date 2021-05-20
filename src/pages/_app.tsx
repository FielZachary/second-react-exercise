import "../app/styles/globals.css"
// import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
// import { fetchList } from "../app/redux/item/item.slice"
import "firebase/auth"

import firebase from "firebase/app"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { Provider } from "react-redux"

import { useAppDispatch } from "../app/redux/hooks"
import { store } from "../app/redux/store"
import { CleanState, onAuthStateChange } from "../app/redux/user/user.slice"
import User from "../domain/entities/User"

const firebaseConfig = {
    apiKey: "AIzaSyDl9IiCvWKxaGl1fKvyWRJu3ShTbYbT_Fo",
    authDomain: "todo-5de9a.firebaseapp.com",
    projectId: "todo-5de9a",
    storageBucket: "todo-5de9a.appspot.com",
    messagingSenderId: "885055285273",
    appId: "1:885055285273:web:2161ea79cc72b41bfd2288",
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else {
    firebase.app() // if already initialized, use that one
}

export { firebase }

function MyApp({ Component, pageProps }) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((authenticated) => {
            if (authenticated) {
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then(() => {
                        // idTokenfinal = idToken
                        // setAuth(true)
                    })
                    .catch((e) => e)
                firebase.auth().onIdTokenChanged((user) => {
                    if (user) {
                        // User is signed in or token was refreshed.
                        user.getIdToken().then(() => {
                            // idTokenfinal = idToken
                        })
                    }
                })

                const currentUser = new User(authenticated.email, true)
                currentUser.uid = authenticated.uid

                dispatch(onAuthStateChange(currentUser))
            } else {
                dispatch(CleanState())
            }
        })
    }, [])

    return <Component {...pageProps} />
}

function MyAppWrapper({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <MyApp Component={Component} pageProps={pageProps} />
        </Provider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    pageProps: PropTypes.shape({}),
}

MyAppWrapper.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    pageProps: PropTypes.shape({}),
}

export default MyAppWrapper
