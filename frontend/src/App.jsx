import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm.jsx";
import { Register } from "./components/Register.jsx";
import { TaskList } from "./components/TaskList.jsx";
import { Header } from "./components/Header.tsx";
import { DashBoard } from "./components/DashBoard.jsx";
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
