const Airtable = require('airtable');


module.exports = (req, res) => {
  getAllCards()
    .then((result) => {
      const data = result;
      res.status(200).send(data);
    })

    .catch(e => res.status(500).end())
};


/**
 * Get all  records fom db
 * @returns {Promise<Array>}
 */
async function getAllCards() {
  let cardsToReturn = [];
  const records = await getAllTableRecordsFromDB();
  records.forEach((record) => {
    const cardModel = parseRecordToCardModel(record);
    cardsToReturn.push(cardModel);
  });

  return cardsToReturn;
}

/**
 * @param record
 */
function parseRecordToCardModel(record) {
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

/**
 * DB layer
 * @returns {Promise<Records[]>}
 */
async function getAllTableRecordsFromDB() {
  const base = new Airtable({apiKey: process.env.AIR_TABLE_API_KEY}).base(process.env.CARDS_BASE_ID);
  return await base('Content').select({
    view: "Content pipeline"
  }).all();
}





