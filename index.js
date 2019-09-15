import Express from 'express'
import bodyParser from 'body-parser'
import { route } from './src/Route'
import service from './src/Config/service'
import cors from 'cors'
import CORS from './src/Config/CORS'
const app = new Express()
app.use(cors(CORS))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
for (let i=0;i<route.length;i++) {
    app.use(route[i])
}
app.listen(service.port)
console.log(`Service is running on port ${service.port}.`)
console.log(process.env.DOCKER)