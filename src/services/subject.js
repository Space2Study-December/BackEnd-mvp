const Subject = require('~/models/subject')
const { createNotFoundError } = require('~/utils/errorsHelper')

const subjectService = {
  getSubjects: async () => {
    const items = await Subject.find()
    return { items }
  },

  getSubjectNames: async () => {
    const items = await Subject.find().select('name').exec()
    return { items }
  },

  createSubject: async (data) => {
    const { category, name } = data;
    if (!category || !name) {
      throw createNotFoundError();
    }
    const newSubject = await Subject.create(data)
    return newSubject
  },

  getFilteredSubjects: async (match) => {
    if (!match) {
      throw createNotFoundError();
    }
    const items = await Subject.find(match);
    return { items };
  },
}

module.exports = subjectService