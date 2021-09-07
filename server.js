// const express = require("express");
//
// const https = require("https");
// const bodyparse = require("body-parser");
// const app = express();
// app.use(bodyparse.urlencoded({
//   extended: true
// }));
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// app.post("/", function(req, res) {
//   var jp;
//   var st = req.body.state[0].toUpperCase() + req.body.state.slice(1).toLowerCase();
//   const url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
//   https.get(url, function(response) {
//     response.on("data", function(data) {
//       var statejs = JSON.parse(data);
//       var st_id;
//       for (var i = 0; i < statejs.states.length; i++) {
//         if (statejs.states[i].state_name === st) {
//           st_id = statejs.states[i].state_id;
//         }
//       }
//       console.log(st_id);
//       var dt = req.body.district[0].toUpperCase() + req.body.district.slice(1).toLowerCase();
//       const url1 = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + st_id;
//       https.get(url1, function(response1) {
//         response1.on("data", function(data1) {
//           var cityjs = JSON.parse(data1);
//           var city_id;
//           for (var i = 0; i < cityjs.districts.length; i++) {
//             if (cityjs.districts[i].district_name === dt) {
//               city_id = cityjs.districts[i].district_id;
//             }
//           }
//           console.log(city_id);
//           const currentdate = new Date();
//           var date = "";
//           if (currentdate.getDate() < 10) {
//             date += "0" + currentdate.getDate();
//           } else {
//             date += currentdate.getDate();
//           }
//           date += "-";
//           if (currentdate.getMonth() + 1 < 10) {
//             var t = currentdate.getMonth() + 1;
//             date += "0" + t;
//           } else {
//             var t = currentdate.getMonth() + 1;
//             date += t;
//           }
//           date += "-";
//           date += currentdate.getFullYear();
//           console.log(date);
//           const url2 = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + city_id + "&date=" + date;
//           https.get(url2, function(response2) {
//             var news = "";
//             response2.on("data", function(data2) {
//               news += data2;
//             });
//             response2.on("end", function() {
//               var jp = JSON.parse(news);
//
//               // document.getElementById("t1").appendChild("<table><tr><td>"+JSON.parse(news).centers[0].name+"</td><td>"+JSON.parse(news).centers[0].block_name+"</td></tr></table>");
//               console.log(jp.centers[0]);
//               var f = 0;
//               for (var i = 0; i < JSON.parse(news).centers.length; i++) {
//                 if (req.body.age < 45 && req.body.age >= 18) {
//                   if (jp.centers[i].sessions[0].min_age_limit === 18 && jp.centers[i].sessions[0].vaccine === req.body.vaccineName) {
//                     f = 1;
//                     res.write("<div> <h3>Center Name : </h3><p>" + JSON.parse(news).centers[i].name + "</p><p>" + JSON.parse(news).centers[i].block_name + "</p></div>");
//                   }
//                 } else if (req.body.age >= 45) {
//                   if (((jp.centers[i].sessions[0].min_age_limit === 45) || (jp.centers[i].sessions[0].min_age_limit === 18 && jp.centers[i].sessions[0].allow_all_age === true)) && jp.centers[i].sessions[0].vaccine === req.body.vaccineName) {
//                     f = 1;
//                     res.write("<div> <h3>Center Name : </h3><p>" + JSON.parse(news).centers[i].name + "</p><p>" + JSON.parse(news).centers[i].block_name + "</p></div>");
//                   }
//                 }
//               }
//               if (f == 1) {
//                 res.send();
//               } else {
//                 res.send("<h2>oops!no available vaccins</h2><button type='submit'>Back to Homepage</button>");
//               }
//             });
//           });
//         });
//       });
//     });
//   });
// });
// app.listen(3000, function() {
//   console.log("server is runing on port 3000.");
// });
const express = require("express");

const https = require("https");
const bodyparse = require("body-parser");
const app = express();
app.use(bodyparse.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  var jp;
  var st = req.body.state;
  const url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
  https.get(url, function(response) {
    response.on("data", function(data) {
      var statejs = JSON.parse(data);
      var st_id;
      for (var i = 0; i < statejs.states.length; i++) {
        if (statejs.states[i].state_name === st) {
          st_id = statejs.states[i].state_id;
        }
      }
      // console.log(st_id);
      var dt = req.body.district;
      const url1 = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + st_id;
      https.get(url1, function(response1) {
        response1.on("data", function(data1) {
          var cityjs = JSON.parse(data1);
          var city_id;
          for (var i = 0; i < cityjs.districts.length; i++) {
            if (cityjs.districts[i].district_name === dt) {
              city_id = cityjs.districts[i].district_id;
            }
          }
          // console.log(city_id);
          const currentdate = new Date();
          var date = "";
          if (currentdate.getDate() < 10) {
            date += "0" + currentdate.getDate();
          } else {
            date += currentdate.getDate();
          }
          date += "-";
          if (currentdate.getMonth() + 1 < 10) {
            var t = currentdate.getMonth() + 1;
            date += "0" + t;
          } else {
            var t = currentdate.getMonth() + 1;
            date += t;
          }
          date += "-";
          date += currentdate.getFullYear();
          // console.log(date);
          const url2 = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + city_id + "&date=" + date;
          https.get(url2, function(response2) {
            var news = "";
            response2.on("data", function(data2) {
              news += data2;
            });
            response2.on("end", function() {
              var jp = JSON.parse(news);
              // console.log(jp.centers[0].sessions[0].vaccine);
              var f = 0,
                flag = 0;
              for (var i = 0; i < jp.centers.length; i++) {
                for (var j = 0; j < jp.centers[i].sessions.length; j++) {
                  if (req.body.age < 45 && req.body.age >= 18) {
                    if (jp.centers[i].sessions[j].min_age_limit === 18 && jp.centers[i].sessions[j].vaccine === req.body.vaccineName) {
                      f = 1;
                      if (flag == 1) {
                        res.write("<hr>");
                      } else {
                        flag = 1;
                      }
                      res.write(
                        "<div style='font-weight: bold; text-align: center; width:100%; height: 50%; margin:0; font-family: 'Droid Sans', sans-serif; color:#666666; font-size:12px; border:0; height:100%; line-height: 25px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'><p><h2 style='color:#4CAF50'>" +
                        JSON.parse(news).centers[i].name +
                        "</h2></p><p><h3 style='color:blue'>Address:" +
                        JSON.parse(news).centers[i].address +
                        "</h3></p><p>Fee Type:" +
                        JSON.parse(news).centers[i].fee_type +
                        "</p><div>");
                      res.write(
                        "<div><p style='color:#52006A'> Vaccine Type:<strong>" +
                        jp.centers[i].sessions[j].vaccine + "<br>Date" + jp.centers[i].sessions[j].date +
                        "</strong></p><p>Age limit:" +
                        jp.centers[i].sessions[j].min_age_limit +
                        "</p><p>Avilable Dose 1:" +
                        jp.centers[i].sessions[j].available_capacity_dose1 +
                        "</p><p>Avilable Dose 2:" +
                        jp.centers[i].sessions[j].available_capacity_dose2 +
                        "</p></div>"
                      );
                    }
                  } else if (req.body.age >= 45) {
                    if (((jp.centers[i].sessions[j].min_age_limit === 45) || (jp.centers[i].sessions[j].min_age_limit === 18 && jp.centers[i].sessions[j].allow_all_age === true)) && jp.centers[i].sessions[j].vaccine === req.body.vaccineName) {
                      f = 1;
                      if (flag == 1) {
                        res.write("<hr>");
                      } else {
                        flag = 1;
                      }
                      res.write(
                        "<div style='font-weight: bold; text-align: center; width:100%; height: 50%; margin:0; font-family: 'Droid Sans', sans-serif; color:#666666; font-size:12px; border:0; height:100%; line-height: 25px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'><p><h2 style='color:#4CAF50'>" +
                        JSON.parse(news).centers[i].name +
                        "</h2></p><p><h3 style='color:blue'>Address:" +
                        JSON.parse(news).centers[i].address +
                        "</h3></p><p>Fee Type:" +
                        JSON.parse(news).centers[i].fee_type +
                        "</p><div>");
                      res.write(
                        "<div><p style='color:#52006A'> Vaccine Type:<strong>" +
                        jp.centers[i].sessions[j].vaccine + "<br>Date" + jp.centers[i].sessions[j].date +
                        "</strong></p><p>Age limit:" +
                        jp.centers[i].sessions[j].min_age_limit +
                        "</p><p>Avilable Dose 1:" +
                        jp.centers[i].sessions[j].available_capacity_dose1 +
                        "</p><p>Avilable Dose 2:" +
                        jp.centers[i].sessions[j].available_capacity_dose2 +
                        "</p></div>"
                      );
                    }
                  }
                }
              }
              if (f == 1) {
                res.send();
              } else {
                res.sendFile(__dirname+"/htmlf/htmlfl.html");
              }
            });
          });
        });
      });
    });
  });
});
app.listen(3000, function() {
  console.log("server is runing on port 3000.");
});
