import moment from "moment";
import axios from "axios";
import {CameraType} from "./CameraType";
import {Rover} from "./Rover";
import {PhotoModel} from "./PhotoModel";


export async function getRoverPhotosUsingFilters(rover: Rover, date: string, camera: CameraType)
{
    let dateType: string;

    if(date === undefined){
        date = "1000";
    }
    if(camera === undefined){
        camera = CameraType.fhaz;
    }
    if (!Object.values(Rover).includes(rover)) {
        return {data: "You are so silly, that is not a rover"}
    }
    if(rover === undefined){
        rover = Rover.curiosity;
    }


    if (!(isNaN(Number(date)))) {
        dateType = "sol"
    } else if (moment(date, "YYYY-MM-DD").isValid()) {
        dateType ="earth_date"
    } else {
        return {data: "That is not a correct date"};
    }
    console.log("Before Req")
    return await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${dateType}=${date}&camera=${camera}&api_key=${process.env.API_KEY}`)
        .then(function (response) {
            console.log("After Req")
            const photoOut: PhotoModel[] = response.data.photos;
            return photoOut;
        })
        .catch(function (error) {
            return error;
        })

}


// router.get('/rover', (req: any, res: { send: (arg0: string) => any; }) => {
//     axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + process.env.API_KEY)
//         .then((r: { data: any; }) => res.send(r.data))
//         .catch(function(error){res.send(error)});
// });
//
//
// router.get('/rover/photos', (req:any, res: {send: (arg0:string)=> any}) => {
//     axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key="+process.env.API_KEY)
//         .then(function(data) {
//             res.send(data.data);
//         })
// })