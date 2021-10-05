import Airtable from "airtable";

export default class AirTableDB {
  constructor() {
  }

  /**
   *
   * @returns {Promise<*>}
   */
  async getAllTableRecords() {
    const base = await new Airtable({apiKey: process.env.AIR_TABLE_API_KEY}).base(process.env.CARDS_BASE_ID);
    return await base('Content').select({
      view: "Content pipeline"
    }).all();
  }
}
