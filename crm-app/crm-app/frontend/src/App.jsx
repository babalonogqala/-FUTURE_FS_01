import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar   from "./components/Sidebar";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leads     from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function Shell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected><Shell><Dashboard /></Shell></Protected>} />
        <Route path="/leads" element={<Protected><Shell><Leads /></Shell></Protected>} />
        <Route path="/leads/:id" element={<Protected><Shell><LeadDetail /></Shell></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
