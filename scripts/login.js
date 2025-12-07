
document.getElementById("loginbutton").onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username) {
    document.getElementById("message").textContent = "Please enter a username.";
    return;
  }

  if (!password) {
    document.getElementById("message").textContent = "Please enter a password.";
    return;
  }

  const data = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  };

  try {
    const response = await fetch("http://127.0.0.1:3000/login", data);
    const json = await response.json();
    document.getElementById("message").textContent = json.message;
  if (json.success) {
    window.location.href = "index.html"
  }
  } catch (e) {
    document.getElementById("message").textContent = "Could not connect to the server";
  }
};


document.getElementById("registerbutton").onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username) {
    document.getElementById("message").textContent = "Please enter a username.";
    return;
  }

  if (!password) {
    document.getElementById("message").textContent = "Please enter a password.";
    return;
  }

  const data = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  };

  try {
    const response = await fetch("http://127.0.0.1:3000/register", data);
    const json = await response.json();
    document.getElementById("message").textContent = json.message;
      if (json.success) {
    window.location.href = "story.html"
  }
  } catch (e) {
    document.getElementById("message").textContent = "Could not connect to the server";
  }
};
