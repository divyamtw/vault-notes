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

  try {
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      console.log("User created!", user);
      return res.status(201).json({ message: "User registered successfully!" });
    }
  } catch (error) {
    console.log("user registration error : ", error.message);

    return res
      .status(500)
      .json({ message: "Something went wrong while registering user!" });
  }
};

const loginUser = async () => {
  const { email, password } = req.body;
  if ([email, password].some((field) => !field || field.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid user credentials!" });
    }

    const validUser = await user.isPasswordCorrect(password);
    if (!validUser) {
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
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //send access token in response
    return res
      .status(200)
      .json({ message: "User logged in successfully!", accessToken, user });
  } catch (error) {
    console.log("user login error : ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while logging in user!" });
  }
};

const logoutUser = async () => {};

const userProfile = async () => {};

export { registerUser, loginUser, logoutUser, userProfile };
