import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({
  path: '../.env'
});
import AirTableHandler from "./handlers/air-table-handler.js"

const app = express();
const port = process.env.PORT || '3000';


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


