import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail's service
      auth: {
        user: process.env.EMAIL_USERNAME, // Your Gmail email address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail app password (not your regular Gmail password)
      },
    });
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.titan.email', // Hostinger's SMTP server
    //   port: 465, // Secure port for SMTP over SSL
    //   secure: true, // Use SSL
    //   auth: {
    //     user: process.env.MAIL_USER, // Your Hostinger email address
    //     pass: process.env.MAIL_PASSWORD, // Your Hostinger email password
    //   },
    // });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: https://www.murshadpk.com/customer/pages/verify?token=${token}`,
      html: `<p>Please verify your email by clicking the following link: <a href="https://www.murshadpk.com/customer/pages/verify?token=${token}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}
