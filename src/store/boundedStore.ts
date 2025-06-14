import { create } from "zustand";
import { ProductosSlice } from "./productos/productoStore";
import { CreateProductoSlice } from "./productos/productoStore";
import { persist } from "zustand/middleware";

type BoudStore = ProductosSlice

export const useBoundStore = create<BoudStore>()(
    persist(
        (...a) => ({
            ...CreateProductoSlice(...a)
        }),
        {name:'boud-store'}
    )
)
