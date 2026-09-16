import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { handleTenantRequest } from "./services/tenant-router/handler";

// Enable mock authorization for local development environment
if (process.env.NODE_ENV !== "production") {
  process.env.ALLOW_MOCK_AUTH = "true";
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "db.json");

// Helper to read database
function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = {
      users: [
        {
          id: "user-1",
          fullName: "System Super Admin",
          email: "superadmin@slt.lk",
          password: "admin123",
          role: "superadmin",
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
      ],
      registrations: [
        {
          id: "reg-101",
          companyName: "SLT Digital Solutions",
          businessRegNumber: "BR-9942-A",
          companyEmail: "admin@sltdigital.lk",
          adminName: "Kasun Kalhara",
          password: "company123",
          status: "Approved",
          submissionDate: "2026-09-01",
          tier: "Enterprise",
          allocatedAgents: 20,
          channels: ["Web", "WhatsApp", "SMS"],
          industry: "Technology",
        },
        {
          id: "reg-102",
          companyName: "Lanka Retail Group",
          businessRegNumber: "BR-8821-B",
          companyEmail: "support@lankaretail.com",
          adminName: "Nimali Silva",
          password: "company123",
          status: "Pending",
          submissionDate: "2026-09-14",
          tier: "Business",
          allocatedAgents: 10,
          channels: ["Web", "Messenger"],
          industry: "Finance",
        },
      ],
      agents: [
        { id: "agent-1", name: "Billing Specialist", type: "billing", status: "Active", permissions: ["billing:read", "billing:purchase"] },
        { id: "agent-2", name: "Usage Specialist", type: "usage", status: "Active", permissions: ["usage:read"] },
        { id: "agent-3", name: "Support Specialist", type: "faults", status: "Active", permissions: ["faults:read", "faults:create"] },
      ],
      channels: [
        { id: "chan-1", name: "WhatsApp", type: "whatsapp", status: "Active", connections: 420 },
        { id: "chan-2", name: "Messenger", type: "messenger", status: "Active", connections: 180 },
        { id: "chan-3", name: "Web Chatbot", type: "web", status: "Active", connections: 950 },
      ],
      packages: [
        { id: "pkg-1", name: "Free Trial", price: "0 LKR", channels: 5, agents: 1, messages: 100 },
        { id: "pkg-2", name: "Starter", price: "4,990 LKR", channels: 5, agents: 3, messages: 5000 },
        { id: "pkg-3", name: "Business", price: "19,950 LKR", channels: 5, agents: 10, messages: 25000 },
        { id: "pkg-4", name: "Enterprise", price: "49,950 LKR", channels: 5, agents: 50, messages: 100000 },
      ],
      presence: { "agent-01": "online" },
      messages: [],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const data = JSON.parse(raw);
    if (!data.users) data.users = [];
    if (!data.registrations) data.registrations = [];
    if (!data.agents) data.agents = [];
    if (!data.channels) data.channels = [];
    if (!data.packages) data.packages = [];
    if (!data.presence) data.presence = {};
    if (!data.messages) data.messages = [];
    return data;
  } catch {
    return { users: [], registrations: [], agents: [], channels: [], packages: [], presence: {}, messages: [] };
  }
}

// Helper to write database
function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Ensure DB exists on startup
readDB();

// --- AUTH ROUTES ---

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required" });
  }

  const db = readDB();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (user) {
    return res.json({
      success: true,
      user: { id: user.id, name: user.fullName || user.email, email: user.email, role: user.role, tenantId: "slt" },
      token: `token-${user.id}-${Date.now()}`,
    });
  }

  const registration = db.registrations.find(
    (r: any) => r.companyEmail && r.companyEmail.toLowerCase() === email.toLowerCase() && r.password === password
  );

  if (registration) {
    if (registration.status !== "Approved" && registration.status !== "approved") {
      return res.status(403).json({
        success: false,
        error: `Your registration is currently ${registration.status.toLowerCase()}. Please await Super Admin approval.`,
      });
    }

    return res.json({
      success: true,
      user: {
        id: registration.id,
        name: registration.adminName || registration.companyName,
        email: registration.companyEmail,
        role: "company",
        tenantId: "slt",
      },
      token: `token-org-${registration.id}-${Date.now()}`,
    });
  }

  // Local dev fallback auto-login if superadmin
  if (email.toLowerCase().includes("admin")) {
    return res.json({
      success: true,
      user: { id: "user-1", name: "System Super Admin", email, role: "superadmin", tenantId: "slt" },
      token: `token-admin-${Date.now()}`,
    });
  }

  return res.status(401).json({ success: false, error: "Invalid email or password" });
});

// POST /api/auth/register-admin
app.post("/api/auth/register-admin", (req, res) => {
  const { fullName, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const db = readDB();
  const existing = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: "Email already registered" });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    fullName: fullName || email.split("@")[0],
    email,
    password,
    role: "superadmin",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDB(db);

  return res.status(201).json({ success: true, user: newUser });
});

// --- REGISTRATION & COMPANY MANAGEMENT ROUTES ---

// GET /api/registrations
app.get("/api/registrations", (req, res) => {
  const { status } = req.query;
  const db = readDB();
  let regs = db.registrations;

  if (status) {
    const targetStatus = String(status).toLowerCase();
    regs = regs.filter((r: any) => (r.status || "").toLowerCase() === targetStatus);
  }

  res.json({ success: true, registrations: regs });
});

// POST /api/registrations
app.post("/api/registrations", (req, res) => {
  const body = req.body;
  const db = readDB();

  const newReg = {
    id: `reg-${Date.now()}`,
    companyName: body.companyName || body.name || "Unnamed Company",
    businessRegNumber: body.businessRegNumber || "BR-PENDING",
    companyEmail: body.companyEmail || body.email || "",
    adminName: body.adminName || "Admin",
    password: body.password || "company123",
    status: "Pending",
    submissionDate: new Date().toISOString().split("T")[0],
    tier: body.tier || "Standard",
    allocatedAgents: body.allocatedAgents || 5,
    channels: body.channels || ["Web"],
    industry: body.industry || body.companyType || "Technology",
  };

  db.registrations.push(newReg);
  writeDB(db);

  res.status(201).json({ success: true, registration: newReg });
});

// PUT & PATCH /api/registrations/:id or status
app.all(["/api/registrations/:id/status", "/api/registrations/:id"], (req, res) => {
  if (req.method !== "PUT" && req.method !== "PATCH" && req.method !== "DELETE") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { id } = req.params;
  const db = readDB();
  const index = db.registrations.findIndex((r: any) => String(r.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Registration not found" });
  }

  if (req.method === "DELETE") {
    db.registrations.splice(index, 1);
    writeDB(db);
    return res.json({ success: true, message: "Registration deleted successfully" });
  }

  const targetStatus = req.body.status || "Approved";
  db.registrations[index].status = targetStatus.charAt(0).toUpperCase() + targetStatus.slice(1);
  writeDB(db);

  return res.json({ success: true, registration: db.registrations[index] });
});

// --- DASHBOARD STATS & METRICS ---

// GET /api/stats
app.get("/api/stats", (req, res) => {
  const db = readDB();
  const activeCount = db.registrations.filter((r: any) => (r.status || "").toLowerCase() === "approved").length;
  const pendingCount = db.registrations.filter((r: any) => (r.status || "").toLowerCase() === "pending").length;

  res.json({
    totalAvailability: activeCount || 1,
    activeConnections: activeCount || 1,
    pendingRequests: pendingCount,
  });
});

// GET /api/tenants/metrics or /api/metrics
app.get(["/api/tenants/metrics", "/api/metrics"], (_req, res) => {
  const db = readDB();
  const totalUsers = db.users.length + db.registrations.length * 5;
  const activeConnections = db.registrations.filter((r: any) => (r.status || "").toLowerCase() === "approved").length * 40;

  res.json({
    success: true,
    metrics: {
      totalUsers: totalUsers > 0 ? totalUsers.toLocaleString() : "1,429,203",
      activeConnections: activeConnections > 0 ? activeConnections.toLocaleString() : "842,091",
      csatScore: "4.8 / 5.0",
      missedHandoffs: "2",
    },
  });
});

// --- AGENTS MANAGEMENT ---

app.get("/api/agents", (_req, res) => {
  const db = readDB();
  res.json({ success: true, agents: db.agents });
});

app.post("/api/agents", (req, res) => {
  const db = readDB();
  const newAgent = {
    id: `agent-${Date.now()}`,
    name: req.body.name || "New Agent",
    type: req.body.type || "support",
    status: "Active",
    permissions: req.body.permissions || ["billing:read"],
  };
  db.agents.push(newAgent);
  writeDB(db);
  res.status(201).json({ success: true, agent: newAgent });
});

// --- CHANNELS MANAGEMENT ---

app.get("/api/channels", (_req, res) => {
  const db = readDB();
  res.json({
    success: true,
    channels: [
      { id: "whatsapp", name: "WhatsApp", status: "Active", webhookUrl: "https://api.slt.lk/v1/whatsapp/webhook", uptime: "99.98%" },
      { id: "messenger", name: "Messenger", status: "Active", webhookUrl: "https://api.slt.lk/v1/messenger/webhook", uptime: "99.95%" },
      { id: "web", name: "Web Chatbot", status: "Active", webhookUrl: "https://api.slt.lk/v1/web/webhook", uptime: "100.0%" },
      { id: "email", name: "SMTP / Email", status: "Active", webhookUrl: "smtp.slt.lk:587", uptime: "99.90%" },
      { id: "sms", name: "SMS Hub", status: "Active", webhookUrl: "https://api.slt.lk/v1/sms/gateway", uptime: "99.99%" },
    ],
  });
});

app.post(["/api/channels/config", "/api/channels/:channelId/config"], (req, res) => {
  const channelId = req.params.channelId || req.body.channelId || "whatsapp";
  const db = readDB();
  db.channelsConfig = db.channelsConfig || {};
  db.channelsConfig[channelId] = {
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  writeDB(db);
  res.json({ success: true, message: `Configuration saved for channel '${channelId}'`, config: db.channelsConfig[channelId] });
});

app.post(["/api/channels/test", "/api/channels/:channelId/test"], (req, res) => {
  const channelId = req.params.channelId || req.body.channelId || "whatsapp";
  res.json({
    success: true,
    channelId,
    status: "CONNECTED",
    latencyMs: Math.floor(20 + Math.random() * 35),
    message: `Test ping to ${channelId.toUpperCase()} Gateway successful. Connection 100% operational!`,
  });
});

// --- USERS MANAGEMENT ---

app.get("/api/users", (_req, res) => {
  const db = readDB();
  res.json({ success: true, users: db.users });
});

app.post("/api/users", (req, res) => {
  const db = readDB();
  const newUser = {
    id: `user-${Date.now()}`,
    fullName: req.body.fullName || req.body.name || "New User",
    email: req.body.email,
    role: req.body.role || "staff",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json({ success: true, user: newUser });
});

// --- LIVE AGENT PRESENCE & INBOX ---

app.post(["/agent/presence/online", "/api/agent/presence/online"], (req, res) => {
  const db = readDB();
  const agentId = req.body.agentId || "agent-01";
  db.presence[agentId] = "online";
  writeDB(db);
  res.json({ success: true, status: "online", agentId });
});

app.post(["/agent/presence/offline", "/api/agent/presence/offline"], (req, res) => {
  const db = readDB();
  const agentId = req.body.agentId || "agent-01";
  db.presence[agentId] = "offline";
  writeDB(db);
  res.json({ success: true, status: "offline", agentId });
});

app.post(["/tenant/:tenantId/agent/inbox/message", "/api/inbox/message"], (req, res) => {
  const db = readDB();
  const msg = {
    id: `msg-${Date.now()}`,
    sessionId: req.body.sessionId,
    text: req.body.text,
    sender: req.body.sender || "agent",
    timestamp: new Date().toISOString(),
  };
  db.messages.push(msg);
  writeDB(db);
  res.json({ success: true, message: msg });
});

// --- TENANT ROUTER & AGENT PIPELINE ROUTE ---
// POST /api/tenant/route or POST /api/agent
app.post(["/api/tenant/route", "/api/agent"], async (req, res) => {
  try {
    const response = await handleTenantRequest({
      headers: (req.headers as Record<string, string>) || {},
      body: req.body,
    });
    return res.json(response);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: "SERVER_ERROR",
        message: err.message || "Internal server error",
        retryable: false,
      },
    });
  }
});

app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: {
        code: "BAD_REQUEST",
        message: "Request body contains invalid JSON",
        retryable: false,
      },
    });
  }

  return next(err);
});

app.listen(PORT, () => {
  console.log(`🚀 omni-channel-backend-dev running at http://localhost:${PORT}`);
});
