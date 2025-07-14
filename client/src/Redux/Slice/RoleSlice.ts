import { createSlice } from "@reduxjs/toolkit";
import { getAllRoles, createRole, updateRole, deleteRole } from "../AsyncThunk/RoleThunk";
import { ActionType, RoleType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
    datas: RoleType[];
    action: ActionType & {
      isCreating?: boolean;
    };
    page: number;
};

const initialState: InitialStateType = {
    datas: [],
    action: {
        isLoading: false,
        isCreating: false,
        isDeleting: false,
        isUpdating: false,
    },
    
    page: 1,
};

const RoleSlice = createSlice({
    name: 'Role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // *********** GET ALL ROLES ************* //
        builder
            .addCase(getAllRoles.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllRoles.rejected, (state) => {
                state.action.isLoading = false;
            });

        // *********** CREATE ROLE ************* //
        builder
            .addCase(createRole.pending, (state) => {
                state.action.isCreating = true;
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.action.isCreating = false;
                state.datas.push(action.payload); // ajoute le nouveau rôle à la liste
            })
            .addCase(createRole.rejected, (state) => {
                state.action.isCreating = false;
            });

        // *********** UPDATE ROLE ************* //
        builder
            .addCase(updateRole.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.action.isUpdating = false;
                const updatedRole = action.payload;
                const index = state.datas.findIndex(role => role.id === updatedRole.id);
                if (index !== -1) {
                    state.datas[index] = updatedRole; // met à jour le rôle modifié
                }
            })
            .addCase(updateRole.rejected, (state) => {
                state.action.isUpdating = false;
            });

        // *********** DELETE ROLE ************* //
        builder
            .addCase(deleteRole.pending, (state) => {
                state.action.isDeleting = true;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.action.isDeleting = false;
                const deletedId = action.payload;
                state.datas = state.datas.filter(role => role.id !== deletedId); // supprime le rôle
            })
            .addCase(deleteRole.rejected, (state) => {
                state.action.isDeleting = false;
            });
    },
});

export const getRoleState = (state: RootStateType) => state.Roles; // vérifie que c’est bien "Role" (pas "Roles")

export default RoleSlice.reducer;
