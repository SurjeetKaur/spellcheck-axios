//const request = require('postman-request'); 
//const axios=require ("axios");

const apiKey = '5e2Z44eUM3AXtnCtPtqwgypHLSSsZTLV'; 

const makeSpellCheckRequest = (text, callback) => {
  const url = `https://api.apilayer.com/spell/spellchecker?q=${text}`;
  const options = {
    url,
    headers: {
      'apikey': apiKey
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(`API Error: ${response.statusCode}`, null);
    } else {
      callback(null, JSON.parse(body));
    }
  });
};

module.exports = makeSpellCheckRequest;
