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
        if(this.notEmply(body.versionName)){

        }else{
            throw "versionName field not found"
        }
    }
    async excecute(body){
        let {versionName} = body
        let uuid = uuidv1();
        let neo = new neo4jDB()
        if((await this.getUUID(versionName)).records.length !== 0)throw "duplicate versionName"
        await neo.Session_commit(`CREATE (:version {Param})`,{Param:{uuid,versionName,createDate:new Date().toLocaleString(),changeDate:new Date().toLocaleString(),status:"draft"}})
        if(body.refVersion !== "" && this.notEmply(body.refVersion)){
            await neo.Session_commit(`MATCH (a:version {uuid:'${uuid}'}),(b:version {uuid:'${body.refVersion}'}) CREATE (b)-[r:from]->(a)`)
        }
        return uuid
    }
}