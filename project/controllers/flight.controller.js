const db = require("../config/db");

// CREATE FLIGHT
exports.createFlight = (req, res) => {
  const { aircraft_id, destination, departure_date, departure_time, arrival_date, arrival_time } = req.body;

  db.query(
    "INSERT INTO flights (aircraft_id, destination, departure_date, departure_time, arrival_date, arrival_time, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [aircraft_id, destination, departure_date, departure_time, arrival_date, arrival_time, req.supervisorId],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Flight berhasil dibuat" });
    }
  );
};

// READ (LIST) FLIGHTS
exports.listFlights = (req, res) => {
  const query = `
    SELECT 
      flights.id AS id,
      aircraft.id AS aircraft_id,
      aircraft.aircraft_type,
      aircraft.aircraft_id AS aircraft_code,
      flights.destination,

      DATE_FORMAT(flights.departure_date, '%Y-%m-%d') AS departure_date,
      TIME_FORMAT(flights.departure_time, '%H:%i') AS departure_time,

      DATE_FORMAT(flights.arrival_date, '%Y-%m-%d') AS arrival_date,
      TIME_FORMAT(flights.arrival_time, '%H:%i') AS arrival_time

    FROM flights
    JOIN aircraft ON flights.aircraft_id = aircraft.id
    ORDER BY flights.departure_date, flights.departure_time ASC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Error server" });
    res.json(results);
  });
};


// UPDATE FLIGHT
exports.updateFlight = (req, res) => {
  const { id } = req.params;
  const { aircraft_id, destination, departure_date, departure_time, arrival_date, arrival_time } = req.body;

  db.query(
    "UPDATE flights SET aircraft_id=?, destination=?, departure_date=?, departure_time=?, arrival_date=?, arrival_time=? WHERE id=?",
    [aircraft_id, destination, departure_date, departure_time, arrival_date, arrival_time, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Gagal update flight" });
      res.json({ message: "Flight berhasil diperbarui" });
    }
  );
};

// DELETE FLIGHT
exports.deleteFlight = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM flights WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Gagal menghapus flight" });
    res.json({ message: "Flight berhasil dihapus" });
  });
};

// READ 5 JADWAL TERDEKAT 
exports.latestFlights = (req, res) => {
  const query = `
    SELECT 
      flights.id,
      aircraft.id AS aircraft_id,
      aircraft.aircraft_type,
      aircraft.aircraft_id AS aircraft_code,
      flights.destination,

      DATE_FORMAT(flights.departure_date, '%Y-%m-%d') AS departure_date,
      TIME_FORMAT(flights.departure_time, '%H:%i') AS departure_time,

      DATE_FORMAT(flights.arrival_date, '%Y-%m-%d') AS arrival_date,
      TIME_FORMAT(flights.arrival_time, '%H:%i') AS arrival_time

    FROM flights
    JOIN aircraft ON flights.aircraft_id = aircraft.id
    ORDER BY flights.departure_date ASC, flights.departure_time ASC
    LIMIT 5
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error server" });
    }
    res.json(results);
  });
};

