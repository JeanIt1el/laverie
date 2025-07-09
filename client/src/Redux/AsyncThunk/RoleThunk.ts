import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoleType } from "../../types";
import axios from "axios";
import { apiUrls } from "../../utils/api";

export const getAllRoles = createAsyncThunk('Role/getall', async () => {
    let datas: RoleType[] = []
    console.log('tonga');
    
    await axios.get(apiUrls('api/role'))
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas
});