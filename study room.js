function back(){
    window.location="index.html";
}

img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('study-room.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    oD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detected!";
}

function modelLoaded(){
    console.log("Model has been Loaded!")
    status = true;
    oD.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status !=""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}