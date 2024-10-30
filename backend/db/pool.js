const { Pool } = require("pg");

const pool = new Pool({
    host: "cookbook.cdywuci0um0c.us-west-1.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "cse412g31",
    database: "recipedb",
});

module.exports = pool