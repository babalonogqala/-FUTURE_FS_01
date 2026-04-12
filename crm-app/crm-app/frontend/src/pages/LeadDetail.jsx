import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import LeadModal from "../components/LeadModal";

const STATUS_BADGE = {
  new: "badge-new", contacted: "badge-contacted",
  qualified: "badge-qualified", converted: "badge-converted", lost: "badge-lost",
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "converted", "lost"];

function fmt(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(date) {
  return new Date(date).toLocaleString("en-ZA", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function LeadDetail() {
  const { id }       = useParams();
  const { user }     = useAuth();
  const navigate     = useNavigate();
  const [lead, setLead]         = useState(null);
  const [notes, setNotes]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteType, setNoteType] = useState("note");
  const [savingNote, setSavingNote] = useState(false);

  const fetchLead = async () => {
    try {
      const r = await api.get(`/leads/${id}`);
      setLead(r.data);
    } catch { toast.error("Lead not found"); navigate("/leads"); }
  };

  const fetchNotes = async () => {
    try {
      const r = await api.get(`/notes/${id}`);
      setNotes(r.data);
    } catch { console.error("Could not load notes"); }
  };

  useEffect(() => {
    Promise.all([fetchLead(), fetchNotes()]).finally(() => setLoading(false));
  }, [id]);

  const updateStatus = async (status) => {
    try {
      const r = await api.put(`/leads/${id}`, { status });
      setLead(r.data);
      toast.success(`Status → ${status}`);
    } catch { toast.error("Update failed"); }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      const r = await api.post("/notes", { lead: id, content: noteText, type: noteType });
      setNotes([r.data, ...notes]);
      setNoteText("");
      toast.success("Note added");
    } catch { toast.error("Failed to add note"); }
    finally { setSavingNote(false); }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${noteId}`);
      setNotes(notes.filter((n) => n._id !== noteId));
      toast.success("Note deleted");
    } catch { toast.error("Delete failed"); }
  };

  const deleteLead = async () => {
    if (!window.confirm("Permanently delete this lead and all its notes?")) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success("Lead deleted");
      navigate("/leads");
    } catch { toast.error("Delete failed"); }
  };

  if (loading) return <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>;
  if (!lead)   return null;

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <h1>{lead.name}</h1>
          <p>
            <Link to="/leads" style={{ color: "var(--accent)" }}>Leads</Link>
            {" / "}{lead.name}
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn btn-ghost" onClick={() => setShowEdit(true)}>
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="btn btn-danger" onClick={deleteLead}>
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>

      <div className="page">
        <div className="detail-grid">
          {/* LEFT: Lead info */}
          <div>
            <div className="card" style={{ marginBottom: "2rem" }}>
              <div className="card-header">
                <h2 className="card-title">Lead Information</h2>
                <span className={`badge ${STATUS_BADGE[lead.status]}`}>{lead.status}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem 2rem" }}>
                {[
                  ["Name",       lead.name],
                  ["Email",      lead.email],
                  ["Phone",      lead.phone || "—"],
                  ["Source",     lead.source?.replace("_", " ")],
                  ["Service",    lead.service || "—"],
                  ["Deal Value", lead.value ? `R ${Number(lead.value).toLocaleString()}` : "—"],
                  ["Follow-up",  fmt(lead.followUpDate)],
                  ["Added",      fmt(lead.createdAt)],
                ].map(([label, value]) => (
                  <div className="detail-field" key={label}>
                    <div className="detail-label">{label}</div>
                    <div className="detail-value" style={{ textTransform: label === "Source" ? "capitalize" : "none" }}>{value}</div>
                  </div>
                ))}
              </div>

              {lead.message && (
                <div style={{ marginTop: "1.6rem", padding: "1.4rem", background: "var(--bg3)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}>
                  <div className="detail-label" style={{ marginBottom: "0.6rem" }}>Original Message</div>
                  <p style={{ fontSize: "1.3rem", color: "var(--dim)", lineHeight: 1.7 }}>{lead.message}</p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Notes & Activity</h2>
                <span style={{ fontSize: "1.2rem", color: "var(--dim)" }}>{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
              </div>

              {/* Add note form */}
              <form onSubmit={addNote} style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                  {["note","call","email","meeting","follow_up"].map((t) => (
                    <button key={t} type="button"
                      onClick={() => setNoteType(t)}
                      className={`btn btn-sm ${noteType === t ? "btn-primary" : "btn-ghost"}`}
                      style={{ textTransform: "capitalize" }}>
                      {t.replace("_", " ")}
                    </button>
                  ))}
                </div>
                <textarea className="form-control" rows={3} placeholder="Write a note, log a call, record a meeting..."
                  value={noteText} onChange={(e) => setNoteText(e.target.value)}
                  style={{ resize: "vertical", marginBottom: "1rem" }} />
                <button type="submit" className="btn btn-primary" disabled={savingNote || !noteText.trim()}>
                  {savingNote ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-plus"></i> Add Note</>}
                </button>
              </form>

              {/* Notes list */}
              {notes.length === 0 ? (
                <div className="empty-state" style={{ padding: "3rem" }}>
                  <i className="fas fa-sticky-note"></i>
                  <p>No notes yet. Log your first interaction above.</p>
                </div>
              ) : (
                notes.map((note) => (
                  <div className="note-item" key={note._id}>
                    <div className="note-meta">
                      <div>
                        <span className="note-author">{note.author?.name}</span>
                        <span className="note-type">{note.type?.replace("_", " ")}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span className="note-time">{fmtTime(note.createdAt)}</span>
                        {note.author?._id === user?.id && (
                          <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note._id)}>
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="note-content">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: Status updater */}
          <div>
            <div className="card" style={{ marginBottom: "2rem" }}>
              <h2 className="card-title" style={{ marginBottom: "1.4rem" }}>Update Status</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {STATUS_OPTIONS.map((s) => (
                  <button key={s}
                    className={`btn ${lead.status === s ? "btn-primary" : "btn-ghost"}`}
                    style={{ justifyContent: "flex-start", textTransform: "capitalize" }}
                    onClick={() => updateStatus(s)}>
                    <i className={`fas fa-circle`} style={{ fontSize: "0.8rem", color: lead.status === s ? "#fff" : "var(--muted)" }}></i>
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick info card */}
            <div className="card">
              <h2 className="card-title" style={{ marginBottom: "1.4rem" }}>Quick Info</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <a href={`mailto:${lead.email}`} className="btn btn-ghost" style={{ justifyContent: "center" }}>
                  <i className="fas fa-envelope"></i> Send Email
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="btn btn-ghost" style={{ justifyContent: "center" }}>
                    <i className="fas fa-phone"></i> Call
                  </a>
                )}
                {lead.followUpDate && (
                  <div style={{ textAlign: "center", padding: "1rem", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--r)" }}>
                    <div style={{ fontSize: "1.1rem", color: "var(--yellow)", marginBottom: "0.3rem" }}>⏰ Follow-up due</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>{fmt(lead.followUpDate)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <LeadModal lead={lead} onClose={() => setShowEdit(false)} onSaved={() => { fetchLead(); setShowEdit(false); }} />
      )}
    </>
  );
}
