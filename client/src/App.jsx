
import { Route, Routes } from 'react-router-dom';
import Emp from './components/Emp';
import Addemp from './components/Addemp';
import Main from './components/Main';
import PrivateRoutes from './components/PrivateRoutes';
import Login from './components/Login'; // Make sure this import exists

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin-only routes */}
        <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
          <Route path="/add" element={<Main child={<Addemp />} />} />
        </Route>

        {/* User and admin allowed */}
        <Route element={<PrivateRoutes allowedRoles={['user', 'admin']} />}>
          <Route path="/emp" element={<Main child={<Emp />} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
