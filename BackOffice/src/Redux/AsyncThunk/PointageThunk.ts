// src/redux/thunks/pointageThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PointageType } from "../../types";
import axios from "axios";
import { apiUrls } from "../../utils/api";


export const getAllPointages = createAsyncThunk<PointageType[]>(
  'Pointage/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/pointage'));
      return response.data as PointageType[];
    } catch (error) {
      console.error('Erreur lors de la récupération des pointages:', error);
      return rejectWithValue('Impossible de récupérer les pointages');
    }
  }
);


function toMySQLDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 19).replace('T', ' ');
}

export const createPointage = createAsyncThunk<
  PointageType,
  {
    employe_id: number;
    heure_debut: string;
    heure_fin: string;
    remarque?: string;
  }
>(
  'Pointage/create',
  async (newPointageData, { rejectWithValue }) => {
    try {
      const payload = {
        employe_id: newPointageData.employe_id,
        heure_debut: toMySQLDate(newPointageData.heure_debut),
        heure_fin: toMySQLDate(newPointageData.heure_fin),
        remarque: newPointageData.remarque,
      };

      console.log('📦 Payload envoyé :', payload);

      const response = await axios.post(apiUrls('api/pointage'), payload);
      return response.data as PointageType;
    } catch (error) {
      console.error("Erreur lors de la création du pointage :", error);
      return rejectWithValue('Erreur création pointage');
    }
  }
);




export const updatePointage = createAsyncThunk<
  PointageType,
  {
    id: number;
    heure_debut?: string;
    heure_fin?: string;
    remarque?: string;
    employe?: number;
  }
>(
  'Pointage/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls(`api/pointage/${id}`), updateData);
      return response.data as PointageType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pointage :", error);
      return rejectWithValue('Erreur mise à jour pointage');
    }
  }
);


export const deletePointage = createAsyncThunk<number, number>(
  'Pointage/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/pointage/${id}`));
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression du pointage :", error);
      return rejectWithValue('Erreur suppression pointage');
    }
  }
);


export const getPointageById = createAsyncThunk<PointageType, number>(
  'Pointage/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(apiUrls(`api/pointage/${id}`));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur lors de la récupération du pointage");
    }
  }
);