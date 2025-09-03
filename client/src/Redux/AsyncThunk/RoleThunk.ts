import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoleType } from "../../types"; // vérifie bien le chemin exact
import axios from "axios";
import { apiUrls } from "../../utils/api";

export const getAllRoles = createAsyncThunk<RoleType[]>(
  'Role/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls('api/role'));
      return response.data as RoleType[];
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return rejectWithValue('Impossible de récupérer les rôles');
    }
  }
);


export const createRole = createAsyncThunk<RoleType, { nom_role: string; description_role?: string }>(
    'Role/create',
    async (newRoleData, { rejectWithValue }) => {
      try {
        const response = await axios.post(apiUrls('api/role'), newRoleData);
        return response.data as RoleType;
      } catch (error) {
        console.error("Erreur lors de la création du rôle :", error);
        return rejectWithValue('Erreur création rôle');
      }
    }
  );


  export const updateRole = createAsyncThunk<
  RoleType, 
  { id: number; nom_role?: string; description_role?: string }
>(
  'Role/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls(`api/role/${id}`), updateData);
      return response.data as RoleType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle :", error);
      return rejectWithValue('Erreur mise à jour rôle');
    }
  }
);


export const deleteRole = createAsyncThunk<number, number>(
    'Role/delete',
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(apiUrls(`api/role/${id}`));
        return id;  // on retourne l'id supprimé pour mise à jour du state
      } catch (error) {
        console.error("Erreur lors de la suppression du rôle :", error);
        return rejectWithValue('Erreur suppression rôle');
      }
    }
  );
  
  export const getRoleById = createAsyncThunk<RoleType, number>(
    'Role/getById',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(apiUrls(`api/role/${id}`));
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Erreur lors de la récupération du rôle');
      }
    }
  );