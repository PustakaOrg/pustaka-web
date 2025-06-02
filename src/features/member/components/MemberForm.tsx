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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="account.email" className="text-right">
            Email
          </Label>
          <Input
            id="account.email"
            name="account.email"
            type="email"
            placeholder="Enter member email"
            className="col-span-3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="account.password" className="text-right">
            Password
          </Label>
          <Input
            id="account.password"
            name="account.password"
            type="password"
            min="1"
            placeholder="Enter member password"
            className="col-span-3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nis" className="text-right">
            NIS
          </Label>
          <Input
            id="nis"
            name="nis"
            type="text"
            min="1"
            placeholder="Enter member NIS"
            className="col-span-3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="account.fullname" className="text-right">
            Nama Lengkap
          </Label>
          <Input
            id="account.fullname"
            name="account.fullname"
            type="text"
            placeholder="Enter member fullname"
            className="col-span-3"
            required
          />
        </div>
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label htmlFor="phone_number" className="text-right">
            No Handphone
          </Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="number"
            min="1"
            placeholder="Enter member phone number"
            className="col-span-3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="_class.name" className="text-right">
            Kelas
          </Label>
          <Input
            id="_class.name"
            name="_class.name"
            placeholder="Enter member class"
            className="col-span-3"
            required
          />
        </div>
        <Separator />
        <Button className="cursor-pointer w-full items-right" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;
