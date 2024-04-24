# Quotes
Prøve eksamen: Quotes site


This is a big project for my 2. year of the IT edjucation. 
A practise exam befour the real one.
The task was forst to create a site were on the first site "/" a random quote is shown.
Then Authentication and Authorization was added, were you can login and sign up.
You have a profile page "/home/:username" were you can write quotes.
After publiching a quote the owner can eddit and/or delete there quotes.
By sertching for /:username" you will have the ability to see another persons quotes.

The project was built with a MERN stack, node/express backend with react frontend.
The backend is made to work with enny front end.

Api:
    user:
        // login route
        router.post("/api/user/login", loginUser)

        // signup route
        router.post("/api/user/signup", signupUser)

    quotes:
        // GET all quotes
        router.get("/api/quotes/", getQuotes)

        // GET Random quote
        router.get("/api/quotes/random", getRandomQuote)

        // GET a single post
        router.get("/api/quotes/:id", getQuote)

        // require auth
        router.use(requireAuth) All under wil need auth to use.

        // POST a new quote
        router.post("/api/quotes/", createQuote)

        // DELETE a quote
        router.delete("/api/quotes/:id", deleteQuote)

        // UPDATE a quote
        router.patch("/api/quotes/:id", updateQuote)

        module.exports = router;