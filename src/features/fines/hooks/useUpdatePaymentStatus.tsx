import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPayment, PatchPaymentPayload } from "../api/patchPayment";

const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient()
	const {
		data: newPayment,
		isPending,
		isError,
		error,
		mutate: updatePaymentStatus,
	} = useMutation({
		mutationKey: ["update-payment"],
		mutationFn: ({
			id,
			payload,
		}: { id: string; payload: PatchPaymentPayload }) =>
			patchPayment(id, payload),
		onSuccess: () => {
      queryClient.refetchQueries({queryKey: ["fines"]})
    },
	});
	return {
		newPayment,
		isPending,
		isError,
		error,
		updatePaymentStatus,
	};
};

export default useUpdatePaymentStatus;
