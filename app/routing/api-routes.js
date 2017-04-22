// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    var bestFriend = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    //Gets the information from the the survey POST request
    var yourData = req.body.scores;
    var differenceNum = 0;

      console.log(req.body.scores);
       console.log(friendData);

       //Loops through all the friends list
      for (var i = 0; i < friendData.length; i++) {

        differenceNum = 0;
        //this loops through all the friends score data and adds all the numbers
        for (var k = 0; k < friendData[i].scores.length; k++) {

        differenceNum += Math.abs(parseInt(yourData[k]) - parseInt(friendData[i].scores[k]));
        console.log(differenceNum);
        }
        //if the numbers that were add during the current friend loop, set the current friend 
        //as the new best friend
       if (differenceNum <= bestFriend.friendDifference) {
            bestFriend.name = friendData[i].name,
            bestFriend.photo = friendData[i].photo,
            bestFriend.friendDifference = differenceNum;
          }

       }
       console.log(bestFriend);
      friendData.push(req.body);

      //when all the loops finish return the best friend object
      return res.json(bestFriend);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];

    console.log(friendData);
  });
};