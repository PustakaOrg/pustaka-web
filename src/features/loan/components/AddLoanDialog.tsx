import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { Plus } from "lucide-react";
import LoanForm from './LoanForm';

const AddLoanDialog = () => {
  return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Addbook
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
      <DialogTitle>Add New Book</DialogTitle>
				<LoanForm handleSubmit={()=>{}}/>
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
  )
}

export default AddLoanDialog
