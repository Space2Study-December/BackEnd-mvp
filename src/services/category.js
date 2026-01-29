const Category = require('~/models/category')
const { createNotFoundError } = require('~/utils/errorsHelper')

const categoryService = {
  createCategory: async (data) => {
    const { name, appearance } = data

    return await Category.create({
      name,
      appearance
    })
  },

  getCategories: async ({ limit = 10, skip = 0, search }) => {
    let filter = {}

    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    const items = await Category.aggregate([
      { $match: filter },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'offers',
          let: { categoryId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$categoryId', '$$categoryId'] }
              }
            },
            { $count: 'count' }
          ],
          as: 'offersMeta'
        }
      },
      {
        $addFields: {
          offers: {
            $ifNull: [{ $arrayElemAt: ['$offersMeta.count', 0] }, 0]
          }
        }
      },
      {
        $project: {
          offersMeta: 0
        }
      }
    ])

    const total = await Category.countDocuments(filter)

    return { items, count: total }
  },

  getAllCategories: async () => {
    const categories = await Category.find()

    return categories
  },

  getOneCategoryByName: async (name) => {
    if (!name) {
      throw createNotFoundError()
    }

    return Category.findOne({ name })
  }
}

module.exports = categoryService
