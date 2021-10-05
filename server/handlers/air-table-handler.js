import jsonResponse from '../models/json-response.js'
import AirTableDB from "../db/air-table-db.js";


export default class AirTableHandler {

  constructor() {
    return (async () => {
      this.dbInstance = await new AirTableDB();
      return this;
    })();
  }

  async requestEndpointHandler(httpRequest) {

    switch (httpRequest.method) {
      case 'GET':
        return this.handleGET(httpRequest);

      default:
        return jsonResponse(false, null, `${httpRequest.method} method not allowed.`, 405)
    }
  }

  /**
   *
   * @param {}httpRequest
   * @returns {jsonResponse<{headers, data, statusCode}>}
   */
  async handleGET(httpRequest) {
    let response = jsonResponse(false, null, null);

    try {
      switch (httpRequest.path) {
        case ('/getAllCards'): {
          response.data = await this.getAllTableRecords();
          response.data.result = true;
          break;
        }
      }

    } catch (e) {
      response.data.error = e.message;
      response.statusCode = 405;
    }

    return response;
  }


  /**
   * Get all records and parse the relevant card data
   * @returns {Promise<Array>}
   */
  async getAllTableRecords() {
    let cardsToReturn = [];
    const records = await this.dbInstance.getAllTableRecords();
    records.forEach((record) => {
      const cardModel = this.parseRecordToCardModel(record);
      cardsToReturn.push(cardModel);
    });

    return cardsToReturn;
  }

  /**
   *
   * @param record
   */
  parseRecordToCardModel(record) {
    let cardToReturn = {};
    cardToReturn.headline = record.get('Headline');
    cardToReturn.headline = cardToReturn.headline ? cardToReturn.headline : null;
    cardToReturn.subHeadline = record.get('Sub-headline');
    cardToReturn.subHeadline = cardToReturn.subHeadline ? cardToReturn.subHeadline : null;
    const image = record.get('Header image');
    if (image) {
      cardToReturn.imageUrl = image[0].url;
    } else {
      cardToReturn.imageUrl = null;
    }

    return cardToReturn;
  }
}
