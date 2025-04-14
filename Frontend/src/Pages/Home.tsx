import { Sidebar } from "@/components/Sidebar"
import { useSelector } from "react-redux";


function Home() {
  const { role: userRole } = useSelector((state: any) => state.auth);
  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-primary shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl text-center uppercase">Welcome to {userRole} Page</h2>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home