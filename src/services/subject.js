const Subject = require('~/models/subject')
const { createNotFoundError } = require('~/utils/errorsHelper')

const subjectService = {
  getSubjects: async () => {
    const items = await Subject.find()

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

  getOneSubjectByName: async (name) => {
    if (!name) {
      throw createNotFoundError();
    }
    const subject = await Subject.findOne({ name });
    return subject;
  }
}

module.exports = subjectService