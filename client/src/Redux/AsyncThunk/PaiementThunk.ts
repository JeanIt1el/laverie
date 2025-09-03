import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrls } from "../../utils/api";
import { PaiementType } from "../../types";

export const getAllPaiements = createAsyncThunk<PaiementType[]>(
  'Paiement/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/paiement'));
      return response.data as PaiementType[];
    } catch (error) {
      console.error("Erreur lors de la récupération des paiements :", error);
      return rejectWithValue("Erreur lors de la récupération des paiements");
    }
  }
);

export const createPaiement = createAsyncThunk<
  PaiementType,
  { montant: number; status: string; reservation_id: number; mode_paiement_id?: number }
>(
  'Paiement/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/paiement'), payload);
      return response.data as PaiementType;
    } catch (error) {
      console.error("Erreur lors de la création du paiement :", error);
      return rejectWithValue("Erreur création paiement");
    }
  }
);

export const updatePaiement = createAsyncThunk<
  PaiementType,
  { id: number; montant?: number; status?: string; reservation_id?: number; mode_paiement_id?: number }
>(
  'Paiement/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(apiUrls(`api/paiement/${id}`), updateData);
      return response.data as PaiementType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du paiement :", error);
      return rejectWithValue("Erreur mise à jour paiement");
    }
  }
);

export const deletePaiement = createAsyncThunk<number, number>(
  'Paiement/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/paiement/${id}`));
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression du paiement :", error);
      return rejectWithValue("Erreur suppression paiement");
    }
  }
);

export const getPaiementById = createAsyncThunk<PaiementType, number>(
  'Paiement/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls(`api/paiement/${id}`));
      return response.data as PaiementType;
    } catch (error) {
      return rejectWithValue("Erreur lors de la récupération du paiement");
    }
  }
);