const express = require('express');
const bodyParser = require('body-parser');
const player = require('play-sound')();
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
const port = 5000;
const hash = '$2b$10$0kiBz9rbrq8OmXY22R9.AuHnJQHfghhAAEXobH8SXMAzy/DolEBPO';

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port,  function() {
    console.log('Diesel API now running on port: ' + port);
});

function playAudio(pass, filename) {
    bcrypt.compare(pass, hash, function(err, res) {
        if (res)
        {
            player.play(filename, (err) => {
                console.log('played test sound');
                if(err) console.log(`Could not play sound: ${err}`);
            });
        }
        else
        {
            console.log('Failed attempt logged.');
        }
    });
} 


app.post('/test', function(req, res){
    playAudio(req.body.pass, 'test.mp3');
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.put('/create-hash', function(req, res){
    bcrypt.hash(req.body.ww, 10, function(err, hash){
        res.send(hash);
    })
});