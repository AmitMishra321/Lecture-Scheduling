
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { useDeleteCourseMutation, useGetCoursesQuery } from '@/store/slices/courseApi';
import { useState } from 'react';
import CourseFormModal from '@/components/course-form-modal';
import { DataTable } from '@/components/DataTable';
import { toast } from 'sonner';


function Course() {
  const { data: courses, refetch } = useGetCoursesQuery(undefined);
  const [deleteCourse] = useDeleteCourseMutation()
  const courseColumns = [
    { key: 'name', label: 'Course Name' },
    { key: 'level', label: 'Course Level' },
    { key: 'description', label: 'Course Description' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false)


  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    refetch();
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id).unwrap()
      toast.success('Course deleted')
      refetch()
    } catch (err) {
      toast.error('Failed to delete course')
    }
  }

  

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-primary shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="space-y-8">
          <section>
            <Header
              title="Courses"
              addButtonLabel="Add Courses"
              onAdd={handleOpenModal}
            />
            <DataTable columns={courseColumns} data={courses || []} onEdit={handleOpenModal} handleDelete={handleDelete} />
          </section>
        </div>
      </div>
      <CourseFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Course