// src/redux/AsyncThunk/ReservationThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReservationType } from '../../types';
import axios from 'axios';
import { apiUrls } from '../../utils/api';

// GET ALL
export const getAllReservations = createAsyncThunk<ReservationType[]>(
  'reservation/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/reservation'));
      // console.log(response.data);
      return response.data as ReservationType[];
    
    } catch (error) {
      return rejectWithValue('Impossible de récupérer les réservations');
    }
  }
);

// GET ONE
export const getReservationById = createAsyncThunk<ReservationType, number>(
  'reservation/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls(`api/reservation/${id}`));
      return response.data as ReservationType;
    } catch (error) {
      return rejectWithValue('Erreur récupération réservation');
    }
  }
);

// CREATE
export const createReservation = createAsyncThunk<
  ReservationType,
  {
    statut_reservation: string;
    montant_total?: number;
    client_id: number;
    services?: number[];
    created_at: string; // ✅ ajouté
  }
>('reservation/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(apiUrls('api/reservation'), payload);
    return response.data as ReservationType;
  } catch (error) {
    return rejectWithValue('Erreur création réservation');
  }
});

// UPDATE (PATCH)
export const updateReservation = createAsyncThunk<
  ReservationType,
  {
    id: number;
    statut_reservation?: string;
    montant_total?: number;
    client_id?: number;
    services?: number[];
  }
>('reservation/update', async ({ id, ...rest }, { rejectWithValue }) => {
  try {
    const response = await axios.put(apiUrls(`api/reservation/${id}`), rest);
    return response.data as ReservationType;
  } catch (error) {
    return rejectWithValue('Erreur mise à jour réservation');
  }
});

// DELETE
export const deleteReservation = createAsyncThunk<number, number>(
  'reservation/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/reservation/${id}`));
      return id;
    } catch (error) {
      return rejectWithValue('Erreur suppression réservation');
    }
  }
);