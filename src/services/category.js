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

  getAllCategories: async () => {
    const categories = await Category.find();
    return categories;
  },

  getOneCategoryByName: async (name) => {
    if (!name) {
      throw createNotFoundError();
    }
    const category = await Category.findOne({ name });
    return category;
  }

}

module.exports = categoryService