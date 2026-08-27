<script>
async function askAshwiniAI() {
  const question = document.getElementById("userQuestion").value.trim();
  const answer = document.getElementById("aiAnswer");

  if (!question) {
    answer.innerText = "Please enter a question first 🙂";
    return;
  }

  answer.innerText = "🤖 Ashwini AI is thinking...";

  try {
    const response = await fetch("https://ashwini-ai-website.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Server error");
    }

    answer.innerText = "🤖 Ashwini AI: " + data.answer;
  } catch (error) {
    console.error(error);
    answer.innerText = "❌ AI connection error. Please try again.";
  }
}
</script>

