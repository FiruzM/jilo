import { client } from "~/api/client";

export function deleteProduct(id: number | undefined) {
    return client.delete(`app/products/${id}`).json();
}