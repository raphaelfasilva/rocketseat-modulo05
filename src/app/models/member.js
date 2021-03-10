const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all(callback) {
        db.query('SELECT * from members  order by name asc', function(err, results) {
            if (err) throw "data base error"
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO MEMBERS(
            name,
            avatar_url,
            email,
            gender,
            birth,
            blood,
            weight,
            height,
            created_at,
            instructor_id
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING ID
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            data.birth,
            data.blood,
            data.weight,
            data.height,
            date(Date.now()).iso,
            data.instructor
        ]
        db.query(query, values, function(err, results) {
            if (err) throw "data base error"
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`select  members.*, instructors.name AS instructor_name 
        from members 
        LEFT JOIN instructors on (members.instructor_id = instructors.id)
        where members.id = $1`, [id], function(err, results) {
            if (err) throw "data base error"
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
           update members SET 
           name=($1),
           avatar_url=($2),
           email=($3),
           gender=($4),
           birth=($5),
           blood=($6),
           weight=($7),
           height=($8),
           instructor_id=($9)
           where id= $10
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            data.birth,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]
        db.query(query, values, function(err, res) {
            if (err) throw err
            callback()
        })

    },
    delete(id, callback) {
        db.query(`DELETE FROM members where id = $1`, [id], function() {
            callback()
        })
    },
    instructorsSelectoptions(callback) {
        db.query('SELECT name,id FROM instructors', function(err, results) {
            if (err) throw 'data base erro'
            callback(results.rows)
        })
    }
}