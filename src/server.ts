import express from "express";
import dotenv from 'dotenv';
import * as https from "https";
import axios from "axios";

dotenv.config();
const app = express();
const port = 8000;



app.use(express.json());

const router = express.Router();
// router.get('/test', (req: any, res: { send: (arg0: string) => any; }) => res.send());
router.get('/rover', (req: any, res: { send: (arg0: string) => any; }) => {
    axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + process.env.API_KEY)
        .then((r: { data: any; }) => res.send(r.data))
        .catch(function(error){res.send(error)});
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});