/* =====================================================
   EMPLOYEE PAGE – SUBMIT ISSUE
===================================================== */
document.getElementById("issueForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Generate unique Issue ID
    let issueId = "ISS" + Math.floor(1000 + Math.random() * 9000);

    // Store issue details (KEY NAMES ARE IMPORTANT)
    let issueData = {
        name: document.getElementById("name").value,   // ✅ FIXED
        empId: document.getElementById("empId").value,
        department: document.getElementById("department").value,
        issue: document.getElementById("issue").value,
        status: "Pending"
    };

    // Save issue
    localStorage.setItem(issueId, JSON.stringify(issueData));

    // Show Issue ID
    document.getElementById("result").innerHTML =
        "✅ Issue Submitted Successfully!<br><b>Your Issue ID:</b> " + issueId;

    // Reset form
    this.reset();
});


/* =====================================================
   EMPLOYEE PAGE – TRACK ISSUE (STATUS ONLY)
===================================================== */
function trackIssue() {
    let id = document.getElementById("trackId").value.trim();
    let data = localStorage.getItem(id);
    let statusResult = document.getElementById("statusResult");

    if (data) {
        let issue = JSON.parse(data);
        statusResult.innerHTML =
            "<b>Issue ID:</b> " + id + "<br>" +
            "<b>Current Status:</b> " + issue.status;
    } else {
        statusResult.innerHTML = "❌ Invalid Issue ID";
    }
}


/* =====================================================
   ADMIN LOGIN
===================================================== */
function adminLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;
    let loginResult = document.getElementById("loginResult");

    // Demo credentials
    if (user === "admin" && pass === "admin123") {
        sessionStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        loginResult.innerText = "❌ Invalid credentials";
    }
}


/* =====================================================
   ADMIN AUTH PROTECTION
===================================================== */
if (window.location.pathname.includes("admin.html")) {
    if (sessionStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin-login.html";
    }
}


/* =====================================================
   ADMIN PANEL – VIEW & UPDATE ISSUE (FULL DETAILS)
===================================================== */
function updateStatus() {
    let id = document.getElementById("adminIssueId").value.trim();
    let data = localStorage.getItem(id);
    let adminResult = document.getElementById("adminResult");

    if (data) {
        let issue = JSON.parse(data);

        // Update status
        issue.status = document.getElementById("newStatus").value;
        localStorage.setItem(id, JSON.stringify(issue));

        // Display FULL issue details (FIXED: issue.name)
        adminResult.innerHTML = `
            <strong>📋 Issue Details (Admin Panel)</strong><br><br>
            <b>Issue ID:</b> ${id}<br>
            <b>Employee Name:</b> ${issue.name}<br>
            <b>Employee ID:</b> ${issue.empId}<br>
            <b>Department:</b> ${issue.department}<br>
            <b>Issue:</b> ${issue.issue}<br>
            <b>Status:</b> ${issue.status}
        `;
    } else {
        adminResult.innerHTML = "❌ Issue ID Not Found";
    }
}


/* =====================================================
   LOGOUT
===================================================== */
function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
}
