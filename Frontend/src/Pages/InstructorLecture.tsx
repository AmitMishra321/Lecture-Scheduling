import { DataTable } from '@/components/DataTable'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { RootState } from '@/store';
import { useGetInstructorLecturesQuery, useUpdateAttendanceMutation } from '@/store/slices/lectureApi';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';


function MyLecture() {
    const { userId } = useSelector((state: RootState) => state.auth)
    const { data: lectures, refetch } = useGetInstructorLecturesQuery({
        instructorId: userId as string,

    });
    console.log('lec', lectures)
    const [updateAttendance] = useUpdateAttendanceMutation()


    const lectureColumns = [

        { key: 'courseName', label: 'Course Name' },
        { key: 'date', label: 'Lecture Date' },
        { key: 'startTime', label: 'Lecture Time' },
        { key: 'attendance', label: 'Attendance Status' },
    ];
    const handleAttendance = async (id: string, status: string) => {

        try {
            await updateAttendance({ id, attendance: status }).unwrap();

            toast.success("Attendance updated successfully");
            refetch(); // make sure refetch is defined from useQuery
        } catch (err) {
            toast.error("Failed to update attendance");
        }
    };


    const formattedLectures = useMemo(() => {
        if (!lectures) return [];

        return lectures.map((lecture: any) => ({
            _id: lecture._id,
            courseName: lecture.course?.name || "Unknown Course",
            date: new Date(lecture.date).toLocaleDateString("en-GB"),
            startTime: lecture.startTime,
            duration: lecture.duration,
            attendance: lecture.attendance
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

                        />
                        <DataTable columns={lectureColumns} data={formattedLectures || []} handleAttendance={handleAttendance} />
                    </section>
                </div>
            </div>

        </div>
    )
}


export default MyLecture