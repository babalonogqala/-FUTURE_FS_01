import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => { try { return JSON.parse(localStorage.getItem("crm_user")); } catch { return null; } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("crm_token")) {
      api.get("/auth/me")
        .then((r) => setUser(r.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const r = await api.post("/auth/login", { email, password });
    localStorage.setItem("crm_token", r.data.token);
    localStorage.setItem("crm_user",  JSON.stringify(r.data.user));
    setUser(r.data.user);
  };

  const register = async (name, email, password) => {
    const r = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("crm_token", r.data.token);
    localStorage.setItem("crm_user",  JSON.stringify(r.data.user));
    setUser(r.data.user);
  };

  const logout = () => {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_user");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, register, logout, loading }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
