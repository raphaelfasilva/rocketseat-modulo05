const { age } = require('../../lib/util')
const { date } = require('../../lib/util')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        return res.render("instructors/index")
    },
    show(req, res) {
        const { id } = req.params

        return
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        console.log(req.body)
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
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            req.body.birth,
            date(Date.now()).iso
        ]
        db.query(query, values, function(err, results) {
            if (err) return res.send("data base error")
            return res.redirect(`/instructors/${results.rows[0].id}`)
        })
    },
    edit(req, res) {
        const { id } = req.params

        return
    },
    put(req, res) {
        const { id } = req.body
        let index = 0
        return
    },
    delete(req, res) {
        const { id } = req.body
        return
    }
}