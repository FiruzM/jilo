import { client } from "~/api/client";

export function deleteSubcategory(id: number | undefined) {
    return client.delete(`app/subcategories/${id}`).json();
}