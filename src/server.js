import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateJWT } from "./jwt.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.redirect("https://avenao-academy.com");
});

app.post("/messaging", async (req, res) => {
  const { external_id, email, name } = req.body;

  if (!external_id || !email || !name) {
    return res.status(401).send("missing parameters");
  }

  try {
    const jwt = await generateJWT({
      name,
      email,
      external_id,
    });
    res.send(jwt);
  } catch (error) {
    console.error("Error generating JWT:", error);
    res.status(401).send(error.message);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
