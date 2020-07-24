import PostalesDAO from  "./dao/postalesDAO.js"
import usuariosDao from "./dao/usersDAO.js"
import {MongoClient} from "mongodb"
require("dotenv").config();
export default class Database{
static configDb(){
MongoClient.connect(
  
  process.env.CARDAWAY_DB_URI,
  { useUnifiedTopology: true ,
  },
)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await usuariosDao.injectDB(client)
    await PostalesDAO.injectDB(client)
    console.log("Conected Database")
  })
}
}
