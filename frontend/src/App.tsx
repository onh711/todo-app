import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { Register } from "./components/Register";
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import { DashBoard } from "./components/DashBoard";
import { Statistics } from "./components/Statistics";
import { MyPage } from "./components/MyPage";
import { ProfileEdit } from "./components/ProfileEdit";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
