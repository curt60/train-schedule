// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQpG_Vqn56dvP1udZr1Il0uqQFbaMBSkU",
    authDomain: "fir-01-6d8b6.firebaseapp.com",
    databaseURL: "https://fir-01-6d8b6.firebaseio.com",
    projectId: "fir-01-6d8b6",
    storageBucket: "fir-01-6d8b6.appspot.com",
    messagingSenderId: "25267198893"
};
firebase.initializeApp(config);

var database = firebase.database();

$("button").on("click", function() {
    //push input data to database
    database.ref().push({
        trainName: $("#train-name").val().trim(),
        destination: $("#destination").val().trim(),
        firstTrain: $("#first-train").val(),
        frequency: parseInt($("#frequency").val())
    });
    //clear input fields
    $("input").val("");
})

database.ref().on("child_added", function(snapshot) {
    console.dir(snapshot.val());
    var data = snapshot.val();

    //calculate next arrival time
    var nextArrival = 0;
    //calculate mins away
    var minsAway = 0;

    //create new row element
    var trainRow = $("<tr>");
    
    //create new row content elements
    var trainName = $("<td>");
    var trainDestination = $("<td>");
    var trainFrequency = $("<td>");
    var trainNextArrival = $("<td>");
    var trainMinsAway = $("<td>");
    
    //define element values
    trainName.html(data.trainName);
    trainDestination.html(data.destination);
    trainFrequency.html(data.frequency);
    trainNextArrival.html(nextArrival);
    trainMinsAway.html(minsAway);
    
    //append contents to row
    trainRow.append(trainName);
    trainRow.append(trainDestination);
    trainRow.append(trainFrequency);
    trainRow.append(trainNextArrival);
    trainRow.append(trainMinsAway);
    
    //append row to table body
    $("#train-table").append(trainRow);

})