// src/AsyncThunk/ReservationThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReservationType, CreateReservationDTO } from '../../types';
import axios from 'axios';
import { apiUrls } from '../../utils/api';

// Récupérer toutes les réservations
export const getAllReservations = createAsyncThunk<ReservationType[]>(
  'Reservation/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/reservation'));
      return response.data as ReservationType[];
    } catch (error: any) {
      console.error('Erreur lors de la récupération des réservations:', error);
      return rejectWithValue(error.response?.data?.message || 'Impossible de récupérer les réservations');
    }
  }
);

// Créer une réservation
export const createReservation = createAsyncThunk<
  ReservationType,
  CreateReservationDTO
>(
  'Reservation/create',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/reservation'), reservationData);
      return response.data as ReservationType;
    } catch (error: any) {
      console.error('Erreur lors de la création de la réservation:', error);
      return rejectWithValue(error.response?.data?.error || 'Échec de la réservation');
    }
  }
);