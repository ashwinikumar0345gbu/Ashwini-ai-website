
app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: question
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error("OPENAI ERROR:", error);

    res.status(500).json({
      error: error.message || "OpenAI request failed"
    });
  }
});
