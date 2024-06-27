import { client } from "~/api/client";

export function deleteBrand(id: number | undefined) {
    return client.delete(`app/brands/${id}`).json();
}