import uuidv1 from 'uuid/v1'
import neo4jDB from '../../DAL/neo4j'
import common from './common'
export default class extends common{
    constructor(){
        super()
    }
    async invoke(body){
        try {
            await this.validate(body)
            return this.excecute(body)
        } catch (error) {
            throw error
        }  
    }
    async validate(body){
        if(this.notEmply(body.uuid)){

        }else{
            throw "uuid field not found"
        }
    }
    async excecute(body){
        let {uuid,status} = body
        let neo = new neo4jDB()
        let node = (await this.getNode(uuid)).records
        if(node.length === 0)throw "uuid version not found"
        node = node[0]._fields[0].properties
        if(status === "draft")throw "status can't change to draft"
        if(node.status === "remove")throw "date has been removed"
        if(status === "public" || status === "remove"  || status ==="private"){}else throw "unknow status"
        await neo.Session_commit(`MATCH (a:version {uuid:'${uuid}'}) SET a.status = '${status}'`)
        return "OK"
    }
}