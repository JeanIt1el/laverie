import { createSlice } from "@reduxjs/toolkit";
import { getAllMateriels, createMateriel, updateMateriel, deleteMateriel } from "../AsyncThunk/MaterielThunk";
import { ActionType, MaterielType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
    datas: MaterielType[];
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

const MaterielSlice = createSlice({
    name: 'Materiel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // *********** GET ALL MATERIELS ************* //
        builder
            .addCase(getAllMateriels.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllMateriels.fulfilled, (state, action) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllMateriels.rejected, (state) => {
                state.action.isLoading = false;
            });

        // *********** CREATE MATERIEL ************* //
        builder
            .addCase(createMateriel.pending, (state) => {
                state.action.isCreating = true;
            })
            .addCase(createMateriel.fulfilled, (state, action) => {
                state.action.isCreating = false;
                state.datas.push(action.payload); // ajoute le nouveau matériel à la liste
            })
            .addCase(createMateriel.rejected, (state) => {
                state.action.isCreating = false;
            });

        // *********** UPDATE MATERIEL ************* //
        builder
            .addCase(updateMateriel.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateMateriel.fulfilled, (state, action) => {
                state.action.isUpdating = false;
                const updatedMateriel = action.payload;
                const index = state.datas.findIndex(materiel => materiel.id === updatedMateriel.id);
                if (index !== -1) {
                    state.datas[index] = updatedMateriel; // met à jour le matériel modifié
                }
            })
            .addCase(updateMateriel.rejected, (state) => {
                state.action.isUpdating = false;
            });

        // *********** DELETE MATERIEL ************* //
        builder
            .addCase(deleteMateriel.pending, (state) => {
                state.action.isDeleting = true;
            })
            .addCase(deleteMateriel.fulfilled, (state, action) => {
                state.action.isDeleting = false;
                const deletedId = action.payload;
                state.datas = state.datas.filter(materiel => materiel.id !== deletedId); // supprime le matériel
            })
            .addCase(deleteMateriel.rejected, (state) => {
                state.action.isDeleting = false;
            });
    },
});

export const getMaterielState = (state: RootStateType) => state.Materiels;

export default MaterielSlice.reducer;