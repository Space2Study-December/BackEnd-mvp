const Subject = require('~/models/subject')

const subjectService = {

  getSubjects: async (sort) => {
    const items = await Subject.find()
      .sort(sort)
      .exec()

    return { items }
  },
}

module.exports = subjectService