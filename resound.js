var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var video, audio;

var videoURL = '9tG-xwv0kw0';
var musicURL =  'feA64wXhbjo';
var audioStartTime = 0;
var videoStartTime = 0;
var audioEndTime = 0;
var videoEndTime = 0;

function onYouTubePlayerAPIReady() {

    var parts = location.search.substring(1).split('&');
    var params = {};



    // extract possible "params" from the URL. It looks like a get request and walks like a
    //      get request but I'm really just reading strings....
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
            disablekb: 1
        },
        events: {
            'onReady': onAudioPlayerReady,
            'onStateChange': onAudioStateChange
        }
    });
}

function onVideoPlayerReady(event) {
    event.target.playVideo();
}

function onAudioPlayerReady(event) {
    event.target.playVideo();
}

function onAudioStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        audio.seekTo(audioStartTime);
        event.target.playVideo();
    }
}

// make the audio player act like the video player
function onVideoStateChange(event) {
    if (event.data == YT.PlayerState.PAUSED) {
        // this could also be mute. idk
        audio.pauseVideo();
    }
    if (event.data == YT.PlayerState.PLAYING) {
        // or unmute....
        audio.playVideo();
    }

    if (event.data == YT.PlayerState.ENDED) {
        audio.seekTo(audioStartTime);
        event.target.seekTo(videoStartTime);
        video.playVideo();
    }
}


// prevents the user from seeing anything below the main video player.
//      this is really hackish but the youtube iframe won't play audio
//      if the video isn't visible on the page        
window.onscroll = function () { window.scrollTo(0, 0); };

// favorites:
//  ?audiostart=20&video=cIwTYL1fwJk&videostart=20&videoend=40
