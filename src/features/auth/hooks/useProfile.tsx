import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/getProfile'

const useProfile = () => {
  const {
    data: profile,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile()
  })

  if (isError) {
    // TODO:
    console.error("Error fetching profile:", error);
  }

  return { profile, isPending, isError, error}
}

export default useProfile
