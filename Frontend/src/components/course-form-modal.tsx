

// import  React from "react"

// import { useState } from "react"

// import { Upload } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// interface CourseFormModalProps {
//     isOpen: boolean
//     onClose: () => void
//     onSubmit: (data: any) => void
// }

// export default function CourseFormModal({ isOpen, onClose, onSubmit }: CourseFormModalProps) {
//     const [coursePhoto, setCoursePhoto] = useState<File | null>(null)
//     const [photoPreview, setPhotoPreview] = useState<string | null>(null)
//     const [formData, setFormData] = useState({
//         name: "",
//         level: "",
//         description: "",
//     })

//     const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0] || null
//         if (file) {
//             setCoursePhoto(file)
//             const reader = new FileReader()
//             reader.onload = () => {
//                 setPhotoPreview(reader.result as string)
//             }
//             reader.readAsDataURL(file)
//         }
//     }

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleSelectChange = (value: string) => {
//         setFormData((prev) => ({ ...prev, level: value }))
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         onSubmit({ ...formData, coursePhoto })
//         onClose()

//         // Reset form
//         setFormData({
//             name: "",
//             level: "",
//             description: "",
//         })
//         setCoursePhoto(null)
//         setPhotoPreview(null)
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="sm:max-w-[550px] md:max-w-[650px]">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold text-blue-600">Add Course</DialogTitle>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit} className="space-y-5 mt-4">
//                     <div className="space-y-2">
//                         <Label htmlFor="name" className="text-sm font-medium">
//                             Course Name<span className="text-red-500">*</span>
//                         </Label>
//                         <Input
//                             id="name"
//                             name="name"
//                             placeholder="Enter Instructor Name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="level" className="text-sm font-medium">
//                             Course Level<span className="text-red-500">*</span>
//                         </Label>
//                         <Select value={formData.level} onValueChange={handleSelectChange} required>
//                             <SelectTrigger id="level">
//                                 <SelectValue placeholder="Select Level" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="beginner">Beginner</SelectItem>
//                                 <SelectItem value="intermediate">Intermediate</SelectItem>
//                                 <SelectItem value="advance">Advance</SelectItem>
//                                 <SelectItem value="expert">Expert</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="description" className="text-sm font-medium">
//                             Course Description<span className="text-red-500">*</span>
//                         </Label>
//                         <Textarea
//                             id="description"
//                             name="description"
//                             placeholder="Enter Course Description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             rows={3}
//                             required
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label className="text-sm font-medium">
//                             Course Photo<span className="text-red-500">*</span>
//                         </Label>
//                         <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
//                             <input
//                                 type="file"
//                                 id="coursePhoto"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={handlePhotoChange}
//                                 required={!photoPreview}
//                             />
//                             <label
//                                 htmlFor="coursePhoto"
//                                 className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
//                             >
//                                 {photoPreview ? (
//                                     <div className="relative w-full h-32 mb-2">
//                                         <img
//                                             src={photoPreview || "/placeholder.svg"}
//                                             alt="Course preview"
//                                             className="object-contain"
//                                         />
//                                     </div>
//                                 ) : (
//                                     <Upload className="h-8 w-8 text-gray-400 mb-2" />
//                                 )}
//                                 <p className="text-sm text-center font-medium">Click to upload Course Photo</p>
//                                 <p className="text-xs text-gray-500 mt-1">Max File Size 15 Mb</p>
//                                 <div className="mt-2">
//                                     <div className="bg-blue-600 text-white w-6 h-6 rounded-sm flex items-center justify-center">
//                                         <span>+</span>
//                                     </div>
//                                 </div>
//                             </label>
//                         </div>
//                     </div>

//                     <DialogFooter className="mt-6">
//                         <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-10">
//                             Submit
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }



import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useCreateCourseMutation } from '@/store/slices/courseApi'
import { toast } from 'sonner'

interface CourseFormModalProps {
  isOpen: boolean
  onClose: () => void
  // onSubmit: (data: any) => void
  // course: any
}

export default function CourseFormModal({ isOpen, onClose }: CourseFormModalProps) {
  // const [coursePhoto, setCoursePhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    name: '',
    level: '',
    description: '',
    image: ''
  })
  const [createCourse] = useCreateCourseMutation()
  // useEffect(() => {
  //   if (course) {
  //     setFormData({
  //       name: course.name,
  //       level: course.level,
  //       description: course.description,
  //     })
  //     setPhotoPreview(course.photo || null)
  //   }
  // }, [course])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      // setCoursePhoto(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, level: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {

      createCourse({ ...formData, image: "https://tse3.mm.bing.net/th?id=OIP.eh5RRJ5l1pqHQDN1ubb1VAHaEx&pid=Api&P=0&h=180" })
      onClose()
    } catch (error: any) {
      console.log('err', error)
      const errors = error?.errors;
      const message = error?.errors;

      if (errors) {
        setFieldErrors(errors);
      } else if (message) {
        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    }

    // Reset form
    // setFormData({
    //   name: '',
    //   level: '',
    //   description: '',
    // })
    // setCoursePhoto(null)
    // setPhotoPreview(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] md:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            {/* {course ? 'Edit Course' : 'Add Course'} */}
            Add Course
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Course Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter Course Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-medium">
              Course Level<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.level} onValueChange={handleSelectChange} required>
              <SelectTrigger id="level" className='w-full'>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advance">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            {fieldErrors.level && <p className="text-sm text-red-600">{fieldErrors.level[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Course Description<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter Course Description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
            {fieldErrors.description && <p className="text-sm text-red-600">{fieldErrors.description[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Course Photo<span className="text-red-500">*</span>
            </Label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
              <input
                type="file"
                id="coursePhoto"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}

              />
              <label
                htmlFor="coursePhoto"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
              >
                {photoPreview ? (
                  <div className="relative w-full h-32 mb-2 flex justify-center">
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Course preview"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                )}
                <p className="text-sm text-center font-medium">Click to upload Course Photo</p>
                <p className="text-xs text-gray-500 mt-1">Max File Size 15 Mb</p>
              </label>
            </div>
            {fieldErrors.image && <p className="text-sm text-red-600">{fieldErrors.image}</p>}

          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-10">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

