const categoryService = require('~/services/category')

const createCategory = async (req, res) => {
  const data = req.body
  const newCategory = await categoryService.createCategory(data)

  res.status(201).send(newCategory)
}

const getCategories = async (req, res, next) => {
  try {
    const { limit, skip, search } = req.query

    const categories = await categoryService.getCategories({
      limit: Number(limit),
      skip: Number(skip),
      search
    })

    res.status(200).json(categories)
  } catch (e) {
    next(e)
  }
}

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories()

  res.status(200).json(categories)
}

const getCategoryByName = async (req, res) => {
  const { name } = req.params
  const category = await categoryService.getOneCategoryByName(name)

  res.status(200).json(category)
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryByName,
  getAllCategories
}
