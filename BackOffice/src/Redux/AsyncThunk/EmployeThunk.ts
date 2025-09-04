import { createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeType, ServiceType, RoleType } from '../../types';
import axios from 'axios';
import { apiUrls } from '../../utils/api';

// Récupération des services et rôles depuis le store
let services: ServiceType[] = [];
let roles: RoleType[] = [];

export const preloadServicesAndRoles = async () => {
  if (services.length === 0) {
    const resServices = await axios.get(apiUrls('api/service'));
    services = resServices.data as ServiceType[];
  }
  if (roles.length === 0) {
    const resRoles = await axios.get(apiUrls('api/role'));
    roles = resRoles.data as RoleType[];
  }
};


// zone de recuperation 
export const getAllEmployes = createAsyncThunk<EmployeType[]>(
  'Employe/getAll',
  async (_, { rejectWithValue }) => {
    try {
      await preloadServicesAndRoles();

      const response = await axios.get(apiUrls('api/employe'));
      const data = response.data as any[];
      // console.log(data);
      

      return data.map((e) => ({
        ...e,
        role: roles.find((r) => r.id === e.role) || null,
        services: Array.isArray(e.services)
          ? e.services.map((id: number) =>
              services.find((s) => s.id === id)
            ).filter(Boolean) as ServiceType[]
          : [],
      })) as EmployeType[];
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
      return rejectWithValue('Impossible de récupérer les employés');
    }
  }
);

// --- CREATE ---
export const createEmploye = createAsyncThunk<
  EmployeType,
  {
    nom: string;
    prenoms: string;
    email: string;
    phone: string;
    cin: string;
    service_ids?: number[]; // ✅ remplace `service?: number`
    role?: number;
  }
>(
  'Employe/create',
  async (newEmployeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/employe'), newEmployeData);
      return response.data as EmployeType;
    } catch (error) {
      console.error("Erreur lors de la création de l'employé :", error);
      return rejectWithValue('Erreur création employé');
    }
  }
);

// --- UPDATE ---
export const updateEmploye = createAsyncThunk<
  EmployeType,
  {
    id: number;
    nom?: string;
    prenoms?: string;
    email?: string;
    phone?: string;
    cin?: string;
    service_ids?: number[]; // ✅ remplace `service?: number | null`
    role?: number | null;
  }
>(
  'Employe/update',
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls(`api/employe/${id}`), updateData);
      return response.data as EmployeType;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé :", error);
      return rejectWithValue('Erreur mise à jour employé');
    }
  }
);

// --- DELETE ---
export const deleteEmploye = createAsyncThunk<number, number>(
  'Employe/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(apiUrls(`api/employe/${id}`));
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      return rejectWithValue('Erreur suppression employé');
    }
  }
);

// --- GET BY ID ---
export const getEmployeById = createAsyncThunk<EmployeType, number>(
  'Employe/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrls(`api/employe/${id}`));
      return response.data as EmployeType;
    } catch (error) {
      return rejectWithValue("Erreur lors de la récupération de l'employé");
    }
  }
);

// --- GET BY SERVICE IDs ---
export const getEmployeesByServiceIds = createAsyncThunk<EmployeType[], number[]>(
  'Employe/getByServiceIds',
  async (serviceIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrls('api/employe/by-services'), { serviceIds });
      return response.data as EmployeType[];
    } catch (error) {
      console.error("Erreur lors de la récupération des employés par services :", error);
      return rejectWithValue('Erreur récupération employés par services');
    }
  }
);