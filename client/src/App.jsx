import './App.scss'
import { Routes, Route } from "react-router-dom";

import RequireAuth from './features/Auth/RequireAuth';

import Home from "./pages/Home/Home";
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized/Unauthorized';

function App() {
  return (
      <Routes>
        <Route path="/" element={ <Layout /> }>

          {/* Public routes */}
            <Route index element={ <Home/> } />
            <Route path="home" element={ <Home/> } />
            <Route path="home/:modale" element={ <Home /> } />
            

          {/*Member routes*/}
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={ <Dashboard /> } />
            </Route>

        </Route>
      </Routes>
  )
}

export default App
