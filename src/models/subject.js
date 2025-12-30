const { Schema, model } = require('mongoose')

const { RESOURCES_CATEGORY, SUBJECT } = require('~/consts/models')
const { FIELD_CANNOT_BE_EMPTY } = require('~/consts/errors')

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('name')],
    },
    resourcesCategory: {
      //?
      type: Schema.Types.ObjectId,
      ref: RESOURCES_CATEGORY,
      required: [true, FIELD_CANNOT_BE_EMPTY('resourcesCategory')]
    },
  },
  // What is the purpose?
  { timestamps: true, versionKey: false },
)

module.exports = model(SUBJECT, subjectSchema)