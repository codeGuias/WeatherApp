const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

})

// app.post("/", function(req, res){
    

//         const query = req.body.cityName;
//         const apiKey = "af30c8fdb9b151754e59503c43139506";
//         const unit = "metric"
//         const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey+ "&units="+ unit;

//         https.get(url, function(response){
//             console.log(response.statusCode);

//             response.on("data", function(data){
//                 const weatherData = JSON.parse(data);
//                 const temp = weatherData.main.temp;
//                 const weatherDescription = weatherData.weather[0].description;
//                 const icon = weatherData.weather[0].icon;
//                 const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
//                 res.write("<p>The weather is currently " + weatherDescription +"</p>");
//                 res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius.</h1>");
//                 res.write("<img src=" + imageURL + ">");
//                 res.send()
//             })
//         })
   
// })




app.listen(3000, function(){
    console.log("Server is running in port 3000");
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "af30c8fdb9b151754e59503c43139506";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey+ "&units="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            
            res.write("<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'><title>Weather App</title></head><body><div class='container'><div class='card'><div class='card-body'><h5 class='card-title'>Weather Information</h5><p class='card-text'>The weather is currently " + weatherDescription + "</p><h1 class='card-text'>The temperature in " + query + " is " + temp + " degrees Celsius.</h1><img src='" + imageURL + "'><p><a href='/' class='btn btn-primary'>Go Back</a></p></div></div></div></body></html>");
            res.send();
        })
    })

})
