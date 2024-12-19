import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoleSelection from './pages/RoleSelection';
import Login from './components/Auth/Login';
import ApplicationForm from './components/ApplicationForm';
import ForgetPass from './components/Auth/ForgetPass';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ResetPasswordForm from './components/Auth/ResetPasswordForm';
import SettingPassword from './components/Auth/SettingPassword';
import AuthGuard from './guard/AuthGuard';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/admin-dash"
            element={
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/user-dash"
            element={
              <AuthGuard>
                <UserDashboard />
              </AuthGuard>
            }
          />
          <Route path="/" element={<RoleSelection />} />
          <Route path="/app" element={<ApplicationForm />} /> 

          <Route path="/login" element={<Login />} />
          <Route path="/forget-pass" element={<ForgetPass />} />
          <Route path="/set-password" element={<SettingPassword />} />
          <Route path="/reset-pass/:token" element={<ResetPasswordForm />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>

  );
};

export default App;


