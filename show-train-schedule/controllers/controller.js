const axios = require('axios').default;

exports.getTrainDetails = (req, res) => {
  var obj = {
    "companyName": "something"
    };
  axios.post("http://localhost:3000/register",obj).then(
    (response) => {
        console.log(response.data);
        var data = response.data;
        var companyName = data.companyName;
        var clientID = data.clientID;
        var clientSecret = data.clientSecret;
        var auth = {
                "companyName": companyName,
                "clientID": clientID,
                "clientSecret": clientSecret
        }
        axios.post("http://localhost:3000/auth",auth).then(
            (response) => {
                console.log(response.data);
                var data1 = response.data;
                var accessToken = data1.access_token;
                axios.get("http://localhost:3000/trains",{
                    headers: {'Authorization': 'Bearer '+accessToken}}).then(
                        (response) => {
                            console.log(response.data);
                            var data2 = response.data[0];
                            var data3 = response.data[1];
                            var depatureTime1 = data2.departureTime.Hours + ":" + data2.departureTime.Minutes;
                            var depatureTime2 = data3.departureTime.Hours + ":" + data3.departureTime.Minutes;
                            var timeDifferenceMinutes = data3.departureTime.Minutes - data2.departureTime.Minutes;
                            if(timeDifferenceMinutes<30){
                                var isDepatingIn30Min = true;
                            }
                            else{
                                var isDepatingIn30Min = false;
                            }
                            var trainSchedule1 = {
                                "trainName": data2.trainName,
                                "Departure Time": depatureTime1,
                                "Price Sleeper": data2.seatsAvailable.sleeper,
                                "Price AC": data2.seatsAvailable.AC,
                                "isDepating in 30 min": isDepatingIn30Min
                            }  
                            var trainSchedule2 = {
                                "trainName": data3.trainName,
                                "Departure Time": depatureTime2,
                                "Price Sleeper": data3.seatsAvailable.sleeper,
                                "Price AC": data3.seatsAvailable.AC,
                                "isDepating in 30 min":isDepatingIn30Min
                            }       
                               const pricesOrderSleeper = [];

                                for (let i = 0; i < response.data.length; i++) {
                                    pricesOrderSleeper.push(response.data[i].price.sleeper);
                                }   
                                pricesOrderSleeper.sort((a, b) => a - b);
                                console.log(pricesOrderSleeper);

                                const pricesOrderAC = [];

                                for (let i = 0; i < response.data.length; i++) {
                                    pricesOrderAC.push(response.data[i].price.AC);
                                }   
                                pricesOrderAC.sort((a, b) => a - b);
                                console.log(pricesOrderAC);
                                res.send({
                                    "trainSchedule1": trainSchedule1,
                                    "trainSchedule2": trainSchedule2,
                                    "pricesOrderSleeper": pricesOrderSleeper,
                                    "pricesOrderAC": pricesOrderAC
                                });
                        }
                    )
            });
        }
  ).catch(
    (error) => {
        console.log(error);
        }
    );
};