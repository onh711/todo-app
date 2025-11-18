import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginForm } from './components/LoginForm'
import { Register } from './components/Register'
import { TaskList } from './TaskList'

function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/list" element={<TaskList/>}/>
    </Routes>
    </>
  )
}

export default App
