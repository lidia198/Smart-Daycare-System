const db = require("../config/db");

// Find user by email
function findUserByEmail(email, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
}

// Create a new user
function createUser(user, callback) {
    const sql = `
        INSERT INTO users (full_name, email, password, phone, role)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.full_name,
            user.email,
            user.password,
            user.phone,
            user.role
        ],
        callback
    );
}

module.exports = {
    findUserByEmail,
    createUser
};