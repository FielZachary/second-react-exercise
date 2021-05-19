export default class User {
    uid: string

    email: string

    isSignedIn: boolean

    constructor(uid: string, email: string, isSignedIn: boolean) {
        this.uid = uid
        this.email = email
        this.isSignedIn = isSignedIn
    }
}