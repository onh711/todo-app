import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Register } from "./components/Register";
import { TaskList } from "./TaskList";
import { Header } from "./components/Header";
import { DashBoard } from "./components/DashBoard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/dashbord" element={<DashBoard />}></Route>
      </Routes>
    </>
  );
}

export default App;
