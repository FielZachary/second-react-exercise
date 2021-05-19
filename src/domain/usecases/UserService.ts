import User from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export default class UserService {
    UserRepo: UserRepository

    constructor(ir: UserRepository) {
        this.UserRepo = ir
    }

    SignIn(user: User): User {
        return this.UserRepo.SignIn(user)
    }
}