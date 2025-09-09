// src/ReservationSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getAllReservations, createReservation } from '../AsyncThunk/ReservationThunk';
import { ReservationType } from '../../types';

type InitialStateType = {
  datas: ReservationType[];
  action: {
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
  };
};

const initialState: InitialStateType = {
  datas: [],
  action: {
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },
};

const reservationSlice = createSlice({
  name: 'Reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReservations.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.action.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(getAllReservations.rejected, (state) => {
        state.action.isLoading = false;
      });

    builder
      .addCase(createReservation.pending, (state) => {
        state.action.isCreating = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.action.isCreating = false;
        state.datas.push(action.payload);
      })
      .addCase(createReservation.rejected, (state) => {
        state.action.isCreating = false;
      });
  },
});

export default reservationSlice.reducer;