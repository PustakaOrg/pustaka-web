import { api } from "~/shared/utils/api"

export const deleteCategory = (categoryId: String) => {
    return api.delete(`categories/${categoryId}/`)
}