import {configureStore} from "@reduxjs/toolkit";
import post from "./post";
import api from "./middleware/api";

export default configureStore({
    reducer: {
        post
    },
    middleware: [api]
})