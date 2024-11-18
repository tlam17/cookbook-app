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

const updateUser = async (req, res) => {
  const { userId } = req.params; 
  const { name, password, email } = req.body; 
  try {
    const qStrings = [];
    const values = [];
    let query = 'UPDATE Users SET ';

    if (name) {
      qStrings.push('Name = $' + (qStrings.length + 1)); 
      values.push(name); 
    }
    
    if (password) {
      qStrings.push('Password = $' + (qStrings.length + 1));
      values.push(password); 
    }

    if (email) {
      qStrings.push('Email = $' + (qStrings.length + 1));
      values.push(email); 
    }

    if (qStrings.length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    query += qStrings.join(', ') + ' WHERE UserID = $' + (qStrings.length + 1); 
    values.push(userId); 

    await pool.query(query, values);

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
module.exports = {
    getAllUsers, registerUser, updateUser, 
};