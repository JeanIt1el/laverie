// src/Store.ts
import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './Slice/ReservationSlice';
import serviceReducer from './Slice/ServiceSlice';
import clientReducer from './Slice/ClientSlice';

export const store = configureStore({
  reducer: {
    Reservation: reservationReducer,
    Service: serviceReducer,
    Client: clientReducer,
  },
});

export const getReservationState = (state: RootStateType) => state.Reservation;
export const getServiceState = (state: RootStateType) => state.Service;
export const getClientState = (state: RootStateType) => state.Client;

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;