var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var alchemy_language = new AlchemyLanguageV1({
  "url": "https://gateway-a.watsonplatform.net/calls",
  "note": "It may take up to 5 minutes for this key to become active",
  "apikey": "fbd50480e96d28fe48ef2587fd5e2714521bba8a"
});

var params = {
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

alchemy_language.sentiment(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else {
      console.log(JSON.stringify(response, null, 2));
      //console.log(response);
      var docSentiment = response.docSentiment;

      console.log(docSentiment);
  }
    
});

/*


var AlchemyDataNewsV1 = require('watson-developer-cloud/alchemy-data-news/v1');

var alchemy_data_news = new AlchemyDataNewsV1({
  "url": "https://gateway-a.watsonplatform.net/calls",
  "note": "It may take up to 5 minutes for this key to become active",
  "apikey": "fbd50480e96d28fe48ef2587fd5e2714521bba8a"
});

var params = {
  start: 'now-1d',
  end: 'now'
};

/*alchemy_data_news.getNews(params, function (err, news) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(news, null, 2));
});*/

/*var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  "url": "https://gateway.watsonplatform.net/conversation/api",
  "password": "Dz0yUQm6aN02",
  "username": "1f7b7d31-dfce-49b6-bdbf-b360db852a38",
  "version_date": 2016-07-11
});

conversation.message({
  input: { text: 'What\'s the weather?' },
  workspace_id: 'wgchatbot'
 }, function(err, response) {
     if (err) {
       console.error(err);
     } else {
       console.log(JSON.stringify(response, null, 2));
     }
});*/


var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  "password": "kMDLTnaMLDqX",
  "username": "832918e4-881f-4490-bc95-04e19bdcba71"
});

/*language_translator.translate({
  text: 'A sentence must have a verb', source : 'en', target: 'es' },
  function (err, translation) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(translation, null, 2));
});

language_translator.identify({
  text: 'The language translator service takes text input and identifies the language used.' },
  function (err, language) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(language, null, 2));
});*/

/*exports.alchemy_language = alchemy_language;
exports.alchemy_data_news = alchemy_data_news;
//exports.conversation = conversation;
exports.language_translator = language_translator;
*/