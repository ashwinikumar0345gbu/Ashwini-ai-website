const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: question
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI response nahi aa raha"
    });
  }
});
app.get("/", (req, res) => {
  res.send("Ashwini AI Backend is running ✅");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Ashwini AI server started");
});
