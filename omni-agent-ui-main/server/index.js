const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());

// ── JSON "database" helpers ─────────────────────────────────
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ registrations: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ── Routes ──────────────────────────────────────────────────

// GET all registrations (optionally filter by status)
app.get('/api/registrations', (req, res) => {
  const db = readDB();
  const { status } = req.query;
  const list = status
    ? db.registrations.filter((r) => r.status === status)
    : db.registrations;
  res.json(list);
});

// POST — new company registration
app.post('/api/registrations', (req, res) => {
  const db = readDB();
  const newReg = {
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  db.registrations.push(newReg);
  writeDB(db);
  res.status(201).json(newReg);
});

// PATCH — approve or reject
app.patch('/api/registrations/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  const idx = db.registrations.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.registrations[idx] = { ...db.registrations[idx], ...req.body };
  writeDB(db);
  res.json(db.registrations[idx]);
});

// DELETE
app.delete('/api/registrations/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.registrations = db.registrations.filter((r) => r.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 OmniAI Backend running → http://localhost:${PORT}\n`);
});
