var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var reservations = [];
var waitlist = [];

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"home.html"));
});

app.get("/reserve", function(req,res){
    res.sendFile(path.join(__dirname,"reserve.html"));
});

app.get("/tables", function(req,res){
    res.sendFile(path.join(__dirname,"tables.html"));
});

app.get("/api/tables", function(req,res){
    res.json(reservations);
});
app.get("/api/waitList", function(req,res){
    res.json(waitlist);
});

app.post("/reserve",function(req,res){
    var reservation = req.body;

    if(reservations.length >= 5){
        waitlist.push(reservation);
    }
    else {
        reservations.push(reservation);
    }
    

    res.json(reservation);   

    console.log("----Updated Reservations-----");
    console.log(reservations);
    console.log(waitlist);
    console.log("-----------------------------");


});



app.listen(PORT,function(){
    console.log("Hot Restaurant Reservation server started");
})