const express = require('express')
const routes = express.Router()
const instructors = require('./app/controller/instructors');
const members = require('./app/controller/members');
routes.get('/', function(req, res) {
    return res.redirect("/instructors")

})
routes.get('/instructors', instructors.index)
routes.post('/instructors', instructors.post)
routes.get('/instructors/create', function(req, res) {
    return res.render("instructors/create")
})
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)


routes.get('/members', members.index)
routes.post('/members', members.post)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.put('/members', members.put)
routes.delete('/members', members.delete)


module.exports = routes