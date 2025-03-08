document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("jobApplicationForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const project = document.getElementById("project").value;
            const resume = document.getElementById("resume").files[0];

            if (name && email && phone && resume) {
                alert("Application submitted successfully!\n\nWe will contact you soon.");
                form.reset();
                document.getElementById("applicationForm").style.display = "none"; // Hide form after submission
            } else {
                alert("Please fill all required fields.");
            }
        });
    }
});

// Function to show the job application form
function showApplicationForm(jobTitle) {
    document.getElementById("applicationForm").style.display = "block";
    document.getElementById("jobTitle").textContent = jobTitle;
}