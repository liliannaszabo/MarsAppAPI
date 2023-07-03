import express from "express";
import dotenv from 'dotenv';
import axios from "axios";
import {getRoverPhotosUsingFilters} from "./APIHandler";
import {Rover} from "./Rover";
import {CameraType} from "./CameraType";

dotenv.config();



const app = express();



const port = 8000;

app.use(express.json());
const router = express.Router();
// router.get('/test', (req: any, res: { send: (arg0: string) => any; }) => res.send());


router.get('/rover/:rover/photos', async (req: any, res:any ) => {
    await getRoverPhotosUsingFilters(req.params.rover, req.query.date, req.query.camera)
        .then(response => {
            if(response !== undefined){
                res.send(response.data);
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
