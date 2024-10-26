import nodemailer from 'nodemailer';

export async function sendResetPasswordEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail's service
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME, // Your Gmail email address
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD, // Your Gmail app password (not your regular Gmail password)
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
      from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Please reset your password by clicking the following link: ${process.env.BASE_URL}/customer/pages/reset?token=${token}`,
      html: `<p>You requested a password reset. Please reset your password by clicking the following link: <a href="${process.env.BASE_URL}/customer/pages/reset?token=${token}">Reset Password</a></p>`,
    };

    const ok = await transporter.sendMail(mailOptions);
    const result =ok.response;
    console.log("Response is : ",ok, "And result is : ",result);
    console.log('Password reset email sent successfully to ',email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
