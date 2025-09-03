// src/redux/Slice/ModePaiementSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getAllModePaiements } from '../AsyncThunk/ModePaiementThunk';
import { ModePaiementEmbedded } from '../../types';

type InitialStateType = {
  datas: ModePaiementEmbedded[];
  action: { isLoading: boolean };
};

const initialState: InitialStateType = {
  datas: [],
  action: { isLoading: false },
};

const ModePaiementSlice = createSlice({
  name: 'ModePaiement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllModePaiements.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getAllModePaiements.fulfilled, (state, action) => {
        state.action.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(getAllModePaiements.rejected, (state) => {
        state.action.isLoading = false;
      });
  },
});

export const getModePaiementState = (state: any) => state.ModePaiement;
export default ModePaiementSlice.reducer;