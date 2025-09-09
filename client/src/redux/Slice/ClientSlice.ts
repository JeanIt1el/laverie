// src/ClientSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null as null | {
    id: number;
    nom_client: string;
    prenom_client: string;
    email_client: string;
    phone_client: string;
    adresse_client: string;
  },
};

const clientSlice = createSlice({
  name: 'Client',
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.data = action.payload;
    },
    clearClient: (state) => {
      state.data = null;
    },
  },
});

export const { setClient, clearClient } = clientSlice.actions;
export default clientSlice.reducer;