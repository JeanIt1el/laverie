import { createSlice } from "@reduxjs/toolkit";
import {
  getAllEmployes,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getEmployeesByServiceIds,
} from "../AsyncThunk/EmployeThunk";
import { ActionType, EmployeType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
  datas: EmployeType[];
  action: ActionType & { isCreating?: boolean };
  page: number;
};

const initialState: InitialStateType = {
  datas: [],
  action: {
    isLoading: false,
    isCreating: false,
    isDeleting: false,
    isUpdating: false,
  },
  page: 1,
};

const EmployeSlice = createSlice({
  name: "Employe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- getAllEmployes ---
    builder
      .addCase(getAllEmployes.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getAllEmployes.fulfilled, (state, action) => {
        state.action.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(getAllEmployes.rejected, (state) => {
        state.action.isLoading = false;
      });

    // --- createEmploye ---
    builder
      .addCase(createEmploye.pending, (state) => {
        state.action.isCreating = true;
      })
      .addCase(createEmploye.fulfilled, (state, action) => {
        state.action.isCreating = false;
        state.datas.push(action.payload);
      })
      .addCase(createEmploye.rejected, (state) => {
        state.action.isCreating = false;
      });

    // --- updateEmploye ---
    builder
      .addCase(updateEmploye.pending, (state) => {
        state.action.isUpdating = true;
      })
      .addCase(updateEmploye.fulfilled, (state, action) => {
        state.action.isUpdating = false;
        const index = state.datas.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.datas[index] = action.payload;
      })
      .addCase(updateEmploye.rejected, (state) => {
        state.action.isUpdating = false;
      });

    // --- deleteEmploye ---
    builder
      .addCase(deleteEmploye.pending, (state) => {
        state.action.isDeleting = true;
      })
      .addCase(deleteEmploye.fulfilled, (state, action) => {
        state.action.isDeleting = false;
        state.datas = state.datas.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmploye.rejected, (state) => {
        state.action.isDeleting = false;
      });

    // --- getEmployeesByServiceIds ---
    builder
      .addCase(getEmployeesByServiceIds.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getEmployeesByServiceIds.fulfilled, (state, action) => {
        state.action.isLoading = false;
        const newEmployees = action.payload.filter(
          (newEmp) => !state.datas.some((existing) => existing.id === newEmp.id)
        );
        state.datas.push(...newEmployees);
      })
      .addCase(getEmployeesByServiceIds.rejected, (state) => {
        state.action.isLoading = false;
      });
  },
});

export const getEmployeState = (state: RootStateType) => state.Employe;
export default EmployeSlice.reducer;