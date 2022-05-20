import axios from 'axios'

const API_URL = '/api/chars/'

// Create new char
const createChar = async (charData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, charData, config)

  return response.data
}

// Get user chars
const getChars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user char
const deleteChar = async (charId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + charId, config)

  return response.data
}

// Update user char
const updateChar = async (charId, charData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + charId, charData, config)

  return response.data
}

const charService = {
  createChar,
  getChars,
  deleteChar,
  updateChar,
}

export default charService
