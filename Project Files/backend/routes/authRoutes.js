const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("Registering user:", email);

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, password, role });
        await user.save();
        console.log("User registered successfully:", email);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("CRITICAL REGISTRATION ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log("Login attempt:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.role !== role) {
            console.log("Role mismatch for:", email);
            return res.status(400).json({ message: `Access denied as ${role}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "fallback_secret", {
            expiresIn: "1d",
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error("CRITICAL LOGIN ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
