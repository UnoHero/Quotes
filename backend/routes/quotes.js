const express = require("express")

const {
  getQuotes,
  getQuote,
  getRandomQuote,
  createQuote,
  deleteQuote,
  updateQuote,
} = require("../controllers/quoteController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// GET all quotes
router.get("/", getQuotes)

// GET Random quote
router.get("/random", getRandomQuote)

// GET a single post
router.get("/:id", getQuote)

// POST a new quote
router.post("/", requireAuth, createQuote)

// DELETE a quote
router.delete("/:id", requireAuth, deleteQuote)

// UPDATE a quote
router.patch("/:id", requireAuth, updateQuote)

// 404 error
router.all("*",)

module.exports = router;
