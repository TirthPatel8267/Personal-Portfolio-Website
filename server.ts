import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact Form Submission API
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // In a real app, you'd send an email or save to a database here.
    console.log("New Contact Form Submission:", { name, email, subject, message });
    
    // Simulate a bit of delay
    setTimeout(() => {
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your message, Tirth will get back to you soon!" 
      });
    }, 1000);
  });

  // Project Data API
  app.get("/api/projects", (req, res) => {
    const projects = [
      {
        id: "pixel-n-plate",
        title: "Pixel n Plate",
        description: "A comprehensive cafe and gaming platform integration with real-time booking and menu management.",
        tags: ["React", "Node.js", "MongoDB", "Tailwind"],
        image: "https://picsum.photos/seed/pixel/800/600",
        liveUrl: "#",
        githubUrl: "#",
        longDescription: "Pixel n Plate is a revolutionary platform designed to bridge the gap between casual dining and competitive gaming. It features a robust reservation system, a digital menu with real-time updates, and a gaming station booking module."
      },
      {
        id: "eventify",
        title: "Eventify",
        description: "Modern event booking system featuring dynamic scheduling, ticket generation, and user dashboards.",
        tags: ["Next.js", "TypeScript", "Firebase"],
        image: "https://picsum.photos/seed/event/800/600",
        liveUrl: "#",
        githubUrl: "#",
        longDescription: "Eventify simplifies the complex process of event management. From small meetups to large-scale conferences, it provides tools for organizers to manage attendees, and for users to discover and book events seamlessly."
      },
      {
        id: "e-waste",
        title: "E-Waste Management",
        description: "Sustainable solution for electronic waste tracking and recycling coordination with interactive maps.",
        tags: ["React", "Leaflet", "Express"],
        image: "https://picsum.photos/seed/waste/800/600",
        liveUrl: "#",
        githubUrl: "#",
        longDescription: "This project focuses on the critical issue of electronic waste. It provides a platform for users to locate certified recycling centers and track their environmental impact through a gamified contribution system."
      },
      {
        id: "power-bi",
        title: "Power BI Dashboard",
        description: "Advanced data visualization for business metrics, identifying trends and optimizing performance.",
        tags: ["Power BI", "SQL", "DAX"],
        image: "https://picsum.photos/seed/data/800/600",
        liveUrl: "#",
        githubUrl: "#",
        longDescription: "A comprehensive business intelligence solution that transforms raw data into actionable insights. It features interactive charts, predictive analytics, and automated reporting for executive decision-making."
      }
    ];
    res.json(projects);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
