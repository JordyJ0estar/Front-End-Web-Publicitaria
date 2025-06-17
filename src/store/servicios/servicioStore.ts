import type { StateCreator } from "zustand";
import type { IServicio } from "@/app/interfaces/serviceInterface"; 

export interface ServiciosSlice {
    servicio : IServicio | undefined;
    addServicio : (servicio : IServicio) => void;
    resetServicio : () => void;
}
export const CreateServicioSlice : StateCreator<ServiciosSlice> = (set) => ({
    servicio : undefined,
    addServicio : (servicio: IServicio) => set({servicio : servicio}),
    resetServicio : () => set({servicio : undefined}),
});