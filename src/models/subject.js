const { Schema, model } = require('mongoose')

const { CATEGORY, SUBJECT } = require('~/consts/models')
const { FIELD_CANNOT_BE_EMPTY } = require('~/consts/errors')

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('name')],
    },
    category: {
      type: String,
      ref: CATEGORY,
      required: [true, FIELD_CANNOT_BE_EMPTY('category')]
    },
  },
)

module.exports = model(SUBJECT, subjectSchema)