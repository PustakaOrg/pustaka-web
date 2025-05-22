import { FormEvent } from "react";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Label } from "~/shared/components/ui/label";
import { Badge } from "~/shared/components/ui/badge";
import { X } from "lucide-react";
import { Separator } from "~/shared/components/ui/separator";

interface MemberFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const MemberForm = ({ handleSubmit }: MemberFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="account.email" className="text-right">
            Email
          </Label>
          <Input
            id="account.email"
            name="account.email"
            type="email"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="account.password" className="text-right">
            Password
          </Label>
          <Input
            id="account.password"
            name="account.password"
            type="password"
            min="1"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nis" className="text-right">
            NIS
          </Label>
          <Input
            id="nis"
            name="nis"
            type="text"
            min="1"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="account.fullname" className="text-right">
            Nama Lengkap
          </Label>
          <Input
            id="account.fullname"
            name="account.fullname"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="profile_picture" className="text-right">
            Foto Profil
          </Label>
          <div className="col-span-3">
            <Input
              id="profile_picture"
              name="profile_picture"
              type="file"
              accept="image/*"
              className="col-span-3"
            //   required
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone_number" className="text-right">
            No Handphone
          </Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="number"
            min="1"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="_class.name" className="text-right">
            Kelas
          </Label>
          <Input
            id="_class.name"
            name="_class.name"
            className="col-span-3"
            required
          />
        </div>
        <Separator />
        <Button className="w-25 items-right" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;
