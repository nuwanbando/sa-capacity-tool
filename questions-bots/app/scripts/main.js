var GlobalPref = {};
GlobalPref.dev = false;
function loadResources(){
  return $.get('https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/dia.json')
  .then(function (data) {
    GlobalPref.weights  = JSON.parse(data);
  }).then($.get('https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/questions.json'))
  .then(function (data) {
    GlobalPref.schema  = JSON.parse(data);
  });
}

function getWeights() {
 var weights = {
   "L0" : {
     "description": "",
     "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L0.png",
     "children": {
       "L01" : {
         "description": "",
         "img" : ""
       }
     }
   },
   "L1" : {
     "description": "",
     "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L1.png",
     "children": {
       "L01" : {
         "description": "",
         "img" : ""
       }
     }
   },
   "L2" : {
     "description": "",
     "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L2.png",
     "children": {
       "L01" : {
         "description": "",
         "img" : ""
       }
     }
   },
   "L3" : {
     "description": "",
     "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L3.png",
     "children": {
       "L01" : {
         "description": "",
         "img" : ""
       }
     }
   }
  };
 if(!GlobalPref.dev){
   return GlobalPref.weights;
 }
 return weights;
}

function getImage(url, ptitle){
    return $.ajax(
        {
        url: url,
        success: function(data) {
            var html = $.parseHTML( data ),
                img = $(html).find("img"),
                len = img.length;
            if( len > 0 ){
                var src = img.first().attr("src"); // get id of first image
            } else {
                console.log("Image not found");
            }
            console.log(src);

            var image_tag='<img src="'+src+'" alt="'+ptitle+'"/>';
            return image_tag;
        }
    });
}

function getSchema () {
  var schObj = {
      "$schema": "http://json-schema.org/draft-03/schema#",
      "type": "object",
      "properties": {
      	"Q1":{
                  "title": "api calls per day",
                  "description": "API calls per days at peak",
                  "type": "string", /* slider is better*/
                  "enum": [
                      {"val":"100K<", "weight":"L0"},
                      {"val":"100K-500K", "weight":"L0"},
                      {"val":"500K-1Mil", "weight":"L0"},
                      {"val":"1Mil-10Mil", "weight":"L1"},
                      {"val":"10Mil+", "weight":"L3"}
                  ],
                  "required": true
              },
          "Q2":{
                  "title": "API calls per sec",
                  "description": "API calls per second at peak",
                  "type": "string", /* slider is better*/
                  "enum": [
                      {"val":"10", "weight":"L0"},
                      {"val":"10-100", "weight":"L0"},
                      {"val":"100-1000", "weight":"L0"},
                      {"val":"1000-5000", "weight":"L1"},
                      {"val":"5000+", "weight":"L3"}
                  ],
                  "required": true
              },
          "Q3":{
                  "title": "is the load evenly distributed",
                  "description": "",
                  "type": "string",
                  "enum": [
                      {"val":"yes", "weight":"L0"},
                      {"val":"no", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q4":{
                  "title": "message size",
                  "description": "average size of the message that goes through the gateway",
                  "type": "string", /* slider is better*/
                  "enum": [
                      {"val":"1KB", "weight":"L0"},
                      {"val":"1KB-100KB", "weight":"L0"},
                      {"val":"100KB-1MB", "weight":"L1"},
                      {"val":"1MB+", "weight":"L1"}
                  ],
                  "required": true
              },
          "Q5":{
                  "title": "dev portal users",
                  "description": "API calls per days at peak",
                  "type": "string", /* slider is better*/
                  "enum": [
                      {"val":"5K<", "weight":"L0"},
                      {"val":"5K-100K", "weight":"L0"},
                      {"val":"100K-500K", "weight":"L2"},
                      {"val":"5000K-1Mil", "weight":"L2"},
                      {"val":"1Mil+", "weight":"L2"}
                  ],
                  "required": true
              },
          "Q6":{
                  "title": "Average activty duration",
                  "description": "active user session time",
                  "type": "string",
                  "enum": [
                      {"val":"1h", "weight":"L0"},
                      {"val":"1h-3h", "weight":"L2"},
                      {"val":"3h+", "weight":"L2"}
                  ],
                  "required": true
              },
          "Q7":{
                  "title": "Do you need approval workflows",
                  "description": "developer registration / application registration / api subscription",
                  "type": "string",
                  "enum": [
                      {"val":"yes", "weight":"LO1"},
                      {"val":"no", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q8":{
                  "title": "Bringing your own key manager",
                  "description": "WSO2 API Manager comes with a OAuth key server however you can opt-out for your own",
                  "type": "string",
                  "enum": [
                      {"val":"yes", "weight":"LO2"},
                      {"val":"no", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q9":{
                  "title": "Simple tier based throttling ?",
                  "description": "(gold / silver / unlimited - tiers are customizable",
                  "type": "string",
                  "enum": [
                      {"val":"yes", "weight":"L0"},
                      {"val":"no", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q10":{
                  "title": "Advanced throttling",
                  "description": "anything above simple tier based option",
                  "type": "string",
                  "enum": [
                      {"val":"attribute based", "weight":"LO1"},
                      {"val":"jwt token based", "weight":"L0"},
                      {"val":"header based", "weight":"L0"},
                      {"val":"pattern based", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q11":{
                  "title": "High avaibility",
                  "description": "amount for avaibility",
                  "type": "string", /* slider is better*/
                  "enum": [
                      {"val":"90%", "weight":"LO"},
                      {"val":"99%", "weight":"LO4"},
                      {"val":"99.90%", "weight":"LO3"},
                      {"val":"99.99%", "weight":"LO3"}
                  ],
                  "required": true
              },
          "Q12":{
                  "title": "Distater recovery",
                  "description": "",
                  "type": "string",
                  "enum": [
                      {"val":"yes", "weight":"LO8"},
                      {"val":"no", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q13":{
                  "title": "separae sandbox gateway",
                  "description": "API Manager has a concept of a production and sandbox gateways",
                  "type": "string",
                  "enum": [
                      {"val":"yes", "weight":"LO5"},
                      {"val":"no", "weight":"L0"}
                  ],
                  "required": true
              },
          "Q14":{
                  "title": "authentication type",
                  "description": "default is OAuth",
                  "type": "string",
                  "enum": [
                      {"val":"OAuth2", "weight":"L0"},
                      {"val":"SAML2 bearer", "weight":"L0"},
                      {"val":"NTLM", "weight":"LO6"},
                      {"val":"Other", "weight":"LO6"}
                  ],
                  "required": true
              },
          "Q15":{
                  "title": "Type of api management",
                  "description": "",
                  "type": "string",
                  "enum": [
                      {"val":"internal", "weight":"L0"},
                      {"val":"external", "weight":"L0"},
                      {"val":"both", "weight":"L0"},
                  ],
                  "required": true
              }
      }
  };
  if(!GlobalPref.dev){
    schObj.properties = GlobalPref.schema;
  }
  var properties = {};
  var answerCheck = {};
  _.each(schObj.properties, function(value, key) {
    var enumObj = value.enum;
    value.enum = _.pluck(enumObj, "val");

    properties[key] = value;

    var facts = {};
    _.each(enumObj, function(val) {
      facts[val.val] = val.weight;
    } );
    answerCheck[key] = facts;
  });
  schObj.properties = properties;
  return {
    schema : schObj,
    answerCheck : answerCheck
  };
}

function oGradeCheck(grade){
  if(grade.indexOf("LO") !== -1){
    return true;
  }
}

function lGradeCheck (current, grade) {
  if(current){
    if(grade === current){
      return current;
    }

    if (grade.split('L')[1] > current.split('L')[1]) {
      return grade;
    }
    else {
      return current;
    }
  }
  return grade;
}

$(document).ready(function() {
  loadResources().then(function() {
    var BrutusinForms = brutusin['json-forms'];
    var schemaObj = getSchema();
    var schema = schemaObj.schema;
    var bf = BrutusinForms.create(schema);
    bf.schemaResolver = function (names, data, cb) {
        var schemas = new Object();
        var schema = new Object();
        schema.type = "string";
        if (data.Q15 === "both") {
            schema.title = "same gateway for both apis types";
            schema.description = "internal and external apis can have their separate gateways if there is a security concern"
            schema.enum = ["yes", "no"]
        }else{
            schema.type = "null";
        }

        schemas["$.Q16"] = schema;
        cb(schemas);
    };
    var container = document.getElementById('questions');
    bf.render(container, {});

    $( "#questions form" ).change(function() {
      var answers = bf.getData();
      var lGrade;
      var oGrade = [];
      _.each(answers, function(value, key){
        var answerWeight = schemaObj.answerCheck[key];
        if(oGradeCheck(answerWeight[value])){
          oGrade.push(answerWeight[value]);
        }
        else {
          lGrade = lGradeCheck(lGrade, answerWeight[value]);
        }
        console.log("Current value is "+ value + " and answer weight is "+ answerWeight[value] + " and current L grade is "+ lGrade);
      });

      // populate the images
      console.log("Final weight for L " + lGrade + " and final weights for O " + JSON.stringify(oGrade));
      var weightDescriptions =  getWeights();
      var weightDescription = weightDescriptions[lGrade];

      var image_tag = '<img width="400px" src="'+weightDescription.img+'" alt="'+weightDescription.description+'"/>';
        $("#diagram").html(image_tag);

    });
  });


});
