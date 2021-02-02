const fs = require("fs")
const data = require('../../../data')
const { age } = require('../../lib/util')
const { date } = require('../../lib/util')
exports.show = function(req, res) {
    const { id } = req.params
    const foundInstructors = data.instructors.find(function(instructors) {
        return instructors.id == id
    })
    if (!foundInstructors) {
        res.send("instrutor não encontrado")
    }
    const instructor = {
        ...foundInstructors,
        age: age(foundInstructors.birth),
        services: foundInstructors.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructors.created_at),

    }
    return res.render("../instructors/show", { instructor })

}
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("por favor validar todos os campos")
        }
    }
    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)
    data.instructors.push({
        id,
        ...req.body,
        birth,
        created_at,
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/instructors/${id}`)
    })

}
exports.edit = function(req, res) {
    const { id } = req.params
    const foundInstructors = data.instructors.find(function(instructors) {
        return instructors.id == id
    })
    if (!foundInstructors) {
        res.send("instrutor não encontrado")
    }
    const instructor = {
        ...foundInstructors,
        birth: date(foundInstructors.birth).iso
    }
    return res.render("instructors/edit", { instructor })
}
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundInstructors = data.instructors.find(function(instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundInstructors) {
        res.send("instrutor não encontrado")
    }
    const instructor = {
        ...foundInstructors,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.instructors[index] = instructor
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/instructors/${id}`)
    })

}
exports.delete = function(req, res) {
    const { id } = req.body
    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })
    data.instructors = filteredInstructors
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/instructors`)
    })

}

exports.index = function(req, res) {
    return res.render("instructors/index", { instructors: data.instructors })
}