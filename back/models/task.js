const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  instruction: {
    type: String,
    required: false
  },
})
module.exports = model('TaskSmall', taskSchema) 