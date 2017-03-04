var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: 'b85b1bea-7908-4517-a8f1-d4000d678074',
  password: 'UCyx7fLGWMTK'
});

var params = {
  
  audio: fs.createReadStream('./sound2.wav'),
  content_type: 'audio/wav'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});


fs.createReadStream('./sound2.wav')
  .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/wav' }))
  .pipe(fs.createWriteStream('./sss.txt'));