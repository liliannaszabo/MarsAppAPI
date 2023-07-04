import express from "express";
import dotenv from 'dotenv';
import axios from "axios";
import {getRoverPhotosUsingFilters} from "./APIHandler";
import {PhotoModel} from "./PhotoModel";

dotenv.config();



const app = express();



const port = 8000;

app.use(express.json());
const router = express.Router();
// router.get('/test', (req: any, res: { send: (arg0: string) => any; }) => res.send());


router.get('/rover/:rover/photos/:camera', async (req: any, res:any ) => {

    let date = req.query.date ? req.query.date: null;
    let pageStart = req.query.pageStart ? req.query.pageStart: 1;
    let pageEnd = req.query.pageEnd ? req.query.pageEnd: pageStart;
    await getRoverPhotosUsingFilters(req.params.rover, date, req.param.camera, pageStart, pageEnd)
        .then(response => {
            if(response !== undefined){
                res.send(response);
            }
            else{
                res.send("no response from server");
            }
        })
})


app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
