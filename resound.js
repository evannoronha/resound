// Load the IFrame Player API code asynchronously.

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var video, audio;
var audioStartTime = 0;
var videoStartTime = 0;
var audioEndTime = 0;
var videoEndTime = 0;

function onYouTubePlayerAPIReady() {

    var parts = location.search.substring(1).split('&');
    var params = {};


    var videoURL = 'RpkM9bDJrxA';
    var musicURL =  'feA64wXhbjo';

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }

    videoURL = params.video || videoURL;
    musicURL = params.audio || musicURL;
    audioStartTime = params.audiostart || audioStartTime;
    audioEndTime = params.audioend || audioEndTime;
    videoStartTime = params.videostart || videoStartTime;
    videoEndTime = params.videoend || videoEndTime;

    console.log(params);

    video = new YT.Player('ytplayer-video', {
        videoId: videoURL,
        height: "100%",
        width: "100%",
        playerVars: {
            enablejsapi: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            controls: 0,
            start:videoStartTime,
            end: videoEndTime,
            rel: 0,
            autoplay: 1,
            showinfo: 0,
            disablekb: 0,
            mute: 1
        },
        events: {
            'onReady': onVideoPlayerReady,
            'onStateChange': onVideoStateChange

        }
        
    });

    
    audio = new YT.Player('ytplayer-audio', {
        videoId: musicURL,
        playerVars: {
            enablejsapi: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            controls: 0,
            start:audioStartTime,
            end:audioEndTime,
            rel: 0,     
            autoplay: 1,
            showinfo: 0,
            disablekb: 1,
            events: {
                'onReady': onAudioPlayerReady,
                'onStateChange': onAudioStateChange
            }
        }
    });
}

function onVideoPlayerReady(event) {
    video.mute();
}

// I'm having some problems adding functions to the plater objects. neither of these work.
function onAudioPlayerReady(event) {
    audio.fadeOut = new function() {
        for (var i = 100; i >= 0; i -= 5) {
            audio.setVolume(i);
            sleep(400);
        }
    }

    audio.fadeIn = new function() {
        for (var i = 0; i <= 100; i += 5) {
            audio.setVolume(i);
            sleep(400);
        }
    }    
}


function onAudioStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        event.target.seekTo(AUDIO_START_TIME);
        event.target.playVideo();
    }
}

function onVideoStateChange(event) {
    if (event.data == YT.PlayerState.PAUSED) {
        // this could also be pause. idk
        audio.mute();
    }
    if (event.data == YT.PlayerState.PLAYING) {
        // or unpause....
        audio.unMute();
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) - milliseconds < 0);
}

window.onscroll = function () { window.scrollTo(0, 0); };


