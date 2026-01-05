const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware } = require('~/middlewares/auth')
const categoryController = require('~/controllers/category')

router.use(authMiddleware)
router.get('/', asyncWrapper(categoryController.getCategories))
router.get('/:name', asyncWrapper(categoryController.getCategoryByName))
router.post('/', asyncWrapper(categoryController.createCategory))

module.exports = router
