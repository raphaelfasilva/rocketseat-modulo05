const member = require('../models/member')
const { date, age } = require('../../lib/util')
module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)
        const params = {
            filter,
            limit,
            offset,
            callback(members) {
                pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }
                return res.render("members/index", { members, pagination, filter, limit })
            }
        }
        member.paginate(params)
    },
    create(req, res) {
        member.instructorsSelectoptions(function(options) {
            return res.render("members/create", { instructorOptions: options })
        })
    },
    show(req, res) {
        const { id } = req.params

        member.find(id, function(member) {
            if (!member) return res.send("member not found")
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
        member.find(id, function(memberedit) {
            if (!memberedit) return res.send("member not found")
            memberedit.birth = date(memberedit.birth).iso
            member.instructorsSelectoptions(function(options) {
                return res.render("members/edit", { member: memberedit, instructorOptions: options })
            })

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