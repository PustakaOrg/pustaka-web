import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/getProfile'

const useProfile = () => {
  let {
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

  if(profile!.hasOwnProperty("nis")){
    profile = profile as { id: string}

  }
  if(profile!.hasOwnProperty("nip")){
    profile = profile as {}
  }

  
  

  

  return { profile, isPending, isError, error}
}

export default useProfile
