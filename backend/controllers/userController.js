const pool = require('../db/pool');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { userId, email, password, name } = req.body;
  try {
    //const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;
    await pool.query('INSERT INTO Users (UserID, Password, Email, Name) VALUES ($1, $2, $3, $4)', 
      [userId, hashedPassword, email, name]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
module.exports = {
    getAllUsers, registerUser,
};