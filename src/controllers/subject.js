const subjectsService = require('~/services/subject')
const getSortOptions = require('~/utils/getSortOptions')

const getSubjects = async (req, res) => {
  const { sort } = req.query

  const sortOptions = getSortOptions(sort)
  try {
    const subjects = await subjectsService.getSubjects(
      sortOptions
    )

    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}

module.exports = {
  getSubjects,
}
