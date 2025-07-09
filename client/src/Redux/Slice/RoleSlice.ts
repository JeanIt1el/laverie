import { createSlice } from "@reduxjs/toolkit";
import { getAllRoles } from "../AsyncThunk/RoleThunk";
import { ActionType, RoleType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
    datas: RoleType[] , 
    action : ActionType , 
    page : number 
}

const initialState: InitialStateType = {
    action: {
        isLoading: false,
        isDeleting: false,
        isUpdating: false
    },
    datas: [],
    page: 1,
}

const RoleSlice = createSlice({
    name : 'Role' , 
    initialState , 
    reducers : {
    } , 
    extraReducers ( builder ) {
        // ***************** Read ******************** //
        builder
        .addCase(getAllRoles.pending , ( state ) => {
            state.action.isLoading = true 
        })
        .addCase(getAllRoles.fulfilled , ( state , action: {payload :RoleType[] }  ) => {
            state.action.isLoading = false ; 
            state.datas = action.payload  
        })
        .addCase(getAllRoles.rejected , ( state ) => {
            state.action.isLoading = false ;
        })
    }
})

export const getRoleState = ( state: RootStateType ) => state.Roles
export default RoleSlice.reducer ; 
