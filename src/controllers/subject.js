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

const getSubjectByName = async (req, res) => {
  const { name } = req.params
  const subject = await subjectsService.getOneSubjectByName(name)

  res.status(200).json(subject)
}

module.exports = {
  getSubjects,
  createSubject,
  getSubjectByName
}
