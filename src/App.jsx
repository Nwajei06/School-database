import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Studsignup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/Admindashboard.jsx';
import SubadminResultForm from './components/Subadmin.jsx';
import SubadminLogin from './components/Subadlogin.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        {/* <Route path="/" element={<Signup />} /> */}
        {/* <Route path="/studentsignin" element={<Login />} /> */}
        <Route path="/studentsignin" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/subad" element={<SubadminResultForm />} />
        <Route path="/subadlogin" element={<SubadminLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
