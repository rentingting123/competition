import Competition from './competitionApi'
import Personal from './personalCenterApi'
import System from './systemApi'
import Admin from './admin'
import Cert from './cert'
import Node from './node'
import Put from './put'
import nopPrmission from './nopPrmission'
import compic from './compic'

//各Api方法名不可以有重复
export default {
    ...Competition,
    ...Personal,
    ...System,
    ...Admin,
    ...Cert,
    ...Node,
    ...Put,
    ...nopPrmission,
    ...compic
}