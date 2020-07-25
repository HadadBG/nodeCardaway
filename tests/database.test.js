import PostalesDAO from "../src/dao/postalesDAO"
import UsuariosDAO from "../src/dao/usersDAO.js"
let insertedIds
let usuarioId
describe("DatabaseTest", () => {
  beforeAll(async () => {
    await UsuariosDAO.injectDB(global.cardawayClient) 
    await PostalesDAO.injectDB(global.cardawayClient)
  })

  test("Can insert many postales", async () => {
    const testPostales = [
      {brief:"15-septiembre",categoria:"Fechas Festivas",extension:"gif"},
      {brief:"enchiladas-mole",categoria:"Comida",extension:"png"},
      {brief:"osito-de-peluche",categoria:"Vintage",extension:"jpeg"},
      {brief:"flores",categoria:"Paisajes",extension:"jpg"},
    ]
    const insertPostalsResult = await PostalesDAO.insertPostales(testPostales)
    insertedIds=insertPostalsResult.insertedIds
    expect(insertedIds.length).toEqual(4)
    expect(insertPostalsResult.errors).toBeUndefined()

  })
  test ("Can delete many postales",async()=>{
    const deletePostalsResult= await PostalesDAO.deletePostales(insertedIds)
    expect(deletePostalsResult.nDeleted).toEqual(4)
  })
  test("Can Insert a User",async()=>{
    const testUsuario = {
      _id:"test@test.test",
      nombre:"Hadad",
      primerAp:"Bautista",
      segundoAP:"García",
      genero:"Hombre",
      fechaNac: "1999-08-20",
      passwd:"hola123"
    }
    const insertResult = await UsuariosDAO.insertUsuario(testUsuario)
    usuarioId = insertResult.insertedId
    expect(insertResult.errors).toBeUndefined() 
  })
  test("Can Delete a User",async ()=>{
    const deleteResult = await UsuariosDAO.deleteUsuario(usuarioId)
    expect(deleteResult.errors).toBeUndefined()  
    expect(deleteResult.n).toEqual(1)
  })
})
