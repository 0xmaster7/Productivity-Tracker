import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard"; // Import Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
