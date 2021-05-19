import User from "../../domain/entities/User";
import {UserRepository} from "../../domain/repositories/UserRepository";

export default class UserRepositoryImpl implements UserRepository {

    SignIn(user: User): User {
        return user;
    }
}