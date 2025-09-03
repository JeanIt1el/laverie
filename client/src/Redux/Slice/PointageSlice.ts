import { createSlice } from "@reduxjs/toolkit";
import { getAllPointages, createPointage, updatePointage, deletePointage } from "../AsyncThunk/PointageThunk";
import { ActionType, PointageType } from "../../types";
import { RootStateType } from "../Store";

type InitialStateType = {
    datas: PointageType[];
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

const PointageSlice = createSlice({
    name: 'Pointage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPointages.pending, (state) => { state.action.isLoading = true; })
            .addCase(getAllPointages.fulfilled, (state, action) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllPointages.rejected, (state) => { state.action.isLoading = false; });

        builder
            .addCase(createPointage.pending, (state) => { state.action.isCreating = true; })
            .addCase(createPointage.fulfilled, (state, action) => {
                state.action.isCreating = false;
                state.datas.push(action.payload);
            })
            .addCase(createPointage.rejected, (state) => { state.action.isCreating = false; });

        builder
            .addCase(updatePointage.pending, (state) => { state.action.isUpdating = true; })
            .addCase(updatePointage.fulfilled, (state, action) => {
                state.action.isUpdating = false;
                const index = state.datas.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.datas[index] = action.payload;
            })
            .addCase(updatePointage.rejected, (state) => { state.action.isUpdating = false; });

        builder
            .addCase(deletePointage.pending, (state) => { state.action.isDeleting = true; })
            .addCase(deletePointage.fulfilled, (state, action) => {
                state.action.isDeleting = false;
                state.datas = state.datas.filter(p => p.id !== action.payload);
            })
            .addCase(deletePointage.rejected, (state) => { state.action.isDeleting = false; });
    },
});

export const getPointageState = (state: RootStateType) => state.Pointage;
export default PointageSlice.reducer;