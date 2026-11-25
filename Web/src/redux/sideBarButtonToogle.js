import { createSlice } from "@reduxjs/toolkit";

const isSidebarOpenSlice = createSlice({
    name:"isSidebarOpen",
    initialState:{    
        isOpen:true
    },  //setUserData("ayush")
    reducers:{
        onClose(state, action){
            state.isOpen= !state.isOpen
        }
    }
})

export const { onClose } = isSidebarOpenSlice.actions
export default isSidebarOpenSlice.reducer