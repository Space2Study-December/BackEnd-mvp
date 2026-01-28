const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware } = require('~/middlewares/auth')
const subjectController = require('~/controllers/subject')

router.use(authMiddleware)
router.get('/', asyncWrapper(subjectController.getSubjects))
router.get('/names', asyncWrapper(subjectController.getSubjectNames))
router.get('/filterBy', asyncWrapper(subjectController.getFilteredSubjects))
router.post('/createSubject', asyncWrapper(subjectController.createSubject))

module.exports = router
