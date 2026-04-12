import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const EMPTY = { name: "", email: "", phone: "", source: "website", status: "new", service: "", message: "", value: "", followUpDate: "" };

export default function LeadModal({ lead, onClose, onSaved }) {
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const editing = !!lead;

  useEffect(() => {
    if (lead) {
      setForm({
        name:         lead.name         || "",
        email:        lead.email        || "",
        phone:        lead.phone        || "",
        source:       lead.source       || "website",
        status:       lead.status       || "new",
        service:      lead.service      || "",
        message:      lead.message      || "",
        value:        lead.value        || "",
        followUpDate: lead.followUpDate ? lead.followUpDate.slice(0, 10) : "",
      });
    }
  }, [lead]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, value: form.value ? Number(form.value) : 0 };
      if (editing) {
        await api.put(`/leads/${lead._id}`, payload);
        toast.success("Lead updated");
      } else {
        await api.post("/leads", payload);
        toast.success("Lead added");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{editing ? "Edit Lead" : "Add New Lead"}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-control" placeholder="John Smith" value={form.name}
                  onChange={(e) => set("name", e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" className="form-control" placeholder="john@example.com" value={form.email}
                  onChange={(e) => set("email", e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-control" placeholder="+27 xx xxx xxxx" value={form.phone}
                  onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Service Interested In</label>
                <input className="form-control" placeholder="e.g. WordPress Site" value={form.service}
                  onChange={(e) => set("service", e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Source</label>
                <select className="form-control" value={form.source} onChange={(e) => set("source", e.target.value)}>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social_media">Social Media</option>
                  <option value="email">Email</option>
                  <option value="cold_call">Cold Call</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={form.status} onChange={(e) => set("status", e.target.value)}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Deal Value (ZAR)</label>
                <input type="number" className="form-control" placeholder="0" value={form.value}
                  onChange={(e) => set("value", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Follow-up Date</label>
                <input type="date" className="form-control" value={form.followUpDate}
                  onChange={(e) => set("followUpDate", e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message / Notes</label>
              <textarea className="form-control" rows={3} placeholder="What did they say..." value={form.message}
                onChange={(e) => set("message", e.target.value)} style={{ resize: "vertical" }} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : (editing ? "Save Changes" : "Add Lead")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
