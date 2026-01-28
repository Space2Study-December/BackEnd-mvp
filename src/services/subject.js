const Subject = require('~/models/subject')
const Offer = require('~/models/offer')
const { createNotFoundError } = require('~/utils/errorsHelper')
const Category = require('~/models/category')
// const { Subject, Category, Offer, sequelize } = require('~/models')

const subjectService = {
  getSubjects: async ({ skip, limit, match }) => {
    let filter = {}
    if (match.categoryId) {
      filter.categoryId = match.categoryId
    }
    if (match.search) {
      filter.name = { $regex: match.search, $options: 'i' }
    }

    const subjects = await Subject.find(filter).skip(skip).limit(limit).lean().exec()
    const count = match.categoryId || match.search ? subjects.length : await Subject.count()
    const categoriesData = await Category.find({ id: { $as: match.categoryId } })

    let categoryMap
    categoryMap = Object.fromEntries(
      categoriesData.map((c) => [c.id, { icon: c.appearance.icon, theme: c.appearance.color }])
    )

    const subjectIds = subjects.map((s) => s._id)

    const offersCounts = await Offer.aggregate([
      { $match: { subjectId: { $in: subjectIds } } },
      { $group: { _id: '$subjectId', count: { $sum: 1 } } }
    ])

    const subjectsWithCount = subjects.map((s) => ({
      ...s,
      offers: offersCounts.find((o) => o._id.toString() === s._id.toString())?.count || 0
    }))

    const mappedSubjects = subjectsWithCount.map((item) => {
      return {
        categoryId: item.categoryId,
        name: item.name,
        id: item._id,
        icon: categoryMap[item.categoryId]?.icon ?? null,
        theme: categoryMap[item.categoryId]?.theme ?? null,
        offers: item.offers
      }
    })

    return {
      items: mappedSubjects,
      count
    }
  },

  getSubjectNames: async () => {
    const items = await Subject.find().select('name').exec()
    return { items }
  },

  createSubject: async ({ subjectName, categoryName, description, appearance }) => {
    let category = await Category.findOne({ name: categoryName })
    if (!category) {
      if (!categoryName) throw new Error('Category name is required')
      category = await Category.create({
        name: categoryName,
        appearance: {
          icon: appearance.icon,
          color: appearance.color || 'mint'
        }
      })
    }

    const newSubject = await Subject.create({
      name: subjectName,
      description,
      categoryId: category.id
    })

    return newSubject
  },

  getFilteredSubjects: async (match) => {
    if (!match) {
      throw createNotFoundError()
    }
    const items = await Subject.find(match)
    return { items }
  }
}

module.exports = subjectService
