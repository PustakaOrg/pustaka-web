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
import { Plus } from "lucide-react";

const AddMemberDialog = () => {
  const { isPending, isError, error, addMember } = useAddMember();
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    addMember(form);
  }, []);
   return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Button>
          <Plus />
          Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
        <DialogTitle>Tambah Member</DialogTitle>
        <MemberForm handleSubmit={handleSubmit} error={error} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
