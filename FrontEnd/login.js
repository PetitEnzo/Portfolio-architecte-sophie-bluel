// login.js
export function setupLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(apiEnd("/users/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
        userLog();
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Identifiants incorrects.";
        loginForm.appendChild(errorMessage);
      }
    });
}
