
// Declaration Lecteur Radio et ses controlleurs
var count = 0;
var audio = document.getElementById('audio');
var audioPlayPause = document.getElementById('audioPlayPause');
var audioStop = document.getElementById('audio');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');

// Declaration pour le Visualiseur
//Web audio API. On utiliser audio contexte

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.getElementById('audio');
const canvasElement = document.querySelector('canvas');
const canvasCtx = canvasElement.getContext('2d');

const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;

// source
const source = audioCtx.createMediaElementSource(audioElement);
//analyser node
const analyser = audioCtx.createAnalyser();
analyser.fftSize= 256;

// on connecte la source a l'analyser
source.connect(analyser);
// destination c'est les speakers
analyser.connect(audioCtx.destination);


//variable pour le spectre de frequence audio
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);






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


// Partie Playlist Attention de bien utiliser le query selector all
var audioList = document.querySelectorAll('.aTrigger');

audioList.forEach(function(audioSingle, index){
  
    // Traitement des noms affichés affichera les derniers caractere du lien URL 
    //en recuperant data au
    
    /*Version 2: Essaie de remplacement tu titre*/
    // var dataAudioName = audioSingle.getAttribute("data-audio");
    // var audioName = dataAudioName.replace(dataAudioName,'h');


    /* Version 1: Affichage URL en toute lettre */
    var dataAudioName = audioSingle.getAttribute("data-audio");
    var audioName = dataAudioName.substring(dataAudioName.lastIndexOf("/") + 1, dataAudioName.length);   
    
    
  
    // Ma liste 
    // audioList[index].nextElementSibling.innerHTML = (audioName); affiche la liste des nom de station radio 
  
    audioSingle.addEventListener('click',function(index){
        thisisAudioSingle = this;
        // Status active lumineux
        audioPlayPause.className = "active";
        var dataAudio = this.getAttribute('data-audio');
        console.log(dataAudio);
        var dataActive = this.getAttribute('data-active');
        var audioSource = document.getElementById("audioSource");
        audioSource.src = dataAudio;
        switch(dataAudio){
            case 'http://listen.radioking.com/radio/8916/stream/19088':
                audioName = 'Tropique FM <i class="far fa-plus-square"></i>'
             break
             case 'http://freedomice.streamakaci.com/freedom.mp3':
                audioName = 'Radio Freedom <i class="far fa-plus-square"></i>'
                break
            case 'http://cdn.nrjaudio.fm/adwz1/fr_an/55248/mp3_128.mp3':
                 audioName = 'NRJ <i class="far fa-plus-square"></i>'
                 break

        }
     
        document.getElementById('audioTitle').innerHTML = audioName;

     
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

//mute sound function
function mute_sound(){
	audio.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	audio.volume = recent_volume.value / 100;
}


// fonction toggle 
let audioPlaylistWrap = document.getElementById('audioPlaylistWrap');
let boiteToggle = document.getElementById('audioTitle');

boiteToggle.addEventListener('click', () =>{
    if(audioPlaylistWrap.style.display === 'none'){
        audioPlaylistWrap.style.display = 'block';
    }
    else{
        audioPlaylistWrap.style.display = 'none';
    }
})


// Visualiseur audio
/*Le but extraire les données audio pour les connecter a notre canvas en HTML  */
// fonction de dessin sur canvas


function draw() {
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2.8;
        canvasCtx.fillStyle = `rgb(250,240, 255)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }

    requestAnimationFrame(draw);
}
draw();
