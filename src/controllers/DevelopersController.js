const axios = require('axios')
const Developer = require('../models/Developer')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    const developers = await Developer.find()

    return response.json(developers)
  },

  async create(request, response) {
    const { github_username, techs, latitude, longitude } = request.body

    let developer = await Developer.findOne({ github_username })

    if (!developer) {
      console.log('here')
      const techsList = parseStringAsArray(techs)
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      const githubApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
      const { name = login, avatar_url, bio } = githubApiResponse.data

      let developer = await Developer.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsList,
        location
      })
    }

    return response.json(developer)
  }
}
