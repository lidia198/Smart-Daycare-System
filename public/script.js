const API_BASE = "http://localhost:3000/api";

// REGISTER FORM
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const full_name = document.getElementById("full_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const role = document.getElementById("role").value;

        const messageEl = document.getElementById("responseMessage");

        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name, email, password, phone, role })
            });

            const data = await response.json();

            if (response.ok) {
                messageEl.textContent = "Registration successful! Redirecting to login...";
                messageEl.className = "message success";
                setTimeout(() => window.location.href = "login.html", 1500);
            } else {
                messageEl.textContent = data.message || "Registration failed";
                messageEl.className = "message error";
            }
        } catch (error) {
            messageEl.textContent = "Server error. Please try again.";
            messageEl.className = "message error";
        }
    });
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const messageEl = document.getElementById("responseMessage");

        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);
                messageEl.textContent = "Login successful! Redirecting...";
                messageEl.className = "message success";

                setTimeout(() => {
                    if (data.user.role === "parent") {
                        window.location.href = "parent-dashboard.html";
                    } else if (data.user.role === "caregiver") {
                        window.location.href = "caregiver-dashboard.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }, 1000);
            } else {
                messageEl.textContent = data.message || "Login failed";
                messageEl.className = "message error";
            }
        } catch (error) {
            messageEl.textContent = "Server error. Please try again.";
            messageEl.className = "message error";
        }
    });
}