import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LON = process.env.LON;
const LAT = process.env.LAT;
const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    const dateTimes = [];
    const temps = [];
    const descriptions = [];
    try {
        const response = await axios.get(API_URL, {
            params: {
                lat: LAT,
                lon: LON,
                appid: API_KEY,
                units: "imperial"
            }
        });
        // Loop through each weather data entry
        response.data.list.forEach((entry) => {
            dateTimes.push(entry.dt_txt);
            temps.push(entry.main.temp.toString());
            descriptions.push(entry.weather[0].description);
        });
        // data to be passed to web page
        const content = {
            dateTimes: dateTimes,
            temps: temps,
            descriptions: descriptions
        };
        // console.log(content)
        res.render("index.ejs", {content: content});
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})