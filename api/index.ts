import cors from "cors";
import express from "express";
import path from "path";
const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

// ✅ API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", (req, res) => {
  console.log(req.body);
  res.json({
    success: true,
    message: "Message sent successfully 🚀",
  });
});

// ✅ START SERVER (Local dev only, Vercel uses the exported module)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

export default app;