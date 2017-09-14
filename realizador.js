var vid1, vid2, vid3;
var vidTimeInterval;

// Función de inicialización de variables
function init(){;
    changeVideo();
    var sampler = document.getElementById("sampler");
    var begin = document.getElementById("begin");
    var end = document.getElementById("end");
    begin.addEventListener("click", function() {samplerInit(undefined);},false);
    end.addEventListener("click", function() {samplerInit(undefined);},false);
}

// Constructor de Objetos Vïdeo.
function Video() {
    this.vid = document.getElementById("mainVideo");
    this.vid.muted = true;

    this.play = function() {
        this.vid.play();
    }
    this.stop = function() {
        this.vid.stop();
    }
}

var video = new Video();

// Función para cambair entre vídeos
function changeVideo(){
    var timing;
    var btn1 = document.getElementById("vid1");
    var btn2 = document.getElementById("vid2");
    var btn3 = document.getElementById("vid3");
    vid1 = document.getElementById("myVideo1");
    vid2 = document.getElementById("myVideo2");
    vid3 = document.getElementById("myVideo3");

    // Añado un manejador para controlar el audio cuando se mueva el ratón sobre el vídeo
    vid1.addEventListener("mouseover", function() {mouseoverHandler(vid1);},false);
    vid1.addEventListener("mouseout", function() {mouseoutHandler(vid1);},false);
    vid2.addEventListener("mouseover", function() {mouseoverHandler(vid2);},false);
    vid2.addEventListener("mouseout", function() {mouseoutHandler(vid2);},false);
    vid3.addEventListener("mouseover", function() {mouseoverHandler(vid3);},false);
    vid3.addEventListener("mouseout", function() {mouseoutHandler(vid3);},false);

    // Para cuando se escoge la fuente 1.
    btn1.onclick = function() {
        video.vid.src = vid1.src;             // Asociamos las fuentes
        timing = vid1.currentTime;            // Registro el instante de reproducción
        video.vid.currentTime = timing;       // Comienzo a reproducir en el vídeo principal desde el instante anterior registrado
        video.vid.autoplay = true; 
        vid1.style = "border: 3px solid orange"; // Recuadro la fuente seleccionada
        vid2.style = "border: 0px";
        vid3.style = "border: 0px";
        samplerInit(vid1);                       // Inicializo el sampler
        clearInterval(vidTimeInterval);          // Borro el itervalo que lleva reloj digital y lo restablezco
        vidTimeInterval = setInterval(videoTime, 1000, vid1);
    }
    // Para cuando se escoge la fuente 2.
    btn2.onclick = function() {
        video.vid.src = vid2.src;
        timing = vid2.currentTime;
        video.vid.currentTime = timing;
        video.vid.autoplay = true;
        vid2.style = "border: 3px solid orange";
        vid1.style = "border: 0px";
        vid3.style = "border: 0px";
        samplerInit(vid2);
        clearInterval(vidTimeInterval);
        vidTimeInterval = setInterval(videoTime, 1000, vid2);
    }
    // Para cuando se escoge la fuente 3.
    btn3.onclick = function() {
        video.vid.src = vid3.src;
        timing = vid3.currentTime;
        video.vid.currentTime = timing;
        video.vid.autoplay = true;
        vid3.style = "border: 3px solid orange";
        vid1.style = "border: 0px";
        vid2.style = "border: 0px";
        samplerInit(vid3);
        clearInterval(vidTimeInterval);
        vidTimeInterval = setInterval(videoTime, 1000, vid3);
    }
}

// Función que inicializa el sampler
function samplerInit(vid) {
  if (vid==undefined)
  {
    // Identifico la fuente actual
    vid = document.getElementById("mainVideo").src;
    if (vid == "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4") {vid = vid2}
    else if (vid == "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4") {vid = vid1}
    else {vid = vid3}
  }
  // Establezco los límites del sampler en base a la longitud del vídeo
  var sampler = document.getElementById("sampler");
  var begin = document.getElementById("begin");
  var end = document.getElementById("end");
  var b = 0;
  var e = vid.duration;
  begin.min = b; begin.max = e;
  end.min = b; end.max = e;
  var beginp = document.getElementById("beginp");
  var endp = document.getElementById("endp");
  // muestro los límites
  beginp.innerHTML = begin.value;
  endp.innerHTML = end.value;
}

// Función que establece bucles
function loopEstablishment() {
    // Guardo los valores introducidos por el usuario
    iterations = document.getElementById("iterations").value;
    var begin = document.getElementById("begin").value;
    var end = document.getElementById("end").value;
    var vid = document.getElementById("mainVideo");
    
    // Preparo la llamada al bucle
    for (i=0; i<iterations; i++) {
        setTimeout(loop,((end-begin)+1)*1000*i, vid.src, begin);
    }
    // Vuelvo a iniciar el reloj digital
    clearInterval(vidTimeInterval);
    vidTimeInterval = setInterval(videoTime, 1000, vid);
    
}

// Función que lleva a cabo los bucles
function loop(vid, begin) {
     var main = document.getElementById("mainVideo");
     // Establezco el inicio de reproducción
     if (main.src==vid)
     {
        main.currentTime = begin;
     }
     // Establezco el bucle también en la miniatura del vídeo
     if (vid == "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4") {min_vid = vid2}
     else if (vid == "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4") {min_vid = vid1}
     else {min_vidvid = vid3}
     min_vid.currentTime = begin;
    
}

// Función manejadora del evento "mover el ratón"
function mouseoverHandler(secuence) {
    // Activo el audio de la secuencia
    secuence.muted = false;
}

function mouseoutHandler(secuence) {
    // Desactivo el audio
    secuence.muted = true;
}

// Función que controla el reloj digital
function videoTime(vid) {
    var timing = vid.currentTime;
    var clock = Math.floor(timing/3600) + " : " + Math.floor(timing/60) +  " : " + Math.floor(timing-(Math.floor(timing/60)*60));
    document.getElementById("timing").innerHTML = clock;
}

// Constructor de audios
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.setAttribute("loop","true");
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
        document.getElementById("audio").onclick = audioPlay;
        document.getElementById("audio").innerHTML = "Press to Add Audio";
    }
}

// Funcón que añade audio
function audioPlay(){
    console.log("musica");
    fastmotionAudio = new Sound("fastmotionmusic.mp3");
    fastmotionAudio.play();

    document.getElementById("audio").onclick = function (){fastmotionAudio.stop();}
    document.getElementById("audio").innerHTML = "Press to Stop Audio";
    
}
