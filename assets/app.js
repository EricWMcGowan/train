  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDD1U90B35nLixCFrR9YsfiTD_eBPNMDe0",
    authDomain: "train-scheduler-d0045.firebaseapp.com",
    databaseURL: "https://train-scheduler-d0045.firebaseio.com",
    projectId: "train-scheduler-d0045",
    storageBucket: "train-scheduler-d0045.appspot.com",
    messagingSenderId: "367281736267"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";

  $(document).ready(function(){
    $("#add-train").click (function () {
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainTime + "</td><td>" + frequency + "</td></tr>";
        $("#train-display").append(markup);
    });
    
    // Find and remove selected table rows
    

    $("#add-train").on("click", function(event) {
        event.preventDefault();
  
        // Grabbed values from text-boxes
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();
  
        // Code for "Setting values in the database"
        database.ref().push({
          trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  
      });

         // Firebase watcher + initial loader HINT: .on("value")
         database.ref().on("child_added", function(snapshot) {
            // storing the snapshot.val() in a variable for convenience
            var sv = snapshot.val();

        // Log everything that's coming out of snapshot
        
        console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.trainTime);
        console.log(sv.frequency);
  
        // Change the HTML to reflect
        $("#train-display").text(snapshot.val().trainName);
        $("#destination-display").text(snapshot.val().destination);
        $("#time-display").text(snapshot.val().trainTime);
        $("#frequency-display").text(snapshot.val().frequency);
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });