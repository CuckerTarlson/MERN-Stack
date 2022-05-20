const express = require('express')
const router = express.Router()
const {
  getChars,
  setChar,
  updateChar,
  deleteChar,
} = require('../controllers/charController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getChars).post(protect, setChar)
router.route('/:id').delete(protect, deleteChar).put(protect, updateChar)

module.exports = router
