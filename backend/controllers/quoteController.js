const Quote = require('../models/quoteModel')
const mongoose = require('mongoose')

// get all quote
const getQuotes = async (req, res) => {
  const user_id = req.user?.user_id

  const quote = await Quote.find({user_id}).sort({createdAt: -1})

  res.status(200).json(quote)
}

// get a single quote
const getQuote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No such Quote"})
  }

  const quote = await Quote.findById(id)

  if (!quote){
    return res.status(400).json({ error: 'No such Quote found' })
  }

  res.status(200).json(quote)
}

// get random quote
const getRandomQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(randomIndex);

    res.json(randomQuote)
  } catch (err) {
    console.error("Error fetching random quote:", err);
    res.status(500).json({ error: "Internal Server Error"});
  }
}

// create new Quote
const createQuote = async (req, res) => {
  const { title, author, body } = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push("title")
  }
  if(!author) {
    emptyFields.push("author")
  }
  if(!body) {
    emptyFields.push("body")
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields })
  }

  // add doc to DB
  try {
    const quote = await Quote.create({title, author, body})
    res.status(200).json(quote)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// deleta a Quote
const deleteQuote = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such Quote"})
  }

  const quote = await Quote.findOneAndDelete({_id: id})

  if (!quote) {
    return res.status(400).json({error: "No such Quote"})
  }

  res.status(200).json(quote)
}

// update a Quote
const updateQuote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such Quote"})
  }

  const quote = await Quote.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!quote) {
    return res.status(400).json({error: "no Such Quote"})
  }

  res.status(200).json(quote)
}

module.exports = {
  getQuotes,
  getQuote,
  getRandomQuote,
  createQuote,
  deleteQuote,
  updateQuote,
}