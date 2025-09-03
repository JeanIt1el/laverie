import { createSlice } from "@reduxjs/toolkit";
import { getAllServices, createService, updateService, deleteService } from "../AsyncThunk/ServiceThunk";
import { ActionType, ServiceType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
    datas: ServiceType[];
    action: ActionType & {
      isCreating?: boolean;
    };
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

const ServiceSlice = createSlice({
    name: 'Service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllServices.pending, (state) => { state.action.isLoading = true; })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllServices.rejected, (state) => { state.action.isLoading = false; });

        builder
            .addCase(createService.pending, (state) => { state.action.isCreating = true; })
            .addCase(createService.fulfilled, (state, action) => {
                state.action.isCreating = false;
                state.datas.push(action.payload);
            })
            .addCase(createService.rejected, (state) => { state.action.isCreating = false; });

        builder
            .addCase(updateService.pending, (state) => { state.action.isUpdating = true; })
            .addCase(updateService.fulfilled, (state, action) => {
                state.action.isUpdating = false;
                const index = state.datas.findIndex(s => s.id === action.payload.id);
                if (index !== -1) state.datas[index] = action.payload;
            })
            .addCase(updateService.rejected, (state) => { state.action.isUpdating = false; });

        builder
            .addCase(deleteService.pending, (state) => { state.action.isDeleting = true; })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.action.isDeleting = false;
                state.datas = state.datas.filter(s => s.id !== action.payload);
            })
            .addCase(deleteService.rejected, (state) => { state.action.isDeleting = false; });
    },
});

export const getServiceState = (state: RootStateType) => state.Service;
export default ServiceSlice.reducer;