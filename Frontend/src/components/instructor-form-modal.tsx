// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { useCreateInstructorMutation, useUpdateInstructorMutation } from "@/store/slices/instructorApi";
// import { toast } from "sonner";



// interface InstructorFormModalProps {
//     isOpen: boolean;
//     onClose: () => void;

//     defaultValues?: {
//         name: string;
//         email: string;
//         phone: string;
//         password: string
//     };
// }


// interface InstructorFormData {
//     name: string;
//     email: string;
//     phone: string;
// }

// export default function InstructorFormModal({
//     isOpen,
//     onClose,

//     defaultValues,
// }: InstructorFormModalProps) {

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//     });
//     const [createInstructor] = useCreateInstructorMutation();
//     const [updateInstructor] = useUpdateInstructorMutation()
//     const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

//     useEffect(() => {
//         if (defaultValues) {
//             setFormData({
//                 name: defaultValues.name || "",
//                 email: defaultValues.email || "",
//                 phone: defaultValues.phone || "",
//                 password: defaultValues.password || "",
//             });

//         }
//     }, [defaultValues]);

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };



//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setFieldErrors({})

//         try {
//             // if (editData) {
//             //     await updateInstructor({ id: editData.id, ...data }).unwrap();
//             // } else {
//             await createInstructor({ ...formData, role: "admin" }).unwrap();
//             // }
//             toast.success("Instructor saved successfully!");
//             onClose();
//         } catch (error: any) {
//             const errors = error?.data?.errors;
//             if (errors) {
//                 setFieldErrors(errors); // 👈 Store field-specific errors
//             } else {
//                 toast("Something went wrong. Please try again.");
//             }
//         }
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="sm:max-w-[500px]">
//                 <DialogHeader>
//                     <DialogTitle className="text-xl font-semibold text-blue-600">
//                         {defaultValues ? "Edit Instructor" : "Add Instructor"}
//                     </DialogTitle>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit} className="space-y-5 mt-4">
//                     <div className="space-y-2">
//                         <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
//                         <Input
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                             placeholder="Enter instructor name"
//                         />
//                         {fieldErrors.name && (
//                             <p className="text-sm text-red-600">{fieldErrors.name[0]}</p>
//                         )}
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                             placeholder="Enter instructor email"
//                         />
//                         {fieldErrors.email && (
//                             <p className="text-sm text-red-600">{fieldErrors.email[0]}</p>
//                         )}
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="phone">Phone No<span className="text-red-500">*</span></Label>
//                         <Input
//                             id="phone"
//                             name="phone"
//                             type="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             required
//                             placeholder="Enter instructor Phone No."
//                         />
//                         {fieldErrors.phone && (
//                             <p className="text-sm text-red-600">{fieldErrors.phone[0]}</p>
//                         )}
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="email">Password<span className="text-red-500">*</span></Label>
//                         <Input
//                             id="password"
//                             name="password"
//                             type="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                             placeholder="Enter Password"
//                         />
//                         {fieldErrors.password && (
//                             <p className="text-sm text-red-600">{fieldErrors.password[0]}</p>
//                         )}
//                     </div>
//                     <DialogFooter>
//                         <Button type="submit" className="bg-blue-600 text-white px-6">
//                             {defaultValues ? "Update" : "Add"}
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }





import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  useCreateInstructorMutation,
  // useUpdateInstructorMutation
} from "@/store/slices/instructorApi";
import { toast } from "sonner";

interface InstructorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
  };
}

export default function InstructorFormModal({ isOpen, onClose }: InstructorFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [createInstructor] = useCreateInstructorMutation();
  // const [updateInstructor] = useUpdateInstructorMutation();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // useEffect(() => {
  //   if (defaultValues) {
  //     setFormData({
  //       name: defaultValues.name || '',
  //       email: defaultValues.email || '',
  //       phone: defaultValues.phone || '',
  //       password: '',
  //     });
  //   }
  // }, [defaultValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    try {
    //   if (defaultValues?._id) {
    //     const updatePayload = { ...formData };
    //     // Remove password if it's not provided
    //     if (!formData.password) {
    //       delete updatePayload.password;
    //     }
        
    //     // Send update request
    //     await updateInstructor({ id: defaultValues._id, data: updatePayload }).unwrap();
    //     toast.success("Instructor updated successfully");
    //   } else {
        await createInstructor({ ...formData, role: 'instructor' }).unwrap();
        toast.success("Instructor created successfully");
      // }
      onClose();
    } catch (error: any) {
      const errors = error?.data?.errors;
      if (errors) {
        setFieldErrors(errors);
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
            {/* {defaultValues ? "Edit Instructor" : "Add Instructor"} */}
            Add Instructor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
            <Input name="name" value={formData.name} onChange={handleInputChange} required />
            {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
            <Input name="email" value={formData.email} onChange={handleInputChange} required type="email" />
            {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone<span className="text-red-500">*</span></Label>
            <Input name="phone" value={formData.phone} onChange={handleInputChange} required />
            {fieldErrors.phone && <p className="text-sm text-red-600">{fieldErrors.phone[0]}</p>}
          </div>

          {/* {!defaultValues?._id && ( */}
            <div className="space-y-2">
              <Label htmlFor="password">Password<span className="text-red-500">*</span></Label>
              <Input name="password" value={formData.password} onChange={handleInputChange} required type="password" />
              {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password[0]}</p>}
            </div>
          {/* )} */}

          <DialogFooter>
            <Button type="submit" className="bg-blue-600 text-white px-6">
              {/* {defaultValues ? "Update" : "Add"} */} Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

