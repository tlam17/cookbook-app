const pool = require('../db/pool');

const getAllUsers = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Users');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const addUser = async (req, res) => {
    try {
        const { UserID, Password, Email, Name } = req.body;

        if (!UserID || !Password || !Email || !Name) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const userQuery = 'INSERT INTO Users (userID, password, email, name) VALUES ($1, $2, $3, $4)';
        await pool.query(userQuery, [UserID, Password, Email, Name]);

        res.status(201).json({ message: 'User added successfully', UserID: UserID, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add user. ' + error.message });
    }
}

module.exports = {
    getAllUsers,
    addUser
};