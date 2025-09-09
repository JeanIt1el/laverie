// src/AsyncThunk/ServiceThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceType } from "../../types";
import axios from "axios";
import { apiUrls } from "../../utils/api";

export const getAllServices = createAsyncThunk<ServiceType[]>(
  'Service/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/service'));
      return response.data as ServiceType[];
    } catch (error: any) {
      console.error('Erreur lors de la récupération des services:', error);
      return rejectWithValue(error.response?.data?.message || 'Impossible de récupérer les services');
    }
  }
);
