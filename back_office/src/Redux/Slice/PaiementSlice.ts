import { createSlice } from "@reduxjs/toolkit";
import { getAllPaiements, createPaiement, updatePaiement, deletePaiement } from "../AsyncThunk/PaiementThunk";
import { PaiementType, ActionType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
  datas: PaiementType[];
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

const PaiementSlice = createSlice({
  name: "Paiement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPaiements.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getAllPaiements.fulfilled, (state, action) => {
        state.action.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(getAllPaiements.rejected, (state) => {
        state.action.isLoading = false;
      });

    builder
      .addCase(createPaiement.pending, (state) => {
        state.action.isCreating = true;
      })
      .addCase(createPaiement.fulfilled, (state, action) => {
        state.action.isCreating = false;
        state.datas.push(action.payload);
      })
      .addCase(createPaiement.rejected, (state) => {
        state.action.isCreating = false;
      });

    builder
      .addCase(updatePaiement.pending, (state) => {
        state.action.isUpdating = true;
      })
      .addCase(updatePaiement.fulfilled, (state, action) => {
        state.action.isUpdating = false;
        const updated = action.payload;
        const index = state.datas.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          state.datas[index] = updated;
        }
      })
      .addCase(updatePaiement.rejected, (state) => {
        state.action.isUpdating = false;
      });

    builder
      .addCase(deletePaiement.pending, (state) => {
        state.action.isDeleting = true;
      })
      .addCase(deletePaiement.fulfilled, (state, action) => {
        state.action.isDeleting = false;
        state.datas = state.datas.filter(p => p.id !== action.payload);
      })
      .addCase(deletePaiement.rejected, (state) => {
        state.action.isDeleting = false;
      });
  },
});

export const getPaiementState = (state: RootStateType) => state.Paiements;

export default PaiementSlice.reducer;