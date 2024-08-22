const path=require("path");
const express=require('express');
const hbs = require("hbs");
//const spellcheck = require('./utils/spellcheck');// imported the function //not using in this axios app
const axios=require ("axios");


//port: 4000
const app = express();
const port = process.env.port || 4000;
app.use(express.json());

// Define paths for Express (templates)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars and views 
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


//index page
app.get("", (req, res) => {
  res.render("index", {
    title: "SpellSavvy",
    name: "Surjeet kaur",
  });
});


//spellcheck
const apiKey = '5e2Z44eUM3AXtnCtPtqwgypHLSSsZTLV'; 
app.get('/spellcheck', async (req, res) => {
  const text = req.query.text; // Get the query parameter from the request
  if (!text) {
    return res.status(400).send('Missing query parameter "text"');
  }

  const url = `https://api.apilayer.com/spell/spellchecker?q=${text}`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'apikey': apiKey
      }
    });
    const data = response.data;
    //console.log(data);
    //res.json(response.data); // Send the response data from the API
    const correctedText = replaceWithBestCandidate(data);// Now you have the response data from the API in 'data'
    res.json({correctedText});
    //console.log("corrected text:",correctedText); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// function to replace text with best candidate
function replaceWithBestCandidate(data) {
  let updatedText = data.original_text;

  data.corrections.forEach(correction => {
      const { text, best_candidate } = correction;
      updatedText = updatedText.replace(text, best_candidate);
  });
  return updatedText;
}

//about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    paraContent:"We believe that everyone deserves to express themselves with clarity and precision. That's why we've created a powerful spell checking tool that helps you identify and correct mistakes in real-time. Our team is dedicated to continuously improving our algorithm to ensure that you receive the most accurate results possible.",
    name: "Surjeet kaur",
  });
});

//help page
app.get("/help", (req, res) => {
  res.render("help", {
    helpContent: "Welcome to SpellSavvy! This page provides information on how to use the SpellSavvy tool to improve your writing.",
    title: "Help",
    gettingStarted:[
      'Enter your text in the input field',
      'Click the "Check Spelling" button',
      'Review the result with necessary corrections'
    ],
    tipsTricks:[
      'The SpellSavvy tool is great for proofreading your text before publishing or sharing it with others.',
      'If you have specific words or phrases that you want to ignore, you can add them to the ignore list.',
    ],
    name: "Surjeet kaur",
  });
});

//incase page does not exist
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Surjeet Kaur",
    errorMessage: "Page does not exist!",
  });
});



//port
app.listen(port,()=>{
 console.log("server started at port:"+ port);
});




/*
// spellcheck for input
  app.get('/spellcheck/',(req,res)=>{
  if(!req.query.text){
    console.log('req.query is empty!');
     return res.status(400).send({error: 'Please provide text for spellcheck!'});
  }
  const text = req.query.text;
  //console.log('text:',text);
    spellcheck(text, (error, data) => {
    if (error) {
    console.error('spellcheck API error', error);
    res.status(500).json({ error: 'Unable to check spelling due to API error' });
    } else {
      //console.log(data);
    const correctedText = replaceWithBestCandidate(data);// Now you have the response data from the API in 'data'
    res.json({correctedText});
    //console.log("corrected text:",correctedText);  
    }  
  });
  });

  */