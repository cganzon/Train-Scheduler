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
    console.log("==========================");
    console.log("New train added:");
    console.log(trainNameInput);
    console.log(destinationInput);
    console.log(firstTrainTimeInput);
    console.log(frequencyInput);
    console.log("==========================");
});
