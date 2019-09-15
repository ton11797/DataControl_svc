import express from 'express'
let router = express.Router()
router.post('/test', async (req, res) => {
    console.log("1")
})

export { router }