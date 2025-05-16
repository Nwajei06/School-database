import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Studsignup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/studentsignin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        

      </Routes>
    </Router>
  );
}

export default App;
