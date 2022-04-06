 function setup() {
     canvas = createCanvas(500, 500);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
     posenet = ml5.poseNet(video, modelLoaded);
     posenet.on("pose", gotPoses);


 }
 leftWrist_x = 0;
 leftWrist_y = 0;
 rightWrist_x = 0;
 rightWrist_y = 0;
 score_left_wrist = 0;
 score_right_wrist = 0;
 song1_status = "";
 song2_status = "";


 function modelLoaded() {
     console.log("modelLoaded");


 }

 function gotPoses(results) {
     if (results.length > 0) {
         console.log(results);
         leftWrist_x = results[0].pose.leftWrist.x;
         leftWrist_y = results[0].pose.leftWrist.y;
         rightWrist_x = results[0].pose.rightWrist.x;
         rightWrist_y = results[0].pose.rightWrist.y;
         console.log("leftWristx " + leftWrist_x + ",leftWristy " + leftWrist_y + ",rightWristx " + rightWrist_x + ",rightWristy " + rightWrist_y);
         score_left_wrist = results[0].pose.keypoints[9].score;
         console.log("score_left_wrist= " + score_left_wrist);
         score_right_wrist = results[0].pose.keypoints[10].score;
         console.log("score_right_wrist= " + score_right_wrist);

     }
 }








 function draw() {
     image(video, 0, 0, 500, 500);
     fill("red");
     stroke("red");
     song1_status = song1.isPlaying();
     song2_status = song2.isPlaying();
     if (score_right_wrist > 0.2) {
         circle(rightWrist_x, rightWrist_y, 20);
         song2.stop();
         if (song1_status == false) {
             song1.play();
             document.getElementById("song").innerHTML = "Theme-song";

         }
     }
     if (score_left_wrist > 0.2) {
         circle(leftWrist_x, leftWrist_y, 20);
         song1.stop();
         if (song2_status == false) {
             song2.play();
             document.getElementById("song").innerHTML = "Peter-Pan";

         }
     }









 }

 song1 = "";
 song2 = "";

 function preload() {
     song1 = loadSound("music.mp3");
     song2 = loadSound("music2.mp3");
 }

 function play() {
     song.play();
     song.setVolume(1);
     song.rate(1);
 }