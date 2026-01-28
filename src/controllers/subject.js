const subjectsService = require('~/services/subject')
const createAggregateOptions = require('~/utils/users/createAggregateOptions')

const getSubjects = async (req, res) => {
  const { skip, limit, sort, match } = createAggregateOptions(req.query)

  const subjects = await subjectsService.getSubjects({ skip, limit, sort, match })

  res.status(200).json(subjects)
}

const createSubject = async (req, res) => {
  try {
    const { subjectName, categoryName, description, appearance } = req.body

    const subject = await subjectsService.createSubject({ subjectName, categoryName, description, appearance })

    res.status(201).json(subject)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getFilteredSubjects = async (req, res) => {
  const subjects = await subjectsService.getFilteredSubjects(req.query)

  res.status(200).json(subjects)
}

const getSubjectNames = async (_, res) => {
  const subjects = await subjectsService.getSubjectNames()

  res.status(200).json(subjects)
}

module.exports = {
  getSubjects,
  createSubject,
  getFilteredSubjects,
  getSubjectNames
}
