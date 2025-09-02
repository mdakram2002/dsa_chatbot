import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateDSAResponse } from "./services/api.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await generateDSAResponse(messages);

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
