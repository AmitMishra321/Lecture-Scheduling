import { Provider } from 'react-redux';
import { store } from './store';
import { Routes, Route } from "react-router-dom";

import Instructor from './Pages/Instructor';
import Course from './Pages/Course';
import Lecture from './Pages/Lecture';
import Home from './Pages/Home';
import Login from './Pages/Login';
import PrivateRoute from './PrivateRoutes';
import MyLecture from './Pages/InstructorLecture';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["instructor", "admin"]}>
              <Home />
            </PrivateRoute>
          }
        />


        <Route path="/instructor" element={<PrivateRoute roles={["admin"]}><Instructor /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute roles={["admin"]}><Course /></PrivateRoute>} />
        <Route path="/lectures" element={<PrivateRoute roles={["admin"]}><Lecture /></PrivateRoute>} />
        <Route
          path="/my-lectures"
          element={
            <PrivateRoute roles={["instructor"]}>

              <MyLecture />
            </PrivateRoute>
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
