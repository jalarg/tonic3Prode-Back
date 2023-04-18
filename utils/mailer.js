const nodemailer = require("nodemailer");
const { gmailPassword } = require("../config");

const emailVerification = async (verificationLink, email) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "gambet.bigbang@gmail.com",
      pass: gmailPassword,
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "gambet.bigbang@gmail.com",
      to: email,
      subject: "Verificación de correo de Gambet",
      text: "Hello world?", // plain text body
      html: `
        <h2>Bienvenido a Gambet</h2>
        <p>Para verificar tu correo, por favor haz clic en el siguiente enlace:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    });

    console.log("Correo enviado exitosamente:", info.response);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

module.exports = emailVerification;
