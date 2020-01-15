const axios = require('axios')
const Developer = require('../models/Developer')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    const { techs, latitude, longitude } = request.query
    const techsList = parseStringAsArray(techs)

    const developers = await Developer.find({
      techs: {
        $in: techsList
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    return response.json(developers)
  }
}
