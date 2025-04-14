
// import { DataTable } from '@/components/DataTable'
// import { Header } from '@/components/Header'
// import InstructorFormModal from '@/components/instructor-form-modal';
// import { Sidebar } from '@/components/Sidebar'
// import { useGetAllInstructorsQuery } from '@/store/slices/instructorApi';
// import { useState } from 'react';
// // import { RootState } from '@/store';
// // import { useSelector } from 'react-redux';

// function Instructor() {
//   const { data: instructors, refetch } = useGetAllInstructorsQuery();
//   const [isModalOpen, setIsModalOpen] = useState(false)


//   const handleOpenModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleCloseModal = () => {
//     refetch();
//     setIsModalOpen(false)
//   }



//   const instructorColumns = [
//     { key: 'name', label: 'Instructor Name' },
//     { key: 'phone', label: 'Phone Number' },
//     { key: 'email', label: 'Email' },
//   ];
//   return (
//     <div className="flex min-h-screen bg-white">
//       <div className="w-64 bg-primary shadow-lg">
//         <Sidebar />
//       </div>
//       <div className="flex-1 p-8">
//         <div className="space-y-8">
//           <section>
//             <Header
//               title="Instructor List"
//               addButtonLabel="Add Instructor"
//               onAdd={handleOpenModal}
//             />
//             <DataTable columns={instructorColumns} data={instructors || []} onEdit={handleOpenModal} />
//           </section>
//         </div>
//       </div>
//       <InstructorFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
//     </div>
//   )
// }

// export default Instructor





// Instructor.tsx (React Page)
import { DataTable } from '@/components/DataTable'
import { Header } from '@/components/Header'
import InstructorFormModal from '@/components/instructor-form-modal';
import { Sidebar } from '@/components/Sidebar'
import { useDeleteInstructorMutation, useGetAllInstructorsQuery } from '@/store/slices/instructorApi';
import { Instructor } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';


function InstructorPage() {
  const { data: instructors = [], refetch } = useGetAllInstructorsQuery();
  const [deleteInstructor] = useDeleteInstructorMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Instructor | undefined>(undefined);

  const handleOpenModal = () => {
    // setEditData(null);
    setIsModalOpen(true);
  }
  const handleEdit = (data: Instructor) => {

    const formattedData: Instructor = {
      _id: String(data._id),
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    setEditData(formattedData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    refetch();
    setEditData(undefined)
    setIsModalOpen(false);
  }

  const instructorColumns = [
    { key: 'name', label: 'Instructor Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'email', label: 'Email' },
  ];

  const handleDelete = async (id: string) => {
    try {
      await deleteInstructor(id).unwrap()
      toast.success('Instructor deleted')
      refetch()
    } catch (err) {
      toast.error('Failed to delete instructor')
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
              title="Instructor List"
              addButtonLabel="Add Instructor"
              onAdd={handleOpenModal}
            />
            <DataTable
              columns={instructorColumns}
              data={instructors}
              onEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </section>
        </div>
      </div>
      <InstructorFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultValues={editData}
      />
    </div>
  )
}

export default InstructorPage;