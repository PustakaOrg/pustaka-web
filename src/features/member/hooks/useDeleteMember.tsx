import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../api/deleteMember";

const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const {
    data: deleteMemberById,
    isPending,
    isError,
    error,
    mutate: deletedMember,
  } = useMutation({
    mutationKey: ["remove-member"],
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => {},
  });
  queryClient.invalidateQueries({ queryKey: ["members"] });

  return {
    deleteMemberById,
    isPending,
    isError,
    error,
    deletedMember,
  };
};

export default useDeleteMember;
