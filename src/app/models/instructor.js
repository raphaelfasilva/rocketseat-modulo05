const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all(callback) {
        db.query('SELECT * from instructors', function(err, results) {
            if (err) return res.send("data base error")
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO INSTRUCTORS(
            name,
            avatar_url,
            gender,
            services,
            birth,
            created_at
        ) VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING ID
        `
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            data.birth,
            date(Date.now()).iso
        ]
        db.query(query, values, function(err, results) {
            if (err) return res.send("data base error")
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query('select * from instructors where id = $1', [id], function(err, results) {
            if (err) return res.send("data base error")
            callback(results.rows[0])
        })
    }
}