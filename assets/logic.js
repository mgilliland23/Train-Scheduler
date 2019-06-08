var firebaseConfig = {
    apiKey: "AIzaSyBV-TvIwM4jzT7aEftBPOWWfCOeq22ZUHw",
    authDomain: "trainscheduler-2bf05.firebaseapp.com",
    databaseURL: "https://trainscheduler-2bf05.firebaseio.com",
    projectId: "trainscheduler-2bf05",
    storageBucket: "",
    messagingSenderId: "112991710266",
    appId: "1:112991710266:web:5695dd5bb4f8db44"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


$("#submit").on("click", function (e) {
    e.preventDefault();
    console.log("submitted")

    //Save the input values to Firebase
    database.ref().push({
        trainName: $("#trainNameInput").val(),
        destination: $("#destinationInput").val(),
        trainTime: $("#trainTimeInput").val(),
        frequency: $("#frequencyInput").val()
    });
});

database.ref().on("child_added", function (snapshot, prevChildKey) {
    var trainschedule = snapshot.val();

    var tr = $("<tr>");

    var trainName = $("<td>").text(trainschedule.trainName);
    var destination = $("<td>").text(trainschedule.destination);
    var frequency = $("<td>").text(trainschedule.frequency);
    var trainTime = $("<td>").text(trainschedule.trainTime);

    var nextTrain = $("<td>").text(nextTrainTime(trainschedule.trainTime, trainschedule.frequency));

    tr.append(trainName);
    tr.append(destination);
    tr.append(frequency);
    tr.append(nextTrain);
    tr.append("...");


    $("#trainScheduleBody").append(tr);

});

function nextTrainTime(firstTrainTime, frequency) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var arrivalTime = moment(nextTrain).format("hh:mm");

    return arrivalTime;

}


// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

