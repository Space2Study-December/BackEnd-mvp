const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware } = require('~/middlewares/auth')
const subjectController = require('~/controllers/subject')

router.use(authMiddleware)
router.get('/', asyncWrapper(subjectController.getSubjects))

module.exports = router
