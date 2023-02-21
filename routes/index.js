 var express = require("express");
 var router = express.Router();
 let request = require('request');
 
 
const cors = require('cors');


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));


router.get("/", function(req, res, next) {
   res.render("patientPage", { title: "Pateint Page" });
 });
 
 router.post("/Contact", async function(req, res, next) {
    const { patientId, title, firstName, middleInitial, lastName, phone, email, sex, dob, street, city, state, zip, relationToPatient, type, emergencyPriority, signature } = req.body;
    var result=1
     
    request.post(
    'https://xlcp1y-8080.preview.csb.app/contacts',
    { json: { 
      "patientId": patientId ,
     "title": title,
     "firstName": firstName,
     "middleInitial": middleInitial,
     "lastName":lastName,
     "phone":phone,
     "email":email,
    "sex":sex,
    "dateOfBirth": dob,
    "street":street,
    "city":city,
    "state":state,
    "zip":zip,
    "relationToPatient":relationToPatient,
    "type":type,
    "emergencyPriority":emergencyPriority,
    "signature":signature
    
    }
    },
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            result="Thank You, your Contact ID is "+body.insertId
              res.render("subscribed", {
             title: "Contact",
              result 
    
               });
        }
        else{
            console.log(body);
            result= JSON.stringify(body)
              res.render("subscribed", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});

router.post("/Subscribe", async function(req, res, next) {
   const { title, firstName, middleInitial, lastName, phone, email, sex, ssn, dob, street, city, state, zip, insuranceCompany, plan, groupNumber, cardHolder,medications,allergies,surgeries,familyHistory,addictions,questionnaire,symptoms, signature } = req.body;
   var result= 0
   
    request.post(
    'https://xlcp1y-8080.preview.csb.app/patient',
    { json: { 
     "title": title,
     "firstName": firstName,
     "middleInitial": middleInitial,
     "lastName":lastName,
     "phone":phone,
     "email":email,
    "sex":sex,
     "ssn":ssn,
    "dateOfBirth": dob,
    "street":street,
    "city":city,
    "state":state,
    "zip":zip,
    "insuranceCompany": insuranceCompany,
    "plan": plan,
    "groupNumber": groupNumber,
    "cardHolder": cardHolder,
     "medications": {"Intake":medications},
     "allergies": {"Intake":allergies},
     "surgeries": {"Intake":surgeries},
     "familyHistory": { "Intake":familyHistory},
     "addictions": { "Intake":addictions},
     "questionnaire": {"Blood Type":questionnaire },
    "symptoms": {"Intake":symptoms },
    "signature":signature
    
    }
    },
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            result="Thank You, your Patient ID is "+body.insertId
              res.render("subscribed", {
              title: "Patient",
              result 
    
               });
        }
        else{
            console.log(body);
            result= JSON.stringify(body)
              res.render("subscribed", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});

router.post("/GetPatient", async function(req, res, next) {
   const { patientId} = req.body;

   var result= "Patient not found with ID "+patientId
  // var titles="Error"
   var contact= "No Contacts found for Patient with ID "+patientId
   
   
    request.get('https://xlcp1y-8080.preview.csb.app/patient/single/'+patientId+'',
    async function (error, response, body) {
        if (!error ) {
            console.log(body);
            result= body
            
             request.get('https://xlcp1y-8080.preview.csb.app/contacts/patient/'+patientId+'',
    async function (error, response, body) {
        if (!error ) {
            console.log(body);
            if(body!='[]'){
            contact= body}
             res.render("get", {
              title: "Patient",
              result ,
              contact
    
               });
        }
      
    }
);
            
            
        }
        else{
           
              res.render("get", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});
module.exports = router;
