
var MediaStreamRecorder = require('msr');
 
//console.log('require-msr', MediaStreamRecorder);

 
var recorder = new MediaStreamRecorder({});
//console.log('MediaStreamRecorder', recorder);
 

var multiStreamRecorder = new MediaStreamRecorder.MultiStreamRecorder({});
//console.log('MultiStreamRecorder', multiStreamRecorder);



function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
  }

  var mediaConstraints = {
    audio: true
  };

  function startRecording(idx) {
    $('#start-recording').disabled = true;
    audiosContainer = document.getElementById('audios-container');
    captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
  };

  function stopRecording() {
    $('#stop-recording').disabled = true;
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
    $('.start-recording').disabled = false;
  };

  var mediaRecorder;

  function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'audio/wav';
    mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function(blob) {
      $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");
      console.log("vhjsx");
    };

    var timeInterval = 360 * 1000;

    mediaRecorder.start(timeInterval);

    $('#stop-recording').disabled = false;
  }

  function onMediaError(e) {
    console.error('media error', e);
  }

  function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

  function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
  }

  window.onbeforeunload = function() {
    $('#start-recording').disabled = false;
  };
