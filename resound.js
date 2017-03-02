// Load the IFrame Player API code asynchronously.

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var video, audio;

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

    if (params.video) {
        videoURL = params.video;
    }

    if (params.audio) {
        musicURL = params.audio;
    }

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
            start:0,
            //end: 100,
            rel: 0,
            autoplay: 1,
            showinfo: 0,
            disablekb: 0,
            mute: 1
        },
        events: {
            'onReady': onPlayerReady
        }
        
    });

    
    audio = new YT.Player('ytplayer-audio', {
        videoId: musicURL,
        playerVars: {
            enablejsapi: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            controls: 0,
            start:5,
            rel: 0,     
            autoplay: 1,
            showinfo: 0,
            disablekb: 1
        }

    });

    video.addEventListener("onStateChange", "onVideoStateChange");
    audio.addEventListener("onStateChange", "onAudioStateChange");

}

function onPlayerReady(event) {
    video.mute();
}


function onAudioStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        event.target.seekTo(5);
        event.target.playVideo();
    }
}

function onVideoStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        for (var i = 100; i >= 0; i -= 5) {
            audio.setVolume(i);
            sleep(400);
        }
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while (true) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

window.onscroll = function () { window.scrollTo(0, 0); };


