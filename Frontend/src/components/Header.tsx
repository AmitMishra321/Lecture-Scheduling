import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

interface HeaderProps {
  title: string;
  addButtonLabel?: string;
  onAdd?: () => void;
  filters?: {
    courseName?: string;
    date?: string;
    attendance?: string;
  };
  onFilterChange?: (key: string, value: string) => void;
}

export function Header({ title, addButtonLabel, onAdd, filters, onFilterChange }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Course Filter */}
        {filters?.courseName !== undefined && (
          <Input
            placeholder="Course Name"
            className="w-full sm:w-[160px]"
            value={filters.courseName}
            onChange={(e) => onFilterChange?.("courseName", e.target.value)}
          />
        )}

        {/* Date Filter */}
        {filters?.date !== undefined && (
          <Input
            type="date"
            className="w-full sm:w-[160px]"
            value={filters.date}
            onChange={(e) => onFilterChange?.("date", e.target.value)}
          />
        )}

        {/* Attendance Filter */}
        {filters?.attendance !== undefined && (
          <Select
            onValueChange={(val) => onFilterChange?.("attendance", val)}
            value={filters.attendance}
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Attendance" />
            </SelectTrigger>
            <SelectContent>
            
              <SelectItem value="Attended">Attended</SelectItem>
              <SelectItem value="Not Attended">Not Attended</SelectItem>
            </SelectContent>
          </Select>
        )}
        {onAdd &&
          <Button className="w-full sm:w-auto cursor-pointer" onClick={() => onAdd?.()}>
            {addButtonLabel}
          </Button>
        }
      </div>
    </div>
  );
}