const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all(callback) {
        db.query(`SELECT instructors.*,(SELECT * FROM instructors) AS total,count(members) AS total_students 
        from instructors 
        LEFT JOIN members ON (instructors.id = members.instructor_id) 
        GROUP BY instructors.id
        order by total_students DESC`, function(err, results) {
            if (err) throw ("data base error")
            callback(results.rows)
        })
    },
    findBy(filter, callback) {
        db.query(`SELECT instructors.*,count(members) AS total_students 
        from instructors 
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        where instructors.name ilike '%${filter}%' 
        OR instructors.services ilike '%${filter}%' 
        GROUP BY instructors.id
        order by total_students DESC`, function(err, results) {
            if (err) throw ("data base error")
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
            if (err) throw ("data base error")
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query('select * from instructors where id = $1', [id], function(err, results) {
            if (err) throw "data base error"
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
           update instructors SET 
           avatar_url=($1),
           name=($2),
           birth=($3),
           gender=($4),
           services=($5)
           where id= $6
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]
        db.query(query, values, function(err, res) {
            if (err) throw "data base error"
            callback()
        })

    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors where id = $1`, [id], function() {
            callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params
        let query = "",
            filterQuery = "",
            totalQuery = `(
            SELECT count(*) FROM instructors
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            `
            totalQuery = `(
            SELECT count(*) FROM instructors
            ${filterQuery}
            ) AS total`
        }
        query = `
        SELECT instructors.*,${totalQuery},count(members) as total_students 
        FROM instructors
        LEFT JOIN members ON  (instructors.id = members.instructor_id)
        ${filterQuery}
        GROUP BY instructors.id LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results) {
            if (err) throw "data base error"
            callback(results.rows)
        })
    }
}