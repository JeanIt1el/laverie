import { createAsyncThunk } from "@reduxjs/toolkit";
import { MaterielType } from "../../types"; // vérifie bien le chemin exact
import axios from "axios";
import { apiUrls } from "../../utils/api";

export const getAllMateriels = createAsyncThunk<MaterielType[]>(
  'Materiel/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/materiel'));
      return response.data as MaterielType[];
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return rejectWithValue('Impossible de récupérer les matériels');
    }
  }
);

export const createMateriel = createAsyncThunk<
  MaterielType, 
  { 
    nom_materiel: string; 
    type_materiel: string; 
    etat_materiel: string; 
    quantite: number; 
    service_id?: number; 
  }
>(
  'Materiel/create',
  async (newMaterielData, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/materiel'), newMaterielData);
      return response.data as MaterielType;
    } catch (error) {
      console.error("Erreur lors de la création du matériel :", error);
      return rejectWithValue('Erreur création matériel');
    }
  }
);


// zone de reuperation 
export const updateMateriel = createAsyncThunk<
  MaterielType, 
  { 
    id: number; 
    nom_materiel?: string; 
    type_materiel?: string; 
    etat_materiel?: string; 
    quantite?: number; 
    service_id?: number | null; 
  }
>(
  'Materiel/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls(`api/materiel/${id}`), updateData);
      console.log(response);
      
      return response.data as MaterielType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du matériel :", error);
      return rejectWithValue('Erreur mise à jour matériel');
    }
  }
);

export const deleteMateriel = createAsyncThunk<number, number>(
  'Materiel/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/materiel/${id}`));
      return id;  // on retourne l'id supprimé pour mise à jour du state
    } catch (error) {
      console.error("Erreur lors de la suppression du matériel :", error);
      return rejectWithValue('Erreur suppression matériel');
    }
  }
);

export const getMaterielById = createAsyncThunk<MaterielType, number>(
  'Materiel/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(apiUrls(`api/materiel/${id}`));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Erreur lors de la récupération du matériel');
    }
  }
);