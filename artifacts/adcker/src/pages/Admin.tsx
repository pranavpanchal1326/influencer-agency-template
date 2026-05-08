import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/config";

interface Contact {
  id: number;
  name: string;
  brand: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}

const KEY = "agency_admin_token";

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " · " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(KEY) ?? "");
  const [draft, setDraft] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [expanded, setExpanded] = useState<number | null>(null);

  const authed = status === "ok";

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${draft}` },
      });
      if (!res.ok) { setStatus("error"); return; }
      const data = await res.json() as { contacts: Contact[] };
      sessionStorage.setItem(KEY, draft);
      setToken(draft);
      setContacts(data.contacts);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  async function refresh() {
    if (!token) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { setStatus("error"); return; }
      const data = await res.json() as { contacts: Contact[] };
      setContacts(data.contacts);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (token) { setDraft(token); refresh(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    sessionStorage.removeItem(KEY);
    setToken("");
    setDraft("");
    setContacts([]);
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#EFEDEA] font-['Kumbh_Sans',sans-serif]">
      <div className="border-b border-[#EFEDEA]/10 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-[0.25em] uppercase opacity-40">{config.agency.name}</span>
          <span className="text-[#EFEDEA]/20 text-xs">·</span>
          <span className="text-xs tracking-[0.2em] uppercase opacity-70">Contact Submissions</span>
        </div>
        {authed && (
          <div className="flex items-center gap-6">
            <span className="text-xs opacity-30 tabular-nums">{contacts.length} record{contacts.length !== 1 ? "s" : ""}</span>
            <button onClick={refresh} className="text-xs tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">
              Refresh
            </button>
            <button onClick={logout} className="text-xs tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">
              Sign out
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!authed ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            className="flex flex-col items-center justify-center min-h-[80vh] px-6"
          >
            <p className="text-xs tracking-[0.25em] uppercase opacity-30 mb-10">( Private access )</p>
            <form onSubmit={login} className="w-full max-w-sm flex flex-col gap-0">
              <input type="text" name="username" autoComplete="username" value="admin" readOnly className="hidden" aria-hidden="true" />
              <input
                type="password"
                autoComplete="current-password"
                autoFocus
                placeholder="Admin password"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                className="w-full bg-transparent border-b border-[#EFEDEA]/20 py-4 text-[#EFEDEA] placeholder:text-[#EFEDEA]/25 text-sm focus:outline-none focus:border-[#EFEDEA]/60 transition-colors duration-300 text-center tracking-widest"
              />
              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-widest uppercase text-red-400/60 mt-4 text-center">
                  Invalid password
                </motion.p>
              )}
              <button
                type="submit"
                disabled={status === "loading" || !draft}
                className="mt-10 border border-[#EFEDEA]/40 px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#EFEDEA] hover:text-[#191919] hover:border-[#EFEDEA] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Checking…" : "Enter"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0 }}
            className="px-8 py-10"
          >
            {contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-3">
                <p className="text-xs tracking-widest uppercase opacity-20">No submissions yet</p>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-[3rem_1fr_1fr_1fr_1fr_10rem] gap-4 text-[10px] tracking-[0.2em] uppercase opacity-30 pb-3 border-b border-[#EFEDEA]/10 mb-2">
                  <span>#</span><span>Name</span><span>Brand</span><span>Email</span><span>Service</span><span>Date</span>
                </div>

                {contacts.map((c, i) => (
                  <div key={c.id}>
                    <button
                      onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                      className="w-full grid grid-cols-[3rem_1fr_1fr_1fr_1fr_10rem] gap-4 py-5 border-b border-[#EFEDEA]/8 text-left hover:bg-[#EFEDEA]/[0.03] transition-colors duration-150 items-center group"
                    >
                      <span className="text-xs opacity-25 tabular-nums">{String(contacts.length - i).padStart(2, "0")}</span>
                      <span className="text-sm truncate pr-2">{c.name}</span>
                      <span className="text-sm truncate pr-2 opacity-70">{c.brand}</span>
                      <span className="text-xs truncate pr-2 opacity-50 font-mono">{c.email}</span>
                      <span className="text-xs opacity-60 truncate pr-2">{c.service}</span>
                      <span className="text-xs opacity-30 tabular-nums">{fmt(c.createdAt)}</span>
                    </button>

                    <AnimatePresence>
                      {expanded === c.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, transition: { duration: 0.25 } }}
                          exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                          className="overflow-hidden"
                        >
                          <div className="pl-[calc(3rem+1rem)] pr-4 pb-6 pt-4 border-b border-[#EFEDEA]/10">
                            <p className="text-[10px] tracking-widest uppercase opacity-30 mb-3">Message</p>
                            <p className="text-sm opacity-70 leading-relaxed max-w-2xl whitespace-pre-wrap">{c.message}</p>
                            <a
                              href={`mailto:${c.email}?subject=Re: Your inquiry`}
                              className="inline-block mt-5 text-[10px] tracking-widest uppercase border-b border-[#EFEDEA]/30 pb-px hover:border-[#EFEDEA] hover:opacity-100 opacity-40 transition-all duration-200"
                            >
                              Reply by email →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
