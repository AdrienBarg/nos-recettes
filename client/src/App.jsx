import './App.scss'
import { Routes, Route } from "react-router-dom";

import RequireAuth from './features/Auth/RequireAuth';
import PersistLogin from './features/Auth/PersistLogin';

import Home from "./pages/Home/Home";
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout';





function App() {

  const ROLES = {
    'Member': '63287b26daf5faf10ce9a16b',
    'Admin': '63287b38daf5faf10ce9a172'
  }
  

  return (
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route element={<PersistLogin />}>
            
            {/* Public routes */}
            <Route index element={ <Home/> } />
            <Route path="home" element={ <Home/> } />
            <Route path="home/:modale" element={ <Home /> } />

            {/*Member routes*/}
            <Route element={<RequireAuth allowedRoles={[ROLES.Member]} />}>
              <Route path="dashboard" element={ <Dashboard /> } />
            </Route>
          
          </Route>  
        </Route>
      </Routes>
  )
}

export default App
