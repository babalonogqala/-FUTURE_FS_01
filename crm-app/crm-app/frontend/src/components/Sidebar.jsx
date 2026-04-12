import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const NAV = [
  { to: "/",      icon: "fa-chart-pie", label: "Dashboard", end: true },
  { to: "/leads", icon: "fa-users",     label: "Leads" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-icon"><i className="fas fa-briefcase"></i></div>
        <div className="sb-logo-text">CRM <span>Pro</span></div>
      </div>

      <nav className="sb-nav">
        <div className="sb-section-label">Menu</div>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end}
            className={({ isActive }) => `sb-link${isActive ? " active" : ""}`}>
            <i className={`fas ${n.icon}`}></i>{n.label}
          </NavLink>
        ))}
      </nav>

      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div className="sb-user-name">{user?.name}</div>
            <div className="sb-user-role">{user?.role}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </aside>
  );
}
