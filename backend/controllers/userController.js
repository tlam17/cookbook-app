const pool = require('../db/pool');

const getAllUsers = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Users');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
    getAllUsers
};