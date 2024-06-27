import { client } from "../client"
import type { definitions } from "../v1"

export function updateProfile(data: definitions["models.AddUserParams"]) {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
       formData.append(key, value as any)
    }
    return client.put("admin/users", {
        body: formData
    }).json()
}