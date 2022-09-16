import './App.scss'
import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home/Home";
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout';

function App() {
  return (
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home/> } />
          <Route path="home" element={ <Home/> } />
          <Route path="home/:modale" element={ <Home /> } />
          <Route path="dashboard" element={ <Dashboard /> } />
        </Route>
      </Routes>
  )
}

export default App
