import User from "@/models/user.models";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hasedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "57c25b40adb092",
        pass: "3777f5ca1ed44e",
      },
    });
    const mailOptions = {
      from: "sikandar@gmail", // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify Your Email" : "reset password", // Subject line

      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?yoken=${hasedToken}">here</a>  to  ${
        emailType === "VERIFY" ? "verify your email" : "reset youre passaword"
      }  or Copy paste the link below in the browser 
      <br> ${process.env.DOMAIN}/verifyemail?yoken=${hasedToken}</p>`, // html body
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
