import type { StateCreator } from "zustand";
import type { IProducto } from "@/app/productos/productoInterface";

export interface ProductosSlice {
    producto : IProducto | undefined;
    addProducto : (producto : IProducto) => void;
    resetProducto : () => void;
}
export const CreateProductoSlice : StateCreator<ProductosSlice> = (set) => ({
    producto : undefined,
    addProducto : (producto: IProducto) => set({producto : producto}),
    resetProducto : () => set({producto : undefined}),
});