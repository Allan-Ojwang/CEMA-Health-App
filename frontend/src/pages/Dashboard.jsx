import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';
import Program from '../components/Program';  
import Client from '../components/Client'; 

function Dashboard() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
  {/* Sidebar stays fixed and not scrollable */}
  <div className="w-64 bg-white shadow h-full">
    <Sidebar />
  </div>

  {/* Scrollable main content */}
  <div className="flex-1 overflow-y-auto bg-gray-50">
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/program" element={<Program />} />
      <Route path="/client" element={<Client />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
</div>

    </Router>
  );
}

export default Dashboard;
