import { api } from "~/shared/utils/api"
import { Activity } from "~/types/entities/ActivityLog"
import { PaginatedResponse } from "~/types/responses"

export const getActivityLogs = () => {
  return api.get<PaginatedResponse<Activity>>("activity-logs/")
}
