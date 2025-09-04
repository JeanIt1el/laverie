import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClientType } from "../../types"; // vérifie bien le chemin exact
import axios from "axios";
import { apiUrls } from "../../utils/api";


// zone de recuperation 
export const getAllClients = createAsyncThunk<ClientType[]>(
  'Client/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/client'));
      return response.data as ClientType[];
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return rejectWithValue('Impossible de récupérer les clients');
    }
  }
);

// zone de creation
export const createClient = createAsyncThunk<
  ClientType, 
  { 
    nom_client: string; 
    prenom_client: string; 
    email_client: string; 
    phone_client: string; 
    adresse_client: string; 
  }
>(
  'Client/create',
  async (newClientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/client'), newClientData);
      return response.data as ClientType;
    } catch (error) {
      console.error("Erreur lors de la création du client :", error);
      return rejectWithValue('Erreur création client');
    }
  }
);


// // zone de mise a jour
export const updateClient = createAsyncThunk<
  ClientType, 
  { 
    id: number; 
    nom_client?: string; 
    prenom_client?: string; 
    email_client?: string; 
    phone_client?: string; 
    adresse_client?: string; 
  }
>(
  'Client/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls(`api/client/${id}`), updateData);
      return response.data as ClientType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client :", error);
      return rejectWithValue('Erreur mise à jour client');
    }
  }
);


// zone de suppression 
export const deleteClient = createAsyncThunk<number, number>(
  'Client/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/client/${id}`));
      return id;  // on retourne l'id supprimé pour mise à jour du state
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
      return rejectWithValue('Erreur suppression client');
    }
  }
);


// zone de recuperation
export const getClientById = createAsyncThunk<ClientType, number>(
  'Client/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(apiUrls(`api/client/${id}`));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Erreur lors de la récupération du client');
    }
  }
);