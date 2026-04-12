import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const STATUS_BADGE = {
  new: "badge-new", contacted: "badge-contacted",
  qualified: "badge-qualified", converted: "badge-converted", lost: "badge-lost",
};

function fmt(date) {
  return new Date(date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leads/stats")
      .then((r) => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getCount = (arr, id) => arr?.find((x) => x._id === id)?.count || 0;

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name} 👋</p>
        </div>
        <Link to="/leads" className="btn btn-primary">
          <i className="fas fa-plus"></i> New Lead
        </Link>
      </div>

      <div className="page">
        {loading ? (
          <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>
        ) : (
          <>
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue"><i className="fas fa-users"></i></div>
                <div>
                  <div className="stat-value">{stats?.total || 0}</div>
                  <div className="stat-label">Total Leads</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon yellow"><i className="fas fa-clock"></i></div>
                <div>
                  <div className="stat-value">{getCount(stats?.byStatus, "new")}</div>
                  <div className="stat-label">New Leads</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple"><i className="fas fa-phone"></i></div>
                <div>
                  <div className="stat-value">{getCount(stats?.byStatus, "contacted")}</div>
                  <div className="stat-label">Contacted</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green"><i className="fas fa-check-circle"></i></div>
                <div>
                  <div className="stat-value">{getCount(stats?.byStatus, "converted")}</div>
                  <div className="stat-label">Converted</div>
                </div>
              </div>
            </div>

            {/* Recent leads table */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Leads</h2>
                <Link to="/leads" className="btn btn-ghost btn-sm">View All</Link>
              </div>
              {stats?.recent?.length ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent.map((lead) => (
                        <tr key={lead._id}>
                          <td style={{ fontWeight: 600 }}>{lead.name}</td>
                          <td style={{ color: "var(--dim)" }}>{lead.email}</td>
                          <td style={{ textTransform: "capitalize" }}>{lead.source?.replace("_", " ")}</td>
                          <td><span className={`badge ${STATUS_BADGE[lead.status]}`}>{lead.status}</span></td>
                          <td style={{ color: "var(--dim)" }}>{fmt(lead.createdAt)}</td>
                          <td>
                            <Link to={`/leads/${lead._id}`} className="btn btn-ghost btn-sm">
                              <i className="fas fa-eye"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-users"></i>
                  <p>No leads yet. <Link to="/leads" style={{ color: "var(--accent)" }}>Add your first one.</Link></p>
                </div>
              )}
            </div>

            {/* Source breakdown */}
            {stats?.bySource?.length > 0 && (
              <div className="card" style={{ marginTop: "2rem" }}>
                <div className="card-header">
                  <h2 className="card-title">Leads by Source</h2>
                </div>
                <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
                  {stats.bySource.map((s) => (
                    <div key={s._id} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "1.2rem 2rem", textAlign: "center" }}>
                      <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--accent)" }}>{s.count}</div>
                      <div style={{ fontSize: "1.2rem", color: "var(--dim)", textTransform: "capitalize", marginTop: "0.3rem" }}>{s._id?.replace("_", " ")}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
