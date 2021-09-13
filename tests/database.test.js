import PostalesDAO from "../src/dao/postalesDAO"
import UsuariosDAO from "../src/dao/usersDAO.js"
import AdminDAO from "../src/dao/adminDao.js"
let insertedIds
let usuarioId
describe("DatabaseTest", () => {
  beforeAll(async () => {
    await UsuariosDAO.injectDB(global.cardawayClient) 
    await PostalesDAO.injectDB(global.cardawayClient)
    await AdminDAO.injectDB(global.cardawayClient)
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
  test("Can get postales by textToSearch",async()=>{
    const response=await PostalesDAO.getPostales({textToSearch:"enchiladas-mole"})
    expect(response[0].extension).toEqual("png")
  })
  test ("Can delete many postales",async()=>{
    const deletePostalsResult= await PostalesDAO.deletePostales(insertedIds)
    expect(deletePostalsResult.nDeleted).toEqual(4)
  })
  test("Can Insert a User",async()=>{
    const testUsuario = {
      _id:"test@test.test",
      nombre:"Hadad",
      primerAp:"cadenadetesteo",
      segundoAP:"García",
      genero:"Hombre",
      fechaNac: "1999-08-20",
      passwd:"hola123"
    }

    const insertResult = await UsuariosDAO.insertUsuario(testUsuario)
    usuarioId = insertResult.insertedId
    expect(insertResult.errors).toBeUndefined() 
  })
  
test("Can Update a User",async()=>{
    const testUsuario = {
      _id:"test@test.test",
      nombre:"Jose",
      primerAp:"cadenadetesteo",
      segundoAP:"García",
      genero:"Mujer",
      fechaNac: "1999-08-20",
      passwd:"hola123"
    }
    const insertResult = await UsuariosDAO.updateUsuario(testUsuario._id,testUsuario)
    expect(insertResult.result.nModified).toEqual(1) 
  })

  test("A user can login",async()=>{
    let {loginResult,usuario}=await UsuariosDAO.login({username:"test@test.test",password:"hola123"})
    expect(loginResult).toEqual(1)
    expect(usuario.nombre).toEqual("Jose")
  })
  test("Can get a user by Email",async ()=>{
    let usuario = await UsuariosDAO.getUsuario({email:"test@test.test"})
    expect(usuario.genero).toEqual("Mujer")
  })

  test("Can get users by text search",async()=>{
    let usuarios

      usuarios =await UsuariosDAO.getUsuarios({textToSearch:"test@test"})


    expect(usuarios[0].nombre).toEqual("Jose")
  })
  test("Can Delete a User",async ()=>{
    const deleteResult = await UsuariosDAO.deleteUsuario(usuarioId)
    expect(deleteResult.errors).toBeUndefined()  
    expect(deleteResult.n).toEqual(1)
  })
  test("Can Insert an Admin",async ()=>{
    const testAdmin = {
      _id:"admin2",
      password:"admin"
    }
    const insertResult = await AdminDAO.insertAdmin(testAdmin)
    expect(insertResult.insertedId).toEqual("admin2") 
  })
  test("Authentificate an Admin",async()=>{
    let result = await AdminDAO.login({username:"admino",password:"admin"})
    expect(result.loginResult).toEqual(-1) 
    result = await AdminDAO.login({username:"admin2",password:"admin"})
    expect(result.loginResult).toEqual(1)
     
  })

  test("Can Delete an Admin",async ()=>{
    const result = await AdminDAO.deleteAdmin("admin2")
    expect(result.deletedCount).toEqual(1)
    

  })
})
