const mongoose = require('mongoose')

const charSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    charName: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    Class: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    weapon: {
      type: String,
      required: [true, 'Please add a text value'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Char', charSchema)
