// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-z4R-sO1CSe8ellERjaUAJdaNLtO8Avw",
    authDomain: "train-activity-26152.firebaseapp.com",
    databaseURL: "https://train-activity-26152.firebaseio.com",
    projectId: "train-activity-26152",
    storageBucket: "train-activity-26152.appspot.com",
    messagingSenderId: "64017554071"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#Submit').on("click", function() {
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  
  var newTrain = {
      name: trainName,
      destination: destination,
      firsttrain: firstTrain,
      frequency: frequency
    }
  
  database.ref().push(newTrain);
  console.log(newTrain.name);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");

  return false;
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firsttrain;
  var frequency = childSnapshot.val().frequency;
  
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
 
  var minToTrain = frequency - timeRemainder;

  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#traintable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});


