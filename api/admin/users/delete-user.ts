import { client } from "~/api/client"

export function deleteUser(id: number | undefined) {
    return client.delete(`admin/users/${id}`).json();
}