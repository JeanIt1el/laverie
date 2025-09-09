// src/ServiceSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getAllServices } from "../AsyncThunk/ServiceThunk";
import { ServiceType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
  datas: ServiceType[];
  action: {
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
  };
  page: number;
};

const initialState: InitialStateType = {
  datas: [],
  action: {
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },
  page: 1,
};

const ServiceSlice = createSlice({
  name: 'Service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.action.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(getAllServices.rejected, (state) => {
        state.action.isLoading = false;
      });
  },
});

export const getServiceState = (state: RootStateType) => state.Service;
export default ServiceSlice.reducer;