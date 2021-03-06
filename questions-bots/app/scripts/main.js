var GlobalPref = {};
var bf;
var schemaObj;
GlobalPref.dev = false;
function loadResources(){
  return $.get('https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/dia.json')
  .then(function (data) {
    GlobalPref.weights  = JSON.parse(data);
  })
  .then(function () {
    return $.get('https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/questions.json')
    .then(function(data){
      GlobalPref.schema  = JSON.parse(data);
    })
  });
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBcs-CirY48iLli8sZD5lSwsgeKlKz790g",
  authDomain: "wso2-sa-tool.firebaseapp.com",
  databaseURL: "https://wso2-sa-tool.firebaseio.com",
  storageBucket: "wso2-sa-tool.appspot.com",
  messagingSenderId: "775647198776"
};
firebase.initializeApp(config);
var database = firebase.database();

function getWeights() {
 var weights = {
 "L0" : {
   "description": "",
   "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L0.png",
   "children": {
     "LO1" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO1.png"
     },"LO5" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO5.png"
     }
   }
 },
 "L1" : {
   "description": "",
   "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L1.png",
   "children": {
     "LO1" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO1.png"
     },"LO5" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO5.png"
     }
   }
 },
 "L2" : {
   "description": "",
   "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L2.png",
   "children": {
     "LO1" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO1.png"
     },"LO5" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO5.png"
     }
   }
 },
 "L3" : {
   "description": "",
   "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/L3.png",
   "children": {
     "LO1" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO1.png"
     },"LO5" : {
       "description": "",
       "img" : "https://raw.githubusercontent.com/nuwanbando/sa-capacity-tool/master/dia/LO5.png"
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
            "title": "API calls per day",
            "description": "API calls per days at peak",
            "type": "string",
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
            "title": "API calls per sec.",
            "description": "API calls per second at peak",
            "type": "string",
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
            "title": "Is the load evenly distributed",
            "description": "",
            "type": "string",
            "enum": [
                {"val":"yes", "weight":"L0"},
                {"val":"no", "weight":"L0"}
            ],
            "required": true
        },
    "Q4":{
            "title": "Message size",
            "description": "average size of the message that goes through the gateway",
            "type": "string",
            "enum": [
                {"val":"1KB", "weight":"L0"},
                {"val":"1KB-100KB", "weight":"L0"},
                {"val":"100KB-1MB", "weight":"L1"},
                {"val":"1MB+", "weight":"L1"}
            ],
            "required": true
        },
    "Q5":{
            "title": "Developer portal users",
            "description": "API calls per days at peak",
            "type": "string",
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
            "title": "Developer portal average activity duration",
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
            "title": "Do you need approval work-flows",
            "description": "developer registration / application registration / api subscription",
            "type": "string",
            "enum": [
                {"val":"yes", "weight":"LO1"},
                {"val":"no", "weight":"L0"}
            ],
            "required": true
        },
    "Q8":{
            "title": "Throttling",
            "description": "Throttling capability",
            "type": "string",
            "enum": [
                {"val":"simple tiers", "weight":"L0"},
                {"val":"attribute based", "weight":"L0"},
                {"val":"jwt token based", "weight":"L0"},
                {"val":"header based", "weight":"L0"},
                {"val":"pattern based", "weight":"L0"}
            ],
            "required": true
        },
    "Q9":{
            "title": "High avaibility",
            "description": "amount for avaibility",
            "type": "string",
            "enum": [
                {"val":"90%", "weight":"L0"},
                {"val":"99%", "weight":"L0"},
                {"val":"99.90%", "weight":"L0"},
                {"val":"99.99%", "weight":"L0"}
            ],
            "required": true
        },
    "Q10":{
            "title": "Distater recovery",
            "description": "",
            "type": "string",
            "enum": [
                {"val":"yes", "weight":"L0"},
                {"val":"no", "weight":"L0"}
            ],
            "required": true
        },
    "Q11":{
            "title": "separae sandbox gateway",
            "description": "API Manager has a concept of a production and sandbox gateways",
            "type": "string",
            "enum": [
                {"val":"yes", "weight":"LO5"},
                {"val":"no", "weight":"L0"}
            ],
            "required": true
        }

  }};

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

function generateDiagram() {
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
  for (var i = 0; i < oGrade.length; i++) {
    if(weightDescription.children[oGrade[i]]){
        image_tag += '<img width="200px" src="'+weightDescription.children[oGrade[i]].img+'" alt="'+weightDescription.children[oGrade[i]].description+'"/>';
    }
  }
  var user = Cookies.get('user');
  if (user){
    $("#diagram").html(image_tag);
    $("#download-button").show();
    $("#information").hide();
  }else{
    $("#information").show();
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
function downloadDataUrlFromJavascript(filename, dataUrl) {

    // Construct the a element
    var link = document.createElement("a");
    link.download = filename;
    link.target = "_blank";

    // Construct the uri
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;
}
$(document).ready(function() {

  $("#download-button .btn").click(function(){
    var user = JSON.parse(Cookies.get('user'));
    var data = bf.getData();
    for (var question in schemaObj.schema.properties) {
      if (schemaObj.schema.properties.hasOwnProperty(question)) {
        var q = schemaObj.schema.properties[question];
         data[question] = {
           answer : data[question],
           question : q.title
         };
      }
    }
    console.log(data);
    firebase.database().ref('downloads/' + moment().format('YYYY-MM-DD') + '/' + md5(user.email)).set({
       user : user,
       data : data
    });
    var div = $("#diagram");
    var scaleBy = 5;
    var w = 1000;
    var h = 1000;
    div = div[0];
    var canvas = document.createElement('canvas');
    canvas.width = w * scaleBy;
    canvas.height = h * 10;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var context = canvas.getContext('2d');
    context.scale(scaleBy, scaleBy);
    html2canvas(div, {
      useCORS: true,
      canvas : canvas,
      background: '#fff',
      onrendered: function(canvas) {
        // canvas.width = 500;
        // canvas.height = 500;
        downloadDataUrlFromJavascript("diagram.png", canvas.toDataURL());
      }
    });
  });

  $( "#information-form" ).submit(function( event ) {
    event.preventDefault();
    var email = $('#inputEmail').val();
    var companyName = $('#companyName').val();
    Cookies.set('user', {
      email : email,
      companyName: companyName
    });
    generateDiagram();
  });
  loadResources().then(function() {
    var BrutusinForms = brutusin['json-forms'];
    BrutusinForms.bootstrap.addFormatDecorator("range", "string");
    schemaObj  = getSchema();
    var schema = schemaObj.schema;
    bf = BrutusinForms.create(schema);
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
    $( "#questions form" ).change(generateDiagram);

  });


});
