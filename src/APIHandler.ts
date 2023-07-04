import moment from "moment";
import axios from "axios";
import {CameraType} from "./CameraType";
import {Rover} from "./Rover";
import {PhotoModel} from "./PhotoModel";


export async function getRoverPhotosUsingFilters(rover: Rover, date: string = "2016-02-02", camera: CameraType, pageStart: number = 1, pageEnd: number = pageStart)
{
    let dateType: string;
    let query: string = "";

    if(date === undefined){
        return {data:"You are so silly, you forgot to enter a date"}
    }


    if (!Object.values(Rover).includes(rover)) {
        return {data: "You are so silly, that is not a rover"}
    }
    if (!(isNaN(Number(date)))) {
        dateType = "sol"
    } else if (moment(date, "YYYY-MM-DD").isValid()) {
        dateType ="earth_date"
    } else {
        return {data: "That is not a correct date"};
    }
    query = query+dateType+"="+date;

    if (!Object.values(CameraType).includes(camera)) {
        return {data: "You are so silly, that is not a camera"}
    }
    else{
        query += `&camera=${camera}`;
    }


    if ((isNaN(Number(pageStart)))) {
        pageStart = 1;
    }

    if ((isNaN(Number(pageEnd)))) {
        pageEnd = 1;
    }


    if(pageStart > pageEnd){
        pageEnd = pageStart;
    }

    let photos: PhotoModel[] = [];
    for (let i = pageStart; i <= pageEnd; i++) {
        photos.push(await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${query}&page=${i}&api_key=${process.env.API_KEY}`)
            .then(function (response) {
                const photoOut: PhotoModel[] = response.data.photos;
                return photoOut;
            })
            .catch(function (error) {
                return error;
            }))
    }
    return photos;
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