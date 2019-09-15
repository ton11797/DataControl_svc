import getAll from './getAll'
import newVersion from './newVersion'
import changeStatus from './changeStatus'
export default class {
    static async invoke(name){
        switch (name){
            case "getAll": return getAll
            case "newVersion": return newVersion
            case "changeStatus": return changeStatus
        }
    }
}