const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

// CORS को अनुमति दें ताकि फ्रंटएंड कनेक्ट हो सके
app.use(cors());
app.use(express.json());

// OpenAI क्लाइंट सेटअप
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Ashwini AI Backend is running ✅");
});

app.get("/test", (req, res) => {
  res.json({
    status: "OK",
    message: "Ashwini AI backend is working"
  });
});

// इसे बदलकर /api/chat किया गया है ताकि फ्रंटएंड से मैच हो सके
app.post("/api/chat", async (req, res) => {
  try {
    console.log("ASK REQUEST:", req.body);

    // फ्रंटएंड 'message' भेज रहा है, इसलिए req.body.message पढ़ेंगे
    const question = req.body.message;

    if (!question) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    // OpenAI का सही और चालू चैट कम्प्लीशन कोड (gpt-4o-mini मॉडल के साथ)
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // यह सबसे तेज़ और सस्ता मॉडल है
      messages: [{ role: "user", content: question }]
    });

    // फ्रंटएंड 'reply' नाम से डेटा खोज रहा है, इसलिए 'reply' भेजेंगे
    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error("OPENAI ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Ashwini AI server started");
});

