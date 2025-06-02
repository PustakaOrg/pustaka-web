import { api } from "~/shared/utils/api"
import { Settings } from "~/types/entities/Settings"

export const getSettings = () => {
  return api.get<Settings>("settings/")
}
