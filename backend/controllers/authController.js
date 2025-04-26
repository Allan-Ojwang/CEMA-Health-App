import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as doctorModel from '../models/doctorModel.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;

const generateTokens = (doctor) => {
  const accessToken = jwt.sign(
    { id: doctor.id, full_name: doctor.full_name, email: doctor.email },
    JWT_SECRET,
    { expiresIn: '1h' } 
  );

  const refreshToken = jwt.sign(
    { id: doctor.id, full_name: doctor.full_name, email: doctor.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } 
  );

  return { accessToken, refreshToken };
};

const signup = async (req, res) => {
  const { full_name, license_number, email, password } = req.body;

  if (!full_name || !license_number || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  doctorModel.findDoctorByEmail(email, async (err, doctor) => {
    if (doctor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = {
      full_name,
      license_number,
      email,
      password: hashedPassword
    };

    doctorModel.createDoctor(newDoctor, (err, doctorId) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating doctor" });
      }

      const doctorData = { id: doctorId, full_name, email };
      const { accessToken, refreshToken } = generateTokens(doctorData);

      res.status(201).json({
        message: "Doctor registered successfully",
        doctorId,
        accessToken,
        refreshToken
      });
    });
  });
};

const signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  doctorModel.findDoctorByEmail(email, async (err, doctor) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const doctorData = { id: doctor.id, full_name: doctor.full_name, email: doctor.email };
    const { accessToken, refreshToken } = generateTokens(doctorData);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  });
};

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, doctor) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: doctor.id, full_name: doctor.full_name, email: doctor.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      accessToken: newAccessToken
    });
  });
};


export { signup, signin, refreshAccessToken };
