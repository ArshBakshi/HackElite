const User = require("../models/User");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Directly compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If credentials are valid, send success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
