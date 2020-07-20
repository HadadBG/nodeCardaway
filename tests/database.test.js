import PostalesDAO from "../src/dao/postalesDAO"
let insertedIds
describe("DatabaseTest", () => {
  beforeAll(async () => {
    await PostalesDAO.injectDB(global.cardawayClient)
  })

  test("Can insert many postales", async () => {
    const testPostales = [
      {brief:"15-septiembre",categoria:"Fechas Festivas",extension:"gif"},
      {brief:"enchiladas-mole",categoria:"Comida",extension:"png"},
      {brief:	"osito-de-peluche",categoria:"Vintage",extension:"jpeg"},
      {brief:	"flores",categoria:"Paisajes",extension:"jpg"},
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
})
