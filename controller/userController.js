import Users from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function signUp(req, res) {
    try {
        const { Username, Email, Password } = req.body;
        const existingUser = await Users.findOne({ $or: [{ Username }, { Email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        const user = new Users({ Username, Email, Password });
        await user.save();
        
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function signIn(req, res) {
    const { Email, Password } = req.body;

    try {
        const user = await Users.findOne({ Email });
        if (!user || !(await user.matchPassword(Password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
  },
});

export async function forgotPassword(req, res) {
  const { Email } = req.body;

  try {
      const user = await Users.findOne({ Email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      const resetUrl = `${process.env.CLIENT_URL}/resetpassword?token=${resetToken}`;

      const mailOptions = {
          from: process.env.EMAIL,
          to: user.Email,
          subject: 'Password Reset Request',
          text: `You requested a password reset. Please click the link to reset your password: ${resetUrl}`,
          html: `<p>You requested a password reset. Please click the link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ message: 'Error sending email' });
          }
          res.status(200).json({ message: 'Reset link sent to your email address' });
      });

  } catch (error) {
      console.error('Error in forgot password:', error);
      res.status(500).json({ message: 'Server error' });
  }
}

export async function resetPassword(req, res) {
  const { resetToken, newPassword } = req.body;

  try {
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
      const user = await Users.findById(decoded._id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.Password = newPassword;
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Invalid or expired reset token' });
  }
}