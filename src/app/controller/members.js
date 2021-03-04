const member = require('../models/member')
const { date, age } = require('../../lib/util')
module.exports = {
    index(req, res) {
        member.all(function(members) {
            return res.render("members/index", { members })
        })
    },
    show(req, res) {
        const { id } = req.params
        member.find(id, function(member) {
            member.birth = date(member.birth).format
            member.created_at = date(member.created_at).format
            return res.render("members/show", { member })
        })

    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)
        })
    },
    edit(req, res) {
        const { id } = req.params
        member.find(id, function(member) {
            member.birth = date(member.birth).iso
            return res.render("members/edit", { member })
        })
    },
    put(req, res) {
        const { id } = req.body
        member.update(req.body, function() {
            return res.redirect(`/members/${id}`)
        })
        return
    },
    delete(req, res) {
        const { id } = req.body
        member.delete(id, function() {
            return res.redirect("/members")
        })
    }
}