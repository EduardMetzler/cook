const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post(
  "/register",
  [
    check("firstName", "Mindestlänge ist 1 Zeichen").isLength({ min: 1 }),
    check("lastName", "Mindestlänge ist 1 Zeichen").isLength({ min: 1 }),
    check("email", "E-Mail erforderlich").isEmail(),
    check("password", "Mindestlänge ist 6 Zeichen").isLength({ min: 6 }),
    check("repeatedPassword", "Mindestlänge ist 6 Zeichen").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Registration failed",
        });
      }

      const { firstName, lastName, email, password, repeatedPassword } =
        req.body;
    
        

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already registered" });
      }

      if (password !== repeatedPassword) {
        return res
          .status(400)
          .json({ message: "The passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        persone: { firstName, lastName },
        avatar:"https://curity.io/images/resources/guides/tech/guides-tech-angular-og.png",
        role:"user",
      });
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecter"), {
        expiresIn: "1h",
      });
  

      await user.save();

      res.status(201).json({ message: "Registration is successful", token });
    } catch (e) {
      res.status(500).json({ message: "Error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "E-Mail ist nicht korrekt").normalizeEmail().isEmail(),
    check("password", "Passwort ist nicht korrekt").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong email or password",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Wrong email or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Wrong email or password" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecter"), {
        expiresIn: "1000d",
      });

      res.json({
        token,message:"Login is successful"
      });
    } catch (e) {
      res.status(500).json({ message: "Error" });
    }
  }
);



module.exports = router;
