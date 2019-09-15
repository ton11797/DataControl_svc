import express from 'express'
import versionControl from '../logic/versionControl'
let router = express.Router()
//get all version node
router.get('/versionControl/getAll', async (req, res) => {
    let ob = new (await versionControl.invoke("getAll"))
    try {
        let result = await ob.invoke()
        res.statusCode = 200
        res.send(result)
    } catch (error) {
        res.statusCode = 500
        res.send({error:error.toString()})
    }
})

//create new version
router.post('/versionControl/newVersion', async (req, res) => {
    let ob = new (await versionControl.invoke("newVersion"))
    try {
        let result = await ob.invoke(req.body)
        res.statusCode = 200
        res.send(result)
    } catch (error) {
        res.statusCode = 500
        res.send({error:error.toString()})
    }
})

//change version status
router.post('/versionControl/changeStatus', async (req, res) => {
    let ob = new (await versionControl.invoke("changeStatus"))
    try {
        let result = await ob.invoke(req.body)
        res.statusCode = 200
        res.send(result)
    } catch (error) {
        res.statusCode = 500
        res.send({error:error.toString()})
    }
})

export { router }