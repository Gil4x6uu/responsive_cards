import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AirTableHandler from "./handlers/air-table-handler.js"
dotenv.config();

const app = express();
const port = process.env.PORT || '3001';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('*', airTableController);

/**
 * Handle all http calls
 * @param req
 * @param res
 */
async function airTableController(req, res) {
  const airTableHandler = await new AirTableHandler();
  airTableHandler.requestEndpointHandler(req)
    .then((result) =>
      res
        .set(result.headers)
        .status(result.statusCode)
        .send(result.data))

    .catch(e => res.status(500).end())
}

app.listen(port, () =>
  console.log(`API RUNNING ON LOCALHOST: ${port}`)
);


