import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm.jsx";
import { Register } from "./components/Register.jsx";
import { TaskList } from "./components/TaskList.js";
import { Header } from "./components/Header.js";
import { DashBoard } from "./components/DashBoard";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
