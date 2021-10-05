// require('dotenv').config({path:'../.env'});
const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const Airtable = require('airtable');
const app = express();

// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());
app.get('/api/getAllCards', airTableController);

/**
 * Handle all http  calls
 * @param req
 * @param res
 */
async function airTableController(req, res) {
  getAllCardsRequestHandler(req)
    .then((result) =>
      res
        .set(result.headers)
        .status(result.statusCode)
        .send(result.data))

    .catch(e => res.status(500).end())
}

/**
 *
 * @param httpRequest
 * @returns {Promise<{JsonResponse}>}
 */
async function getAllCardsRequestHandler(httpRequest) {
  let response = createJsonResponse(false, null, null);
  try {
    response.data = await getAllCards();
    response.data.result = true;

  } catch (e) {
    response.data.error = e.message;
    response.statusCode = 405;
  }

  return response;
}

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

function createJsonResponse(result, data, error, code = 201) {

  return {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-max-age=1, stale-while-revalidate'
    },
    statusCode: code,
    data: {
      "result": result,
      "error": error,
      "data": data
    }
  }
}

module.exports = app;



