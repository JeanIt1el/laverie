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
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
      return rejectWithValue('Impossible de récupérer les services');
    }
  }
);

export const createService = createAsyncThunk<
  ServiceType,
  { denomination: string; description?: string; prix: number }
>(
  'Service/create',
  async (newServiceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/service'), newServiceData);
      return response.data as ServiceType;
    } catch (error) {
      console.error("Erreur lors de la création du service :", error);
      return rejectWithValue('Erreur création service');
    }
  }
);

export const updateService = createAsyncThunk<
  ServiceType,
  { id: number; denomination?: string; description?: string; prix?: number }
>(
  'Service/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls(`api/service/${id}`), updateData);
      return response.data as ServiceType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du service :", error);
      return rejectWithValue('Erreur mise à jour service');
    }
  }
);

export const deleteService = createAsyncThunk<number, number>(
  'Service/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/service/${id}`));
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression du service :", error);
      return rejectWithValue('Erreur suppression service');
    }
  }
);

export const getServiceById = createAsyncThunk<ServiceType, number>(
  'Service/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(apiUrls(`api/service/${id}`));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Erreur lors de la récupération du service');
    }
  }
);