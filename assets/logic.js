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


    tr.append(trainName);
    tr.append(destination);
    tr.append(frequency);
    tr.append(trainTime);

    $("#trainScheduleBody").append(tr);

});