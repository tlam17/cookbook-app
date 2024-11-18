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

        const userQuery = 'INSERT INTO Users (UserID, Password, Email, Name) VALUES ($1, $2, $3, $4)';
        await pool.query(userQuery, [UserID, Password, Email, Name]);

        res.status(201).json({ message: 'User added successfully', UserID: UserID, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add user. ' + error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { UserID } = req.params;

        if (!UserID) {
            return res.status(400).json({ error: "UserID is required." });
        }

        const query = 'DELETE FROM Users WHERE UserID = $1 RETURNING *;';
        const result = await pool.query(query, [UserID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const makes_query = 'DELETE FROM Makes_A WHERE UserID = $1 RETURNING *;';
        const makes_result = await pool.query(makes_query, [UserID]);

        res.status(200).json({
            message: "user deleted successfully.",
            deletedUser: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user. " + error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { UserID } = req.params;
        const { Password, Email, Name } = req.body;

        if (!UserID) {
            return res.status(400).json({ error: "UserID is required." });
        }

        // Build dynamic query
        const fields = [];
        const values = [];
        let query = 'UPDATE Users SET ';

        if (Password) {
            fields.push('Password = $' + (fields.length + 1));
            values.push(Password);
        }
        if (Email) {
            fields.push('Email = $' + (fields.length + 1));
            values.push(Email);
        }
        if (Name) {
            fields.push('Name = $' + (fields.length + 1));
            values.push(Name);
        }

        if (fields.length === 0) {
            return res.status(400).json({ error: "No fields provided for update." });
        }

        query += fields.join(', ') + ' WHERE UserID = $' + (fields.length + 1) + ' RETURNING *;';
        values.push(UserID);

        // Execute the update query
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "User updated successfully.",
            updatedUser: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user. " + error.message });
    }
};

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
};