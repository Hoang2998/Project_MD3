const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

async function sendEmail(req, res) {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khuongdanhhoang123@gmail.com",
        pass: "hriawltvzrqhmaiz",
      },
    });

    const viewsDir = path.join(__dirname, "..", "view");
    const htmlPath = path.join(viewsDir, "template.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    const mailOptions = {
      from: "khuongdanhhoang123@gmail.com",
      to: email,
      subject: "THEGIOIDIDONG",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: "Vui long kiem tra email cua ban",
    });
  } catch (error) {
    console.error("Error sending forget password email:", error);
    throw new Error("Failed to send the forget password email.");
  }
}

module.exports = {
  sendEmail,
}