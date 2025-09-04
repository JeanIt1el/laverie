import { configureStore } from '@reduxjs/toolkit';
import RoleReducer from './Slice/RoleSlice';
import ServiceReducer from './Slice/ServiceSlice';
import EmployeReducer from './Slice/EmployeSlice';
import PointageReducer from './Slice/PointageSlice';
import ClientReducer from './Slice/ClientSlice';
import MaterielReducer from './Slice/MaterielSlice';
import reservationReducer from './Slice/ReservationSlice';
import PaiementReducer from "./Slice/PaiementSlice";
import ModePaiementReducer from "./Slice/ModePaiementSlice";

export const store = configureStore({
  reducer: {
    Roles: RoleReducer,
    Service: ServiceReducer,
    Employe: EmployeReducer,
    Pointage: PointageReducer,
    Clients: ClientReducer,
    Materiels: MaterielReducer,
    reservation: reservationReducer,
    Paiements: PaiementReducer,
    ModePaiement: ModePaiementReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;