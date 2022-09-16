import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home/Home";
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/home/:modale" element={ <Home /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
