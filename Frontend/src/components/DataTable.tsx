


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from './ui/badge'


interface Column {
  key: string
  label: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onEdit?: (row: any) => void
  handleDelete?: (row: any) => void
  handleAttendance?: (id: string, status: string) => void;
}

export function DataTable({ columns, data, handleDelete, handleAttendance, onEdit }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "attendance" ? (
                    <Badge variant={row[column.key] === "Attended" ? "success" : "destructive"}>
                      {row[column.key]}
                    </Badge>
                  ) : (
                    row[column.key]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* Edit Action */}
                    {onEdit &&
                      <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
                    }
                    {/* Delete Action */}
                    {handleDelete &&
                      <DropdownMenuItem onClick={() => handleDelete?.(row._id)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    }
                    {handleAttendance && <>

                      <DropdownMenuItem onClick={() => handleAttendance?.(row._id, `${row.attendance === "Attended" ? "Not Attended" : "Attended"}`)} >
                        {row.attendance === "Attended" ? "Not Attended" : "Attended"}
                      </DropdownMenuItem>
                    </>
                    }
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
