import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl";
import User from "../../../domain/entities/User";
import UserService from "../../../domain/usecases/UserService";


// Define a type for the slice state
interface CounterState {
    User: User
}

// Define the initial state using that type
const initialState: CounterState = {
    User: {uid: "", email: "", isSignedIn: null},
}

export const signIn = createAsyncThunk("user/signIn",  (currentUser: User) => {
    const userRepo = new UserRepositoryImpl()
    const userService = new UserService(userRepo)
    console.log('in sign in, before return')
    const user = userService.SignIn(currentUser)
    return user
})
export const userSlice = createSlice({
    name: "user",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => ({
            ...state,
            User: action.payload
        }))
    },
})

