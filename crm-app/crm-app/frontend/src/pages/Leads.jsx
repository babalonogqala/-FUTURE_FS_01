import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import LeadModal from "../components/LeadModal";

const STATUS_BADGE = {
  new: "badge-new", contacted: "badge-contacted",
  qualified: "badge-qualified", converted: "badge-converted", lost: "badge-lost",
};

function fmt(date) {
  return new Date(date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export default function Leads() {
  const [leads, setLeads]         = useState([]);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [pages, setPages]         = useState(1);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("");
  const [sourceFilter, setSource] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editLead, setEditLead]   = useState(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search)       params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (sourceFilter) params.append("source", sourceFilter);
      const r = await api.get(`/leads?${params}`);
      setLeads(r.data.leads);
      setTotal(r.data.total);
      setPages(r.data.pages);
    } catch { toast.error("Failed to load leads"); }
    finally  { setLoading(false); }
  }, [page, search, statusFilter, sourceFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, statusFilter, sourceFilter]);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success("Lead deleted");
      fetchLeads();
    } catch { toast.error("Delete failed"); }
  };

  const openAdd  = () => { setEditLead(null); setShowModal(true); };
  const openEdit = (lead) => { setEditLead(lead); setShowModal(true); };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <h1>Leads</h1>
          <p>{total} total lead{total !== 1 ? "s" : ""}</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <i className="fas fa-plus"></i> Add Lead
        </button>
      </div>

      <div className="page">
        {/* Filters */}
        <div className="filters-bar">
          <div className="search-wrap">
            <i className="fas fa-search"></i>
            <input className="search-input" placeholder="Search by name, email or phone..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
          <select className="filter-select" value={sourceFilter} onChange={(e) => setSource(e.target.value)}>
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social_media">Social Media</option>
            <option value="email">Email</option>
            <option value="cold_call">Cold Call</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Table */}
        <div className="card">
          {loading ? (
            <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>
          ) : leads.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-users"></i>
              <p>No leads found. Try adjusting your filters or add a new lead.</p>
            </div>
          ) : (
            <>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Follow-up</th>
                      <th>Added</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead._id}>
                        <td style={{ fontWeight: 600 }}>
                          <Link to={`/leads/${lead._id}`} style={{ color: "var(--accent)" }}>{lead.name}</Link>
                        </td>
                        <td style={{ color: "var(--dim)" }}>{lead.email}</td>
                        <td style={{ color: "var(--dim)" }}>{lead.phone || "—"}</td>
                        <td style={{ textTransform: "capitalize" }}>{lead.source?.replace("_", " ")}</td>
                        <td><span className={`badge ${STATUS_BADGE[lead.status]}`}>{lead.status}</span></td>
                        <td style={{ color: lead.followUpDate ? "var(--yellow)" : "var(--muted)" }}>
                          {lead.followUpDate ? fmt(lead.followUpDate) : "—"}
                        </td>
                        <td style={{ color: "var(--dim)" }}>{fmt(lead.createdAt)}</td>
                        <td>
                          <div style={{ display: "flex", gap: "0.6rem" }}>
                            <Link to={`/leads/${lead._id}`} className="btn btn-ghost btn-sm" title="View">
                              <i className="fas fa-eye"></i>
                            </Link>
                            <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => openEdit(lead)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm" title="Delete" onClick={() => deleteLead(lead._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="pagination">
                  <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span className="page-info">Page {page} of {pages}</span>
                  <button className="page-btn" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <LeadModal lead={editLead} onClose={() => setShowModal(false)} onSaved={fetchLeads} />
      )}
    </>
  );
}
