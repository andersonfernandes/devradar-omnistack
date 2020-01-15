const { Router } = require('express')
const DevelopersController = require('./controllers/DevelopersController')
const SearchController = require('./controllers/SearchController')
const routes = Router()

routes.get('/', (request, response) => {
  response.json({ message: 'Hello World' })
})

routes.get('/developers', DevelopersController.index)
routes.post('/developers', DevelopersController.create)

routes.get('/search', SearchController.index)

module.exports = routes
