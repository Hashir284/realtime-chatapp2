import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import isSidebarOpenSliceReducer from "./sideBarButtonToogle" 
export const store = configureStore({
    reducer:{
        user:userReducer,
        isSidebarOpenSlice:isSidebarOpenSliceReducer
    }
})