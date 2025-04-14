import { GraduationCap, Home, Users, BookOpen, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const dispatch = useDispatch()
  const { role: userRole } = useSelector((state: any) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  return (
    <div className={cn("pb-12 min-h-screen text-white", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-white" />
            <h2 className="ml-2 text-2xl font-semibold tracking-tight text-white">EduDash</h2>
          </div>
          <div className="space-y-1">
            <NavLink to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </NavLink>
            {userRole === "admin" && (
              <>
                <NavLink to="/instructor">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Instructor List
                  </Button>
                </NavLink>
                <NavLink to="/courses">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Courses
                  </Button>
                </NavLink>
              </>
            )}
            {userRole === "admin" ? (
              <NavLink to="/lectures">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Lectures
                </Button>
              </NavLink>)
              :
              (<NavLink to="/my-lectures">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Lectures
                </Button>

              </NavLink>
              )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
        <Button variant="ghost" className="justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}