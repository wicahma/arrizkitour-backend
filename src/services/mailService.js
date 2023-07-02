const mailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

const transporter = mailer.createTransport({
  service: "arrizkitour",
  host: "mail.arrizkitour.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendEmail = async ({ email, data, identifier, type }) => {
  console.group("Mailer is starting...");
  console.log("-- email", email);
  console.log("-- data", data);
  console.log("-- identifier", identifier);
  let adminMail;
  try {
    console.log("-- compiling transporter...");

    const reader = fs.readFileSync(
      __dirname +
        `/../html/${type}/${identifier
          .replace(/\s+/g, "-")
          .toLowerCase()}-${type.slice(0, -1)}.html`,
      {
        encoding: "utf-8",
      }
    );

    const readerAdmin = (type) => {
      return fs.readFileSync(
        __dirname +
          `/../html/admin/${identifier
            .replace(/\s+/g, "-")
            .toLowerCase()}-admin.html`,
        {
          encoding: "utf-8",
        }
      );
    };

    console.log("-- html", reader.html);
    const template = handlebars.compile(reader);

    const mailOptions = {
      from: "Admin - Arrizki Tour <admin@arrizkitour.com>",
      replyTo: "arrizkitour@gmail.com",
      to: email,
      subject: `${
        type.toString().charAt(0).toUpperCase() + type.toString().slice(1, -1)
      } ${identifier}`,
      html: template(data, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      }),
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

    if (type === "orders") {
      const templateAdmin = handlebars.compile(readerAdmin(type));

      const mailOptionsAdmin = {
        from: "Admin - Arrizki Tour <admin@arrizkitour.com>",
        replyTo: "arrizkitour@gmail.com",
        to: process.env.MAIL_TOUR.toString(),
        subject: `${
          type.toString().charAt(0).toUpperCase() + type.toString().slice(1, -1)
        } ${identifier}`,
        html: templateAdmin(data, {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        }),
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
      adminMail = await transporter.sendMail(mailOptionsAdmin);
    }

    console.log("-- Email is sent!");
    console.groupEnd();

    return mailer;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

exports.rupiah = (angka) => {
  intl = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return intl.format(angka);
};
exports.tanggal = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
exports.tanggalWaktu = (date) => {
  const formated = new Date(date);
  const intlDateTime = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(formated);
  return intlDateTime;
};
