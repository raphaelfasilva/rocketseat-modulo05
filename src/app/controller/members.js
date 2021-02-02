const fs = require("fs")
const data = require('../../../data')
const { date } = require('../../lib/util')
exports.show = function(req, res) {
    const { id } = req.params
    const foundmembers = data.members.find(function(members) {
        return members.id == id
    })
    if (!foundmembers) {
        res.send("instrutor não encontrado")
    }
    const member = {
        ...foundmembers,
        birth: date(foundmembers.birth).iso,
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundmembers.created_at)

    }
    return res.render("members/show", { member })

}
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("por favor validar todos os campos")
        }
    }
    const birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)
    data.members.push({
        id,
        ...req.body,
        birth,
        created_at
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/members/${id}`)
    })

}
exports.edit = function(req, res) {
    const { id } = req.params
    const foundmembers = data.members.find(function(members) {
        return members.id == id
    })
    if (!foundmembers) {
        res.send("instrutor não encontrado")
    }
    const member = {
        ...foundmembers,
        birth: date(foundmembers.birth).iso
    }
    return res.render("members/edit", { member })
}
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundmembers = data.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundmembers) {
        res.send("instrutor não encontrado")
    }
    const member = {
        ...foundmembers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.members[index] = member
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/members/${id}`)
    })

}
exports.delete = function(req, res) {
    const { id } = req.body
    const filteredmembers = data.members.filter(function(member) {
        return member.id != id
    })
    data.members = filteredmembers
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/members`)
    })

}

exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
}