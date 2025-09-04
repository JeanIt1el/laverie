import { createSlice } from "@reduxjs/toolkit";
import { getAllClients, createClient, updateClient, deleteClient } from "../AsyncThunk/ClientThunk";
import { ActionType, ClientType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
    datas: ClientType[];
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

const ClientSlice = createSlice({
    name: 'Client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // *********** GET ALL CLIENTS ************* //
        builder
            .addCase(getAllClients.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllClients.rejected, (state) => {
                state.action.isLoading = false;
            });

        // *********** CREATE CLIENT ************* //
        builder
            .addCase(createClient.pending, (state) => {
                state.action.isCreating = true;
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.action.isCreating = false;
                state.datas.push(action.payload); // ajoute le nouveau client à la liste
            })
            .addCase(createClient.rejected, (state) => {
                state.action.isCreating = false;
            });

        // *********** UPDATE CLIENT ************* //
        builder
            .addCase(updateClient.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.action.isUpdating = false;
                const updatedClient = action.payload;
                const index = state.datas.findIndex(client => client.id === updatedClient.id);
                if (index !== -1) {
                    state.datas[index] = updatedClient; // met à jour le client modifié
                }
            })
            .addCase(updateClient.rejected, (state) => {
                state.action.isUpdating = false;
            });

        // *********** DELETE CLIENT ************* //
        builder
            .addCase(deleteClient.pending, (state) => {
                state.action.isDeleting = true;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.action.isDeleting = false;
                const deletedId = action.payload;
                state.datas = state.datas.filter(client => client.id !== deletedId); // supprime le client
            })
            .addCase(deleteClient.rejected, (state) => {
                state.action.isDeleting = false;
            });
    },
});

export const getClientState = (state: RootStateType) => state.Clients; // vérifie que c'est bien "Client" (pas "Clients")

export default ClientSlice.reducer;