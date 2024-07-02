import { client } from "~/api/client";

export function deleteBanner(id: number | undefined) {
    return client.delete(`app/banners/${id}`).json();
}