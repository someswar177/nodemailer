require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
// Serve frontend files (assuming they are in a "public" folder)
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });


// Serve index.html when visiting the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to send emails
app.post("/send-email", upload.single("resume"), async (req, res) => {
    const { name, email, linkedin } = req.body;
    const resumePath = req.file ? req.file.path : null;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_RECEIVER, // Send email to yourself
        subject: "New Job Application",
        text: `Name: ${name}\nEmail: ${email}\nLinkedin: ${linkedin}`,
        attachments: resumePath ? [{ filename: req.file.originalname, path: resumePath }] : [],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, redirectUrl: "/thank-you.html" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send application." });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
