import { User } from "../model/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    [firstName, lastName, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const isUserExists = await User.findOne({ email: normalizedEmail });
    if (isUserExists) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
    });

    if (user) {
      console.log("User created:", user._id);
      return res.status(201).json({ message: "User registered successfully!" });
    }
  } catch (error) {
    console.log("user registration error : ", error.message);

    return res
      .status(500)
      .json({ message: "Something went wrong while registering user!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => !field || field.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid user credentials!" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials!" });
    }

    // generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // send refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    //send access token in response
    return res
      .status(200)
      .json({ message: "User logged in successfully!", accessToken, safeUser });
  } catch (error) {
    console.log("user login error : ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while logging in user!" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({ message: "Already logged out" });
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({ message: "user logged out!" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "user logged out!" });
  } catch (error) {
    console.log("logout user : ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while logging out user!" });
  }
};

const userProfile = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

export { registerUser, loginUser, logoutUser, userProfile };
