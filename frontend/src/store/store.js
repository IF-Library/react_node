// Configuramos o reducer neste arquivo e importamos lá na index.js 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import userReducer from "../slices/userSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
})