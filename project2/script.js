document.getElementById("skillForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const skills = document.getElementById("skills").value.toLowerCase().split(",");
  const interest = document.getElementById("interest").value;
  const team = document.querySelector('input[name="team"]:checked').value;

  let suggestion = "";

  if (interest === "web") {
    suggestion = "Build a full-stack SaaS platform like Notion or Trello.";
  } else if (interest === "ml") {
    suggestion = "Create an ML-based stock predictor using TensorFlow.js.";
  } else if (interest === "game") {
    suggestion = "Make a multiplayer browser game using WebSockets.";
  } else {
    suggestion = "Develop a command-line tool to automate file sorting.";
  }

  // Adjust suggestion
  if (skills.includes("react")) {
    suggestion += " Use React for your frontend!";
  }
  if (team === "team") {
    suggestion += " Structure the project for collaboration using GitHub projects.";
  }

  document.getElementById("result").innerHTML = `
    <h2>🧠 Smart Suggestion:</h2>
    <p>${suggestion}</p>
  `;
});
