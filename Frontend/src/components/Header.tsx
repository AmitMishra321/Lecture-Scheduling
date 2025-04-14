import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  title: string;
  addButtonLabel?: string;
  onAdd?: () => void;
}

export function Header({ title, addButtonLabel, onAdd }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {onAdd &&
          <Button className="w-full sm:w-auto cursor-pointer" onClick={() => onAdd?.()}>
            {addButtonLabel}
          </Button>
        }
      </div>
    </div>
  );
}