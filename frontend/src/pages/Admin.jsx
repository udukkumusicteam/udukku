import React, { useEffect, useMemo, useState } from 'react';
import {
  RefreshCw,
  Search,
  Trash2,
  Download,
  Hash,
  Eye,
  Calendar,
  Filter,
  X,
  ChevronDown,
} from 'lucide-react';
import { submissionsService } from '../services/supabase';
import { supabase } from '../lib/supabase';

const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];

const STATUS_STYLES = {
  New: 'bg-orange/15 text-orange border-orange/30',
  Contacted: 'bg-brown-dark/10 text-brown-dark border-brown-dark/20',
  Closed: 'bg-green-100 text-green-800 border-green-200',
};

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function Admin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [viewing, setViewing] = useState(null); // submission being viewed
  const [confirmDelete, setConfirmDelete] = useState(null); // submission being deleted
  const [live, setLive] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const all = await submissionsService.list();
      setSubs(all);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    // Supabase Realtime — the dashboard re-fetches whenever any of the four
    // tables receives an INSERT / UPDATE / DELETE. No manual refresh needed
    // for new submissions coming from other browsers or devices.
    const channel = supabase
      .channel('udukku-admin-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'session_bookings' },
        load,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'corporate_bookings' },
        load,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_messages' },
        load,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'city_requests' },
        load,
      )
      .subscribe((status) => {
        setLive(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const clearFilters = () => {
    setQ('');
    setStatus('all');
    setFrom('');
    setTo('');
  };

  /* ---------- Filtering + grouping (dynamic per formId) ---------- */
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const fromTs = from ? new Date(from + 'T00:00:00').getTime() : null;
    const toTs = to ? new Date(to + 'T23:59:59').getTime() : null;

    return subs.filter((s) => {
      if (status !== 'all' && s.status !== status) return false;
      const ts = new Date(s.submittedAt).getTime();
      if (fromTs && ts < fromTs) return false;
      if (toTs && ts > toTs) return false;
      if (!query) return true;
      const haystack = [
        s.formLabel,
        s.formId,
        s.status,
        s.id,
        ...Object.values(s.fields || {}),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [subs, q, status, from, to]);

  // Group by formId, sort newest first inside each group. Dynamic: new formIds
  // appear as new sections automatically.
  const groups = useMemo(() => {
    const map = new Map();
    filtered.forEach((s) => {
      if (!map.has(s.formId)) {
        map.set(s.formId, { formId: s.formId, formLabel: s.formLabel, items: [] });
      }
      map.get(s.formId).items.push(s);
    });
    const arr = Array.from(map.values());
    arr.forEach((g) =>
      g.items.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
    );
    arr.sort((a, b) => a.formLabel.localeCompare(b.formLabel));
    return arr;
  }, [filtered]);

  /* ---------- Handlers ---------- */
  const onStatusChange = async (id, next) => {
    const record = subs.find((s) => s.id === id);
    if (!record) return;
    try {
      await submissionsService.updateStatus(record, next);
      setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, status: next } : s)));
      if (viewing && viewing.id === id) setViewing({ ...viewing, status: next });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
  const onDelete = async (id) => {
    const record = subs.find((s) => s.id === id);
    if (!record) return;
    try {
      await submissionsService.remove(record);
      setSubs((prev) => prev.filter((s) => s.id !== id));
      setConfirmDelete(null);
      if (viewing && viewing.id === id) setViewing(null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
  const onExportGroup = (g) => downloadCsv(g.formId, g.items);

  const totalCount = filtered.length;

  return (
    <main data-testid="admin-page" className="bg-cream min-h-screen">
      <section className="udukku-section pt-32 md:pt-40 pb-20">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Admin
            </span>
            <h1 className="text-display mt-3 text-4xl sm:text-5xl text-brown-dark">
              Submissions Dashboard
            </h1>
            <p className="text-brown-mid mt-2 text-sm max-w-lg">
              ------------------------WELCOME TO UDUKKU DASHBOARD---------------------
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-brown-mid text-sm" data-testid="admin-total">
              {totalCount} shown
            </span>
            <button
              onClick={load}
              data-testid="admin-refresh"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white border border-brown-dark/15 text-brown-dark hover:bg-brown-dark hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* ---------- Toolbar ---------- */}
        <div className="mt-8 bg-white border border-brown-dark/10 rounded-3xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
          <label className="md:col-span-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-mid" />
            <input
              type="search"
              data-testid="admin-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, message, any field…"
              className="w-full h-11 pl-10 pr-3 rounded-full bg-cream/60 border border-brown-dark/10 text-sm text-brown-dark placeholder:text-brown-mid/60 focus:outline-none focus:border-orange"
            />
          </label>
          <label className="md:col-span-3 flex items-center gap-2">
            <Filter className="w-4 h-4 text-brown-mid" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              data-testid="admin-status-filter"
              className="w-full h-11 px-3 rounded-full bg-cream/60 border border-brown-dark/10 text-sm text-brown-dark focus:outline-none focus:border-orange"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brown-mid shrink-0" />
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              data-testid="admin-date-from"
              className="w-full h-11 px-3 rounded-full bg-cream/60 border border-brown-dark/10 text-sm text-brown-dark focus:outline-none focus:border-orange"
              aria-label="From date"
            />
          </label>
          <label className="md:col-span-2 flex items-center gap-2">
            <span className="text-brown-mid/80 text-xs">to</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              data-testid="admin-date-to"
              className="w-full h-11 px-3 rounded-full bg-cream/60 border border-brown-dark/10 text-sm text-brown-dark focus:outline-none focus:border-orange"
              aria-label="To date"
            />
          </label>
          <button
            type="button"
            onClick={clearFilters}
            data-testid="admin-clear-filters"
            className="md:col-span-1 h-11 rounded-full bg-cream/60 border border-brown-dark/10 text-brown-dark text-sm hover:bg-brown-dark hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>

        {/* ---------- Sections ---------- */}
        <div className="mt-8 space-y-8">
          {loading && <p className="text-brown-mid" data-testid="admin-loading">Loading…</p>}

          {!loading && groups.length === 0 && (
            <div
              data-testid="admin-empty"
              className="bg-white border border-brown-dark/10 rounded-3xl p-12 text-brown-mid text-sm text-center"
            >
              No submissions match your filters yet.
            </div>
          )}

          {groups.map((g) => (
            <FormGroup
              key={g.formId}
              group={g}
              onView={setViewing}
              onExport={() => onExportGroup(g)}
              onStatusChange={onStatusChange}
              onRequestDelete={setConfirmDelete}
            />
          ))}
        </div>
      </section>

      {/* View modal */}
      {viewing && (
        <ViewModal
          submission={viewing}
          onClose={() => setViewing(null)}
          onStatusChange={onStatusChange}
        />
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <ConfirmDelete
          submission={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => onDelete(confirmDelete.id)}
        />
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                              FORM GROUP CARD                                */
/* -------------------------------------------------------------------------- */

const FormGroup = ({ group, onView, onExport, onStatusChange, onRequestDelete }) => (
  <section
    data-testid={`section-${group.formId}`}
    className="bg-white border border-brown-dark/10 rounded-3xl p-5 md:p-7"
  >
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-5 border-b border-brown-dark/10">
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-orange">
          Form
        </div>
        <h2 className="mt-1 text-display text-brown-dark text-2xl md:text-3xl">
          {group.formLabel}
        </h2>
        <div className="mt-1 text-brown-mid text-xs">
          {group.items.length}{' '}
          {group.items.length === 1 ? 'submission' : 'submissions'} · newest first
        </div>
      </div>
      <button
        type="button"
        onClick={onExport}
        data-testid={`section-${group.formId}-export`}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-cream/60 border border-brown-dark/10 text-brown-dark text-sm hover:bg-brown-dark hover:text-white transition-colors"
      >
        <Download className="w-4 h-4" /> Export CSV
      </button>
    </header>

    <div className="mt-5 space-y-3">
      {group.items.map((s) => (
        <SubmissionRow
          key={s.id}
          submission={s}
          onView={() => onView(s)}
          onStatusChange={(next) => onStatusChange(s.id, next)}
          onRequestDelete={() => onRequestDelete(s)}
        />
      ))}
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*                              SUBMISSION ROW                                */
/* -------------------------------------------------------------------------- */

const SubmissionRow = ({ submission, onView, onStatusChange, onRequestDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const entries = Object.entries(submission.fields || {});
  const primary = entries.find(([, v]) => v && String(v).trim())?.[1];

  return (
    <article
      data-testid={`submission-${submission.id}`}
      className="rounded-2xl bg-cream/40 border border-brown-dark/10 overflow-hidden"
    >
      {/* Row summary */}
      <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill status={submission.status} />
            <span className="text-brown-mid text-xs">
              {new Date(submission.submittedAt).toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-brown-mid/60 font-mono">
              <Hash className="w-3 h-3" /> {submission.id}
            </span>
          </div>
          <div className="mt-2 text-brown-dark font-medium truncate">
            {String(primary || 'Submission')}
          </div>
          <div className="mt-1 text-brown-mid text-xs">
            {entries.length} {entries.length === 1 ? 'field' : 'fields'} captured
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            data-testid={`expand-${submission.id}`}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white border border-brown-dark/15 text-brown-dark text-xs hover:bg-brown-dark hover:text-white transition-colors"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
            {expanded ? 'Hide' : 'View Full Submission'}
          </button>
          <select
            value={submission.status}
            onChange={(e) => onStatusChange(e.target.value)}
            data-testid={`status-${submission.id}`}
            className="h-9 px-3 rounded-full bg-white border border-brown-dark/15 text-brown-dark text-xs focus:outline-none focus:border-orange"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={onView}
            data-testid={`view-${submission.id}`}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white border border-brown-dark/15 text-brown-dark text-xs hover:bg-brown-dark hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <button
            type="button"
            onClick={onRequestDelete}
            data-testid={`delete-${submission.id}`}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white border border-brown-dark/15 text-brown-dark text-xs hover:bg-orange hover:text-white hover:border-orange transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Expanded: every submitted field, dynamic — no field is hidden */}
      {expanded && (
        <div
          data-testid={`fields-${submission.id}`}
          className="border-t border-brown-dark/10 bg-white px-4 md:px-5 py-5"
        >
          {entries.length === 0 ? (
            <div className="text-brown-mid/70 text-sm italic">
              No fields captured for this submission.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {entries.map(([label, value]) => (
                <div key={label} data-testid={`field-${submission.id}-${label}`}>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-1">
                    {label}
                  </div>
                  <div className="text-brown-dark text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {value === undefined || value === null || value === '' ? (
                      <span className="text-brown-mid/50 italic">Not provided</span>
                    ) : (
                      String(value)
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

const StatusPill = ({ status }) => (
  <span
    data-testid={`status-pill-${status}`}
    className={`inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-medium border ${
      STATUS_STYLES[status] || STATUS_STYLES.New
    }`}
  >
    {status}
  </span>
);

/* -------------------------------------------------------------------------- */
/*                                 VIEW MODAL                                  */
/* -------------------------------------------------------------------------- */

const ViewModal = ({ submission, onClose, onStatusChange }) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
    onClick={onClose}
    data-testid="view-modal"
  >
    <div
      className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-orange">
            {submission.formLabel}
          </div>
          <div className="mt-1 text-brown-dark font-medium">
            {new Date(submission.submittedAt).toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-brown-mid/70 font-mono">
            <Hash className="w-3 h-3" /> {submission.id}
          </div>
        </div>
        <button
          onClick={onClose}
          data-testid="view-modal-close"
          className="w-9 h-9 rounded-full bg-cream/60 hover:bg-brown-dark hover:text-white flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-brown-dark/10">
        <span className="text-[11px] uppercase tracking-[0.22em] text-brown-mid">
          Status
        </span>
        <select
          value={submission.status}
          onChange={(e) => onStatusChange(submission.id, e.target.value)}
          data-testid="view-modal-status"
          className="h-9 px-3 rounded-full bg-cream/60 border border-brown-dark/15 text-brown-dark text-sm focus:outline-none focus:border-orange"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {Object.entries(submission.fields || {}).map(([label, value]) => (
          <div key={label}>
            <div className="text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-1">
              {label}
            </div>
            <div className="text-brown-dark text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
              {value === undefined || value === null || value === '' ? (
                <span className="text-brown-mid/50 italic">Not provided</span>
              ) : (
                String(value)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                              DELETE CONFIRM                                 */
/* -------------------------------------------------------------------------- */

const ConfirmDelete = ({ submission, onCancel, onConfirm }) => (
  <div
    className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60"
    onClick={onCancel}
    data-testid="confirm-delete"
  >
    <div
      className="bg-white rounded-3xl max-w-md w-full p-6 md:p-7"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange/15 text-orange">
          <Trash2 className="w-4 h-4" />
        </span>
        <div>
          <h3 className="text-display text-brown-dark text-xl">
            Delete this submission?
          </h3>
          <p className="text-brown-mid text-sm mt-1">
            {submission.formLabel}. This cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          data-testid="confirm-delete-cancel"
          className="h-10 px-4 rounded-full bg-cream/60 border border-brown-dark/10 text-brown-dark text-sm hover:bg-brown-dark hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          data-testid="confirm-delete-confirm"
          className="h-10 px-4 rounded-full bg-orange text-white text-sm font-medium hover:bg-orange-dark transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                CSV HELPERS                                  */
/* -------------------------------------------------------------------------- */

const csvEscape = (v) => {
  if (v === undefined || v === null) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

const downloadCsv = (formId, items) => {
  // Collect every field label that appears in this group so nothing is lost.
  const labelSet = new Set();
  items.forEach((it) => Object.keys(it.fields || {}).forEach((k) => labelSet.add(k)));
  const labels = Array.from(labelSet);
  const header = ['id', 'submittedAt', 'status', ...labels];
  const rows = items.map((it) => [
    it.id,
    it.submittedAt,
    it.status,
    ...labels.map((l) => it.fields?.[l]),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `udukku-${formId}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
