import User from "../entities/User";

export interface UserRepository {
    SignIn(user: User): User
}
