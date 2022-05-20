const asyncHandler = require('express-async-handler')

const Char = require('../models/charModel')
const User = require('../models/userModel')

// @desc    Get chars
// @route   GET /api/chars
// @access  Private
const getChars = asyncHandler(async (req, res) => {
  const chars = await Char.find({ user: req.user.id })

  res.status(200).json(chars)
})

// @desc    Set char
// @route   POST /api/chars
// @access  Private
const setChar = asyncHandler(async (req, res) => {
  if (!req.body.charName || !req.body.Class || !req.body.weapon) {
    res.status(400)
    throw new Error("You're missing a text field")
  }

  const char = await Char.create({
    charName: req.body.charName,
    Class: req.body.Class,
    weapon: req.body.weapon,
    user: req.user.id,
  })

  res.status(200).json(char)
})

// @desc    Update char
// @route   PUT /api/chars/:id
// @access  Private
const updateChar = asyncHandler(async (req, res) => {
  const char = await Char.findById(req.params.id)

  if (!char) {
    res.status(400)
    throw new Error('Character not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the char user
  if (char.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedChar = await Char.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedChar)
})

// @desc    Delete char
// @route   DELETE /api/chars/:id
// @access  Private
const deleteChar = asyncHandler(async (req, res) => {
  const char = await Char.findById(req.params.id)

  if (!char) {
    res.status(400)
    throw new Error('Char not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the char user
  if (char.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await char.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getChars,
  setChar,
  updateChar,
  deleteChar,
}
