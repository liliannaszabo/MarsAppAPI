import express from "express";
import dotenv from 'dotenv';
import * as https from "https";
import axios from "axios";
import moment from "moment";

dotenv.config();
enum cameraType{
    fhaz = "fhaz",
    rhaz = "rhaz",
    mast = "mast",
    chamcam = "chamcam",
    mahli = "mahli",
    mardi = "mardi",
    navcam = "navcam",
    pancam = "pancam",
    minites = "minites"
}

enum rover{
    curiosity = "curiosity",
    opportunity = "opportunity",
    spirit = "spirit"
}
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


router.get('/rover/photos', (req:any, res: {send: (arg0:string)=> any}) => {
    axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key="+process.env.API_KEY)
        .then(function(data) {
            res.send(data.data);
        })
})



router.get('/rover/:rover/photos', (req:any, res: {send: (arg0:string)=> any}) => {
    if(!Object.values(rover).includes(req.params.rover)) {
        res.send("You are so silly");
        return;
    }
    let dateType: string;
    console.log(req.params.date, !isNaN(Number(req.params.date)))
    if(!(isNaN(Number(req.params.date)))){
        dateType = "sol"
        res.send(dateType);
        return;
    }
    else if(moment(req.params.date, "YYYY-MM-DD").isValid()){
        dateType = "earth_date";
        res.send(dateType);
        return;
    }
    else{
        res.send("You are so shit at URLs");
        return;
    }

    axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/"+req.params.rover + "/photos?sol=1000&camera=" + req.params.camera +"&api_key="+process.env.API_KEY)
        .then(function(response) {
            res.send(response.data);
        })
        .catch(function(error) {
            res.send(error);
        })
})


app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
