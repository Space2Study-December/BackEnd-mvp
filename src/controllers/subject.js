const subjectsService = require('~/services/subject')
const getSortOptions = require('~/utils/getSortOptions')

const getSubjects = async (req, res) => {
  const { sort } = req.query

  const sortOptions = getSortOptions(sort)

  const subjects = await subjectsService.getSubjects(
    sortOptions
  )

  res.status(200).json(subjects)
}

module.exports = {
  getSubjects,
}
