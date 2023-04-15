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
                            const trainData = [];
                            for (let i = 0; i < response.data.length; i++) {
                              const { trainName, price, seatsAvailable, departureTime } = response.data[i];
                              const trainTime = `${departureTime.Hours}:${departureTime.Minutes}`;
                              const train = {
                                trainDetails: trainName,
                                trainPrice: price.sleeper,
                                trainSeat: seatsAvailable,
                                trainTime: trainTime,
                              };
                              trainData.push(train);
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
                                res.send(trainData);
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