const express = require("express")
const router = express.Router()

const { generateItinerary } = require("../services/llamaService")

router.post("/", async (req, res) => {

    const { prompt } = req.body

    try {
        const itinerary = await generateItinerary(prompt)
        res.json(itinerary)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "AI generation failed" })
    }
})

module.exports = router
