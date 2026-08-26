function projectMessage() {

  const message = document.getElementById("message");

  message.innerText = "🚀 Project details coming soon!";

  message.style.display = "block";

  setTimeout(function () {
    message.style.display = "none";
  }, 2500);

}
