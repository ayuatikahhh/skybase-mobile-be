const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM supervisor WHERE username = ?", [username], async (err, results) => {
    if (results.length === 0)
      return res.status(401).json({ error: "Username tidak ditemukan" });

    const supervisor = results[0];

    const match = await bcrypt.compare(password, supervisor.password);
    if (!match) return res.status(401).json({ error: "Password salah" });

    const token = jwt.sign(
      { id: supervisor.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login berhasil", token });
  });
};

// LOGOUT
exports.logout = (req, res) => {
  // Logout itu simpel → client cukup hapus token
  res.json({ message: "Logout berhasil" });
};
