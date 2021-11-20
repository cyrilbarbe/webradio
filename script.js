var count = 0;
var audio = document.getElementById('audio');
var audioPlayPause = document.getElementById('audioPlayPause');
var audioStop = document.getElementById('audio');


// function pour lecture et pause
audioPlayPause.addEventListener('click', function(){
    if(count == 0){
        count= 1;
        audio.play();
        audioPlayPause.innerHTML = "<i class='fa fa-pause'></i>";
    }
    else{
        count= 0;
        audio.pause();
        audioPlayPause.innerHTML = "<i class='fa fa-play'></i>";
    }
})
//la function stop sera similaire
audioStop.addEventListener('click',function(){
    count= 0;
    audio.pause();
    audio.currentTime = 0;
    audioPlayPause.innerHTML = "<i class='fa fa-pause'></i>";
    audioPlayPause.className = "";
    audioStop.className = "";
    document.getElementById('audioStop').innerHTML = "&nbsp;"
})

// Partie Playlist Attention de bien utiliser le query selector all
var audioList = document.querySelectorAll('.aTrigger');
audioList.forEach(function(audioSingle, index){
    // Traitement des noms affichés affichera les derniers caractere du lien URL 
    
    var dataAudioName = audioSingle.getAttribute("data-audio");
    var audioName = dataAudioName.substring(dataAudioName.lastIndexOf("/") + 1, dataAudioName.length);

    // Ma liste 
    audioList[index].nextElementSibling.innerHTML = audioName;
    audioSingle.addEventListener('click',function(index){
        thisisAudioSingle = this;
        // Status active lumineux
        audioPlayPause.className = "active";
        audioStop.className = "active";
        var dataAudio = this.getAttribute('data-audio');
        var dataActive = this.getAttribute('data-active');
        var audioSource = document.getElementById("audioSource");
        audioSource.src = dataAudio;
 
        // audio.load();
        // audio.play();
        for (var i= 0; i < audioList.length; i++){
            audioList[i].innerHTML = "<i class='fa fa-play'></i>";
            audioList[i].setAttribute("data-active", "");
        }
        if(dataActive == "" ){
            count = 1;
            audio.load();
            audio.play();
            this.setAttribute("data-active", "active");
            audioPlayPause.innerHTML = "<i class='fa fa-pause'></i>";
        }
        else if(dataActive == "pause"){
            count = 1;
            audio.play();
            this.setAttribute("data-active", "active");
            audioPlayPause.innerHTML = "<i class='fa fa-pause'></i>";
        }else{
            count = 0;
            audio.pause();
            this.setAttribute("data-active", "pause");
            audioPlayPause.innerHTML = "<i class='fa fa-play'></i>";
        }

        
    })
})