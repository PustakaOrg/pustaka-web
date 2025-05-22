import { Button } from "~/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/shared/components/ui/dialog";
import MemberForm from "./MemberForm";
import useAddMember from "../hooks/useAddMember";
import { FormEvent, useCallback, useEffect } from "react";

const AddMemberDialog = () => {
  const { isPending, isError, error, addMember } = useAddMember();
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    addMember(form);
  }, []);

  useEffect(() => {
    console.log("Pending", isPending);
    console.log("isError", isError);
    console.log("error", error);
  }, [isPending, isError, error]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add member</Button>
      </DialogTrigger>
      <DialogContent>
        <MemberForm handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
