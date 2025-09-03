// src/redux/Slice/ReservationSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../AsyncThunk/ReservationThunk';
import { ActionType, ReservationType } from '../../types';
import { RootStateType } from '../Store';

type InitialStateType = {
  datas: ReservationType[];
  selected: ReservationType | null;
  action: ActionType & { isCreating?: boolean };
  page: number;
};

const initialState: InitialStateType = {
  datas: [],
  selected: null,
  action: {
    isLoading: false,
    isCreating: false,
    isDeleting: false,
    isUpdating: false,
  },
  page: 1,
};

const ReservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getAllReservations.pending, (s) => { s.action.isLoading = true; })
      .addCase(getAllReservations.fulfilled, (s, a) => {
        s.action.isLoading = false;
        s.datas = a.payload;
      })
      .addCase(getAllReservations.rejected, (s) => { s.action.isLoading = false; });

    // GET ONE
    builder
      .addCase(getReservationById.pending, (s) => { s.action.isLoading = true; })
      .addCase(getReservationById.fulfilled, (s, a) => {
        s.action.isLoading = false;
        s.selected = a.payload;
      })
      .addCase(getReservationById.rejected, (s) => { s.action.isLoading = false; });

    // CREATE
    builder
      .addCase(createReservation.pending, (s) => { s.action.isCreating = true; })
      .addCase(createReservation.fulfilled, (s, a) => {
        s.action.isCreating = false;
        s.datas.push(a.payload);
      })
      .addCase(createReservation.rejected, (s) => { s.action.isCreating = false; });

    // UPDATE
    builder
      .addCase(updateReservation.pending, (s) => { s.action.isUpdating = true; })
      .addCase(updateReservation.fulfilled, (s, a) => {
        s.action.isUpdating = false;
        const idx = s.datas.findIndex(r => r.id === a.payload.id);
        if (idx !== -1) s.datas[idx] = a.payload;
      })
      .addCase(updateReservation.rejected, (s) => { s.action.isUpdating = false; });

    // DELETE
    builder
      .addCase(deleteReservation.pending, (s) => { s.action.isDeleting = true; })
      .addCase(deleteReservation.fulfilled, (s, a) => {
        s.action.isDeleting = false;
        s.datas = s.datas.filter(r => r.id !== a.payload);
      })
      .addCase(deleteReservation.rejected, (s) => { s.action.isDeleting = false; });
  },
});

export const getReservationState = (state: RootStateType) => state.reservation;
export default ReservationSlice.reducer;