//login.js in routes folder

const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }
    //i am generating jwt token
    const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
    let myuser = { name: user.name, email: user.email, phone: user.phone };
    console.log(myuser);
    res.status(200).json({ message: "Login successful.", data: myuser ,token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
    
  }
});

module.exports = router;





// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email, password });
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({ message: "Invalid email or password." });
//     }
    
//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
    
//     let myuser = { name: user.name, email: user.email, phone: user.phone };
//     console.log(myuser);
//     res.status(200).json({ message: "Login successful.", data: myuser, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });
