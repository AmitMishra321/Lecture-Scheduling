import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateLectureMutation } from "@/store/slices/lectureApi";
import { useGetCoursesQuery } from "@/store/slices/courseApi";


interface InstructorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: {
    _id?: string;
    instructor: string;
    course: string;
    date: string;
    startTime: string;
    duration: number;
  };
}

export default function LectureFormModal({ isOpen, onClose, defaultValues }: InstructorFormModalProps) {
  const [formData, setFormData] = useState({
    instructor: '',
    course: '',
    date: '',
    startTime: '',
    duration: 0,
  });

  const [createLecture] = useCreateLectureMutation();
  // const [updateAllLecture] = useUpdateAttendanceMutation();
  const { data: courses, refetch } = useGetCoursesQuery(undefined);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        instructor: defaultValues.instructor || '',
        course: defaultValues.course || '',
        date: defaultValues.date || '',
        startTime: defaultValues.startTime || '',
        duration: defaultValues.duration || 0,
      });
    }
  }, [defaultValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    try {
      if (defaultValues?._id) {
        // const updatePayload = { ...formData };
        // Remove password if it's not provided


        // Send update request
        // await updateAllLecture({ id: defaultValues._id, data: updatePayload }).unwrap();
        toast.success("Instructor updated successfully");
      } else {
        await createLecture({ ...formData, duration: Number(formData.duration) }).unwrap();
        toast.success("Lecture created successfully");
        refetch();
      }
      onClose();
    }
    catch (error: any) {
      const errors = error?.data?.errors;
      const message = error?.data?.message;

      if (errors) {
        setFieldErrors(errors);
      } else if (message) {
        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    }

  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-600">
            {defaultValues ? "Edit Lectures" : "Add Lectures"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor<span className="text-red-500">*</span></Label>
            <Input name="instructor" value={formData.instructor} onChange={handleInputChange} required />
            {fieldErrors.instructor && <p className="text-sm text-red-600">{fieldErrors.instructor[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="course" className="text-sm font-medium">
              Course<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.course} onValueChange={handleSelectChange} required >
              <SelectTrigger id="course" className="w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>

                {courses?.length ? (
                  courses.map((course: { _id: string; name: string }) => (
                    <SelectItem value={course._id} key={course._id}>
                      {course.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No courses available
                  </SelectItem>
                )}



              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <Label htmlFor="date">Lecture Date<span className="text-red-500">*</span></Label>
            <Input name="date" value={formData.date} onChange={handleInputChange} required type="date" />
            {fieldErrors.date && <p className="text-sm text-red-600">{fieldErrors.date[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Lecture Time<span className="text-red-500">*</span></Label>
            <Input name="startTime" value={formData.startTime} onChange={handleInputChange} required type="time" />
            {fieldErrors.startTime && <p className="text-sm text-red-600">{fieldErrors.startTime[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (IN MIN.)<span className="text-red-500">*</span></Label>
            <Input name="duration" value={formData.duration} onChange={handleInputChange} required type="number" />
            {fieldErrors.duration && <p className="text-sm text-red-600">{fieldErrors.duration[0]}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-blue-600 text-white px-6">
              {defaultValues ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
