// Initialize Firebase
var config = {
    apiKey: "AIzaSyDXWYfcWZUH9a3XrfP_XyHerTD5S5NJYU4",
    authDomain: "train-scheduler-b0101.firebaseapp.com",
    databaseURL: "https://train-scheduler-b0101.firebaseio.com",
    projectId: "train-scheduler-b0101",
    storageBucket: "train-scheduler-b0101.appspot.com",
    messagingSenderId: "815253003341"
};
firebase.initializeApp(config);
// ==========================================================//

var database = firebase.database();

// When user's clicks button to add a new train
$("#add-train").on("click", function (event) {
    // prevents page refresh!
    event.preventDefault();

    // Getting user's input
    var trainNameInput = $("#train-name").val().trim();
    var destinationInput = $("#destination").val().trim();
    var firstTrainTimeInput = $("#first-train-time").val().trim();
    var frequencyInput = $("#frequency").val().trim();

    // Object to hold new train data
    var newTrain = {
        trainName: trainNameInput,
        destination: destinationInput,
        firstTrainTime: firstTrainTimeInput,
        frequency: frequencyInput
    }

    // Uploading to firebase
    database.ref("/Train Data").push(newTrain);

    // console.log("==========================");
    // console.log("New train added:");
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequency);
    // console.log("==========================");

    // Emptying input fields after data is stored
    trainNameInput = $("#train-name").val("");
    destinationInput = $("#destination").val("");
    firstTrainTimeInput = $("#first-train-time").val("");
    frequencyInput = $("#frequency").val("");
});

// Every time a new train is added to the database
database.ref("/Train Data").on("child_added", function(trainSnapshot) {
    console.log(trainSnapshot.val());

    var trainNameOutput =  trainSnapshot.val().trainName;
    var destinationOutput = trainSnapshot.val().destination;
    var firstTrainTimeOutput = trainSnapshot.val().firstTrainTime;
    var frequencyOutput = trainSnapshot.val().frequency;

    console.log("==========================");
    console.log("New train added:");
    console.log(trainNameOutput);
    console.log(destinationOutput);
    console.log(firstTrainTimeOutput);
    console.log(frequencyOutput);
    console.log("==========================");

    var newRow = $("<tr>").append(
        $("<td>").text(trainNameOutput),
        $("<td>").text(destinationOutput),
        $("<td>").text(firstTrainTimeOutput),
        $("<td>").text(frequencyOutput)
    )

    $("tbody").append(newRow);
});
