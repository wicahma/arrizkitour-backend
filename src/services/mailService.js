const mailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

const transporter = mailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendEmail = async ({ email, data, identifier }) => {
  console.group("Mailer is starting...");
  console.log("-- email", email);
  console.log("-- data", data);
  console.log("-- identifier", identifier);
  try {
    console.log("-- compiling transporter...");

    const reader = fs.readFileSync(
      __dirname +
        `/../html/orders/${identifier
          .replace(/\s+/g, "-")
          .toLowerCase()}-order.html`,
      {
        encoding: "utf-8",
      }
    );

    console.log("-- html", reader.html);
    const template = handlebars.compile(reader);

    const mailOptions = {
      from: "Arrizki Tour <arrizkitour@gmail.com>",
      replyTo: "arrizkitour@gmail.com",
      to: email,
      subject: `Order ${identifier}`,
      html: template(data),
      attachments: [
        {
          filename: "check.png",
          path: __dirname + "/../../public/icons/check.png",
          cid: "check@tour.arrizki",
        },
        {
          filename: "facebook.png",
          path: __dirname + "/../../public/icons/facebook.png",
          cid: "facebook@tour.arrizki",
        },
        {
          filename: "instagram.png",
          path: __dirname + "/../../public/icons/instagram.png",
          cid: "instagram@tour.arrizki",
        },
        {
          filename: "whatsapp.png",
          path: __dirname + "/../../public/icons/whatsapp.png",
          cid: "whatsapp@tour.arrizki",
        },
      ],
    };
    const mailer = await transporter.sendMail(mailOptions);
    console.log("-- Email is sent!");
    console.groupEnd();
    return mailer.response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
