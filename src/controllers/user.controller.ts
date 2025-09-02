import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, {IUser} from '../models/user.model'

export const registerUser = async(req: Request, res: Response): Promise<void> => {
 try {
    const { username, email, password } = req.body;

    // check if user already exist
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    // generate JWT
    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ message: "authentication error contact administrator" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}