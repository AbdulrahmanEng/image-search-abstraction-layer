const express = require('express');
const gImages = require('google-images');
const env = require('dotenv').config().parsed;
const Datastore = require('nedb');

const app = express();

const client = new gImages(env.CSE_ID, env.API_KEY);

// Stores recent searches.
const searchDb = new Datastore({ filename: '.data/datafile', autoload: true });

searchDb.count({}, (err, count) => {
  if (err) {
    console.error(err);
  }
  console.log(`A total of ${count} searches have been made.`);
});

app.get('/', (req, res) => {
  const html = `
  <div style="font-family:sans-serif;">
    <h1>Image Search Abstraction Layer</h1>
    <h3>Example Search:</h3>
    <p>/search/microchip?page=1</p>
    <h3>Latest Searches:</h3>
    <p>/api/latest</p>
  <div`;
  res.send(html);
});

app.get('/search/:term', (req, res) => {
  const term = req.params.term;
  const page = req.query.page;
  
  // Define document.
  const doc = { term: term, when: new Date() };

  // Save search term to the database along with the time.
  searchDb.insert(doc, (err, newDoc) => {
    if (err) {
      console.error(err);
    }
    console.log('New document has been inserted:', newDoc);
  });
  client.search(term, { page: page || 1 }).then(images => {
    res.json(images);
  });
});

app.get('/api/latest', (req, res)=>{
  searchDb.find({}, (err, docs)=>{
    if(err){
      console.error(err);
    }
    if(docs){
      res.json(docs);
    } else {
      res.json({message:'No searches have been found.'})
    }
  });
  
});

app.get('/api/reset', (req, res)=>{
  searchDb.remove({}, {multi: true}, (err, numRemoved)=>{
    if(err){
      console.error(err);
    }
    console.log(`${numRemoved} documents have been removed`);
    res.redirect('/');
  });
});

const listener = app.listen(process.env.PORT, () => console.log(`Listening on port ${listener.address().port}`));