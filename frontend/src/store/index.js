// точка входа + здесь находится само хранилище
import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";

export default configureStore ({
    reducer: {
        profiles: profileReducer,
    },
})