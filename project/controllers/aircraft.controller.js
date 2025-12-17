const db = require("../config/db");


exports.createAircraft = (req, res) => {
  const { aircraft_id, aircraft_type } = req.body;

  db.query(
    "INSERT INTO aircraft (aircraft_id, aircraft_type) VALUES (?, ?)",
    [aircraft_id, aircraft_type],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Pesawat berhasil ditambahkan" });
    }
  );
};

exports.listAircraft = (req, res) => {
  db.query("SELECT * FROM aircraft", (err, results) => {
    if (err) return res.status(500).json({ message: "Error server" });
    res.json(results);
  });
};

