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
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
});

// Every time a new train is added to the database
database.ref("/Train Data").on("child_added", function(trainSnapshot) {
    // console.log(trainSnapshot.val());
    var trainNameOutput =  trainSnapshot.val().trainName;
    var destinationOutput = trainSnapshot.val().destination;
    var firstTrainTimeOutput = trainSnapshot.val().firstTrainTime;
    var frequencyOutput = trainSnapshot.val().frequency;
    // Converting time input to 12 hour
    var firstTrainTimeCivilian = moment(firstTrainTimeOutput, "hh:mm");
    // Current Time
	var currentTime = moment();
	// Difference between the times
	var timeDifference = moment().diff(moment(firstTrainTimeCivilian), "minutes");
	var timeRemaining = timeDifference % frequencyOutput;
	// Minutes away
	var minutesAway = frequencyOutput - timeRemaining;
    // Next train time 
	var nextTrain = moment().add(minutesAway, "minutes");
	var nextTrainArrival = moment(nextTrain).format("hh:mm a");

    console.log("==========================");
    console.log("<stron>New Train Info</strong>");
    console.log("Name: " + trainNameOutput);
    console.log("Destination: " + destinationOutput);
    console.log("First Train Time: " + firstTrainTimeOutput);
    console.log("Frequency: " + frequencyOutput);
    console.log("Next Arrival: " + nextTrainArrival);
    console.log("Minutes Away: " + minutesAway);
    console.log("==========================");

    var newRow = $("<tr>").append(
        $("<td>").text(trainNameOutput),
        $("<td>").text(destinationOutput),
        $("<td>").text(firstTrainTimeOutput),
        $("<td>").text(frequencyOutput),
        $("<td>").text(nextTrainArrival),
        $("<td>").text(minutesAway)
    )

    $("tbody").append(newRow);
});
