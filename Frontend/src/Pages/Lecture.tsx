import { useMemo, useState } from 'react';
import { DataTable } from '@/components/DataTable'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { useGetAllLecturesQuery } from '@/store/slices/lectureApi';
import LectureFormModal from '@/components/lecture-form-modal';


function Lecture() {

    const { data: lectures, refetch } = useGetAllLecturesQuery();

    const [isModalOpen, setIsModalOpen] = useState(false)
   

 
    const lectureColumns = [
        { key: 'instructorName', label: 'Instructor Name' },
        { key: 'courseName', label: 'Course Name' },
        { key: 'date', label: 'Lecture Date' },
        { key: 'startTime', label: 'Lecture Time' },
        { key: 'duration', label: 'Duration' },
    ];



    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        refetch();
        setIsModalOpen(false)
    }


    const formattedLectures = useMemo(() => {
        if (!lectures) return [];

        return lectures.map((lecture: any) => ({
            courseName: lecture.course?.name || "Unknown Course",
            instructorName: lecture.instructor?.name || "Unknown Instructor",
            date: new Date(lecture.date).toLocaleDateString("en-GB"), // Format: DD/MM/YYYY
            startTime: lecture.startTime,
            duration: lecture.duration,

        }));
    }, [lectures]);
    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-64 bg-primary shadow-lg">
                <Sidebar />
            </div>
            <div className="flex-1 p-8">
                <div className="space-y-8">
                    <section>
                        <Header
                            title="Lectures"
                            addButtonLabel="Add Lectures"
                            onAdd={handleOpenModal}
                          
                        />
                        <DataTable columns={lectureColumns} data={formattedLectures || []} />
                    </section>
                </div>
            </div>
            <LectureFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}


export default Lecture