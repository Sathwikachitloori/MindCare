import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


import Auth from "./pages/Auth";
import Home from "./pages/Home";  
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import SelfTest from "./pages/SelfTest";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/auth" element={<Auth />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/self-test"
          element={
            <ProtectedRoute>
              <SelfTest />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Auth />} />

      </Routes>

    </Router>
  );
}

export default App;
