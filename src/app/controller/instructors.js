const instructor = require('../models/instructor')
const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    index(req, res) {
        instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors })
        })

    },
    show(req, res) {
        const { id } = req.params
        instructor.find(id, function(instructor) {
            if (!instructor) return res.send("instrutor não encontrado")
            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format
            return res.render("instructors/show", { instructor })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },
    edit(req, res) {
        const { id } = req.params
        instructor.find(id, function(instructor) {
            if (!instructor) return res.send("instrutor não encontrado")
            instructor.birth = date(instructor.birth).iso
            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res) {
        const { id } = req.body
        instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
        instructor.delete(req.body.id, function() {
            return res.redirect("/instructors")
        })
    }
}