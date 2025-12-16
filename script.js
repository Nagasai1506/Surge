// Submit Issue
document.getElementById("issueForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let issueId = "ISS" + Math.floor(Math.random() * 10000);

    let issueData = {
        name: name.value,
        empId: empId.value,
        department: department.value,
        issue: issue.value,
        status: "Pending"
    };

    localStorage.setItem(issueId, JSON.stringify(issueData));

    result.innerHTML = "Issue Submitted Successfully!<br>Your Issue ID: " + issueId;

    this.reset();
});

// Track Issue
function trackIssue() {
    let id = trackId.value;
    let data = localStorage.getItem(id);

    if (data) {
        let issue = JSON.parse(data);
        statusResult.innerText = "Current Status: " + issue.status;
    } else {
        statusResult.innerText = "Invalid Issue ID";
    }
}

// Update Status (Admin)
function updateStatus() {
    let id = adminIssueId.value;
    let data = localStorage.getItem(id);

    if (data) {
        let issue = JSON.parse(data);
        issue.status = newStatus.value;
        localStorage.setItem(id, JSON.stringify(issue));
        adminResult.innerText = "Status Updated Successfully!";
    } else {
        adminResult.innerText = "Issue ID Not Found";
    }
}
