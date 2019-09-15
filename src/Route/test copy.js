import express from 'express'
let router = express.Router()
router.post('/test2', async (req, res) => {
    console.log("2")
})

export { router }