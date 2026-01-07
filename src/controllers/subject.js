const subjectsService = require('~/services/subject')

const getSubjects = async (_, res) => {
  const subjects = await subjectsService.getSubjects()

  res.status(200).json(subjects)
}

const createSubject = async (req, res) => {
  const data = req.body
  const newSubject = await subjectsService.createSubject(data)

  res.status(201).send(newSubject)
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
