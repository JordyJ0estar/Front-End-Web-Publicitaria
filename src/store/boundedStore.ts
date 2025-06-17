import { create } from "zustand";
import { ProductosSlice } from "./productos/productoStore";
import { CreateProductoSlice } from "./productos/productoStore";
import { persist } from "zustand/middleware";
import { ServiciosSlice } from "./servicios/servicioStore";
import { CreateServicioSlice } from "./servicios/servicioStore";

type BoudStore = ProductosSlice & ServiciosSlice;

export const useBoundStore = create<BoudStore>()(
    persist(
        (...a) => ({
            ...CreateProductoSlice(...a) ,
            ...CreateServicioSlice(...a)
        }),
        {name:'boud-store'}
    )
)
