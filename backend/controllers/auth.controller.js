import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateJETAndSetCookie from '../utils/generateJWT.js';

export const signup = async(req, res) => {
  try {
    console.log("Request received for signup:", req.body);
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      console.log("Password doesn't match");
      return res.status(400).json({ error: "Password doesn't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      console.log("User already exists:", username);
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy`;


    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    if (newUser) {
      generateJETAndSetCookie(newUser._id, res);
      await newUser.save();

      console.log("User created successfully:", newUser.username);
      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic
      });
    } else {
      console.log("Invalid user data");
      return res.status(400).json({ msg: "Invalid user data" });
    }
    
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logout =(req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({msg:"logged out succesfully"})
  } catch (error) {
    console.log("error in logout controller", error.message)
    res.status(500).json({error:"Internal server Error"})
  }
};

export const login = async(req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:" Invalid username or password"});
    };

    generateJETAndSetCookie(user._id,res);

    res.status(200).json({
      _id:user._id,
      fullname:user.fullname,
      username:user.username,
      profilePic:user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error.message)
    res.status(500).json({error:"Internal server Error"})
  }
};
