let postales;
let cardaway;

export default class PostalesDAO {
  static async injectDB(conn) {
    if (postales) {
      return;
    }
    try {
      cardaway = await conn.db(process.env.CARDAWAY_NS);
      postales = await conn.db(process.env.CARDAWAY_NS).collection("postales");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in PostalesDAO: ${e}`
      );
    }
  }
  static async insertPostales(toInsertPostales = [{ _id: null }]) {
    let response = { insertedIds: undefined, errors: undefined };
    try {
      let insertResult = await postales.insertMany(toInsertPostales, {
        ordered: false
      });

      response.insertedIds = Object.values(insertResult.insertedIds);
    } catch (e) {
      response.errors = e;
    }
    return response;
  }

  static async deletePostales(toDeletePostalesIds = []) {
    let deleteOperations = toDeletePostalesIds.map(function(id) {
      let Operation = {};

      Operation["deleteOne"] = {filter:{_id:id }};
      return Operation;
    });
    let response={nDeleted:undefined,errors:undefined};
    try {
      let resultBulkWrite = await postales.bulkWrite(deleteOperations);
	  response.nDeleted=resultBulkWrite.deletedCount
    } catch (e) {
      response.errors = e;
    }
    return response;
  }
}
