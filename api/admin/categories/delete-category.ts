import { client } from "~/api/client";

export function deleteCategory(id: number | undefined) {
    return client.delete(`app/categories/${id}`).json();
}