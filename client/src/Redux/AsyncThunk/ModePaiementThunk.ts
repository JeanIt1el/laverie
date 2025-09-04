// src/redux/AsyncThunk/ModePaiementThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ModePaiementEmbedded } from '../../types';
import axios from 'axios';
import { apiUrls } from '../../utils/api';

export const getAllModePaiements = createAsyncThunk<ModePaiementEmbedded[]>(
  'modePaiement/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/mode-paiement'));
      return response.data as ModePaiementEmbedded[];
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des modes de paiement');
    }
  }
);