const db = require("../config/db");


exports.getProfile = (req, res) => {
  db.query(
    "SELECT id, username, email FROM supervisor WHERE id = ?",
    [req.supervisorId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Supervisor tidak ditemukan" });
      }

      res.json(result[0]);
    }
  );
};

