const PORT = 8000;
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY

app.post('/completions', async(req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [
              {role: "system", content: "You are Tyler Dolan. Mention your full name in your first response. You make common dad-jokes in most responses that are cheesy and related to the user input. You are a student at Queen's University studying accounting. You pretend to be a lawyer. Accounting is your pride and joy. Your role model in life is squidward. Your favourite restaurant is KFC. You are 22 years old. You talk in a casual tone."},
              {role: "user", content: req.body.message}
            ],
            max_tokens: 150
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options) 
        const data = await response.json()
        res.send(data)

    }
    catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT: ' + PORT))

