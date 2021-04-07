"use strict";
const musicArray=[
  {
    title:"Angels like you",
    artist:"Miley Cyprus",
    url:"./songs/angels-like-you.mp3",
    cover:"./images/alan-walker.jpeg"
  },{
    title:"Alone",
    artist:"Alan walker",
    url:"./songs/alone.mp3",
    cover:"./images/alan-walker.jpeg"
  },{
    title:"Ah blem blem",
    artist:"Timaya",
    url:"./songs/ah-blem-blem.mp3",
    cover:"./images/timaya.jpeg"
  },
    {
    title:"Sing me to sleep",
    artist:"Alan walker",
    url:"./songs/sing-me-to-sleep.mp3",
    cover:"./images/alan-walker.jpeg"
  },
    {
    title:"A better place to live",
    artist:"dolly parton",
    url:"./songs/a-better-place-to-live.mp3",
    cover:"./images/dolly-parton.jpeg"
  }, {
    title:"You can't reach me anymore ",
    artist:"dolly parton",
    url:"./songs/you-cant-reach-me-anymore.mp3",
    cover:"./images/dolly-parton.jpeg"
  }
  ];
const state={
  counter:0,
  repeat:false,
  random:0,
  randomize:false,
   mouseX:undefined,
   mouseY:undefined,
}

const zplayer=document.querySelector("#zplayer");
const zplayerVisualizerCon=zplayer.querySelector(".zplayer__visualizer");
const zplayerTabBtnsCon=zplayer.querySelector(".zplayer__tabs-btn-container");
const zplayerTabsCon=zplayer.querySelector(".zplayer__tabs-container");
const zplayerTabBtns=Array.from(zplayerTabBtnsCon.querySelectorAll(".zplayer__tabs-btn"));
const zplayerTabs=Array.from(zplayerTabsCon.querySelectorAll(".zplayer__tabs"));
const zplayerTabsInnerSlide=zplayer.querySelector(".zplayer__tabs-inner-slide");
const zplayerSongs=zplayer.querySelector(".zplayer__songs");
const zplayerAudioPlayer=new Audio();
zplayerAudioPlayer.preload="metadata";
const zplayerPlayPauseBtn=zplayer.querySelector(".zplayer__player-play-pause-btn");
const zplayerPlayerTimeElapsed=zplayer.querySelector(".zplayer__player-time-elapsed");
const zplayerPlayerDuration=zplayer.querySelector(".zplayer__player-duration");
const zplayerPlayerSlider=zplayer.querySelector(".zplayer__player-slider");
const zplayerPlayerNextBtn=zplayer.querySelector(".zplayer__player-next-btn");
const zplayerPlayerPrevBtn=zplayer.querySelector(".zplayer__player-prev-btn");
const zplayerPlayerRepeatBtn=zplayer.querySelector(".zplayer__player-repeat-btn");
const zplayerPlayerShuffleBtn=zplayer.querySelector(".zplayer__player-shuffle-btn");
const zplayerHeaderText=zplayer.querySelector(".zplayer__header-text");
const zplayerPlayerImage=zplayer.querySelector(".zplayer__player-image");
const zplayerPlayerMinimizedImage=zplayer.querySelector(".zplayer__player-minimized-image");
const zplayerMinimizeBtn=zplayer.querySelector(".zplayer__drop-down-btn");
const canvas=document.createElement("canvas");
let ctx=canvas.getContext("2d");
zplayerVisualizerCon.appendChild(canvas);
canvas.width=zplayerVisualizerCon.offsetWidth;
canvas.height=zplayerVisualizerCon.offsetHeight;

// zplayer minimize event
eventHandler(zplayerMinimizeBtn,"click",function(){
    let selected=state.randomize ? state.random : state.counter;
  zplayer.classList.toggle("minimized");
zplayer.classList.contains("minimized") ? titleChange(this,"maximize player") : titleChange(this,"minimize player");
setPlayerImage(selected);
  
});
// Tabs function 
for (let i = 0; i < zplayerTabBtns.length; i++) {
  eventHandler(zplayerTabBtns[i],"click",tabBtnFunc(i));
  
}

function tabBtnFunc(i){
  return function(){
    classNameRemove(zplayerTabBtnsCon.querySelector(".active"),"active");
    classNameAdd(zplayerTabBtns[i],"active");
    classNameRemove(zplayerTabsCon.querySelector(".active"),"active");
    classNameAdd(zplayerTabs[i],"active");
  }
}

musicArray.map((music)=>{
  zplayerSongs.innerHTML+=`  <li class="zplayer__single-song" >
          <img src=${music.cover} alt=${music.title} class="zplayer__single-song-image" />
         <div class="zplayer__single-song-inner">
            <span class="zplayer__single-song-title">${music.title}</span>
          <span class="zplayer__single-song-artist">
            ${music.artist}
          </span>
         </div><!-- zplayer__single-song-inner   -->
        </li><!--    zplayer__single-song  -->`;
}).join("");
const zplayerSingleSongs=Array.from(zplayer.querySelectorAll(".zplayer__single-song"));

zplayerSingleSongs.map((zplayerSingleSong,index)=>{
  zplayerSingleSong.addEventListener("click",function(e){
    const clickTarget=e.target;
    
    if(clickTarget.parentElement.tagName === "LI" || clickTarget.tagName === "LI"){
 classNameRemove(zplayer.querySelector(".playing"),"playing");
   classNameAdd(this,"playing");
    }

 let selected=index;
    zplayerAudioPlayer.src=musicArray[selected].url;
   setHeaderText(selected);
     setPlayerImage(selected);
    zplayerAudioPlayer.play();
  });
});
/*_Uncomment the following lines below to make the player draggable.*/
// eventHandler(zplayer,"touchmove",function(e){
//   state.mouseX=e.targetTouches[0].clientX;
//   state.mouseY=e.targetTouches[0].clientY;

//   if(zplayer.offsetTop + zplayer.offsetHeight > window.innerHeight || (window.innerHeight/(zplayer.offsetHeight - zplayer.offsetTop) ) < 0){
//   return
//   }
//     if(zplayer.offsetLeft + zplayer.offsetWidth > window.innerWidth || (window.innerWidth/(zplayer.offsetHeight - zplayer.offsetTop) ) < 0){
//         return
//   }
//   zplayer.style.top=`${state.mouseY}px`;
//   zplayer.style.left=`${state.mouseX}px`;
//   });

eventHandler(window,"DOMContentLoaded",initialize_ZPlayer);
function initialize_ZPlayer(){
  let selected=state.randomize ? state.random : state.counter;
  setHeaderText(selected);
  setPlayerImage(selected);
  zplayerAudioPlayer.src=musicArray[selected].url;
classNameAdd(zplayerSingleSongs[selected],"playing");
}

function nextSong(){
  let selected;
  if(!state.randomize){
    state.counter++;
  state.counter >= musicArray.length ?
    state.counter=0:"";
  selected=state.counter;
}
else if(state.randomize){
  randomNumber();
  selected=state.random;
}
  chooseNextSong(selected);
  classNameAdd(zplayerPlayerNextBtn,"clickEffect");
  classNameRemove(zplayerPlayerNextBtn,"clickEffect",300,);
}
function previousSong(){
  let selected;
if(!state.randomize){
    state.counter--;
  state.counter < 0?
    state.counter=musicArray.length-1:"";
  selected=state.counter;
}
else if(state.randomize){
  randomNumber();
  selected=state.random;
}
  chooseNextSong(selected);
    classNameAdd(zplayerPlayerPrevBtn,"clickEffect");
  classNameRemove(zplayerPlayerPrevBtn,"clickEffect",300,);
}
function sliderFunc(e){
  
  zplayerAudioPlayer.currentTime=e.target.value;
    const percent=Math.floor((100/zplayerAudioPlayer.duration)*zplayerAudioPlayer.currentTime);
  const bgColor=`linear-gradient(90deg,#7b8 ${percent}%,#fff6 ${percent}%)`;
  zplayerPlayerSlider.style.background=bgColor;
}
eventHandler(zplayerAudioPlayer,"ended",function(){
  let selected=state.randomize? state.random : state.counter;
  if(!state.randomize){
    state.counter++;
  state.counter >= musicArray.length?
    state.counter=0:"";
  chooseNextSong(selected);
    if(!state.randomize && state.repeat){
  repeatAllSongs();
chooseNextSong(selected);
  
  }

}
else if(state.randomize){
  randomNumber();
  chooseNextSong(selected);
   if(state.repeat){
  repeatAllSongs();
chooseNextSong(selected);
  
}
}


});

function chooseNextSong(selected){
    zplayerAudioPlayer.src=musicArray[selected].url;
 setHeaderText(selected);
 setPlayerImage(selected);
  zplayerAudioPlayer.load();
  console.log(zplayerAudioPlayer);
  zplayerAudioPlayer.play();
  classNameRemove(zplayer.querySelector(".playing"),"playing");
  classNameAdd(zplayerSingleSongs[selected],"playing");
}
eventHandler(zplayerPlayerShuffleBtn,"click",shuffleSongs);
function shuffleSongs(){
  if(!state.randomize){
    state.randomize=true;

  classNameAdd(zplayerPlayerShuffleBtn,"shuffled");
  }
  else{
    state.randomize=false;
     classNameRemove(zplayerPlayerShuffleBtn,"shuffled"); 
  }
  
  
}
function randomNumber(){
    state.random =Math.floor(Math.random() * musicArray.length);
}
eventHandler(zplayerPlayerRepeatBtn,"click",repeatSong);
function repeatSong(e){
  
  let looper=zplayerAudioPlayer.loop;
  if(!looper && e.target.className.trim() ==="zplayer__player-repeat-btn"){
    zplayerAudioPlayer.loop=true;
  classNameChange(zplayerPlayerRepeatBtn,"zplayer__player-repeat-btn repeat-one");

  }
  else if(looper){
      classNameChange(zplayerPlayerRepeatBtn,"zplayer__player-repeat-btn repeat-all");
        state.repeat=true;
    zplayerAudioPlayer.loop=false;
  } 
  else{
    state.repeat=false
    zplayerAudioPlayer.loop=false;
    classNameChange(zplayerPlayerRepeatBtn,"zplayer__player-repeat-btn")
  }
  
}
function repeatAllSongs(){
  state.counter++;
      if(state.counter >= musicArray.length){
    state.counter=0;
  }
}

eventHandler(zplayerAudioPlayer,"play",function(){
        titleChange(zplayerPlayPauseBtn,"pause");
  classNameAdd(zplayerPlayPauseBtn,"paused");
//   initVisualizer();
  
});
eventHandler(zplayerAudioPlayer,"pause",function(){
   titleChange(zplayerPlayPauseBtn,"play");
  classNameRemove(zplayerPlayPauseBtn,"paused");
  
});

eventHandler(zplayerPlayPauseBtn,"click",function(){
  if(zplayerAudioPlayer.paused){
    classNameAdd(this,"paused");
      titleChange(this,"pause");
    zplayerAudioPlayer.play();
  }
  else{
       classNameRemove(this,"paused");
       titleChange(this,"play");
    zplayerAudioPlayer.pause();
  }
    classNameAdd(this,"clickEffect",0);
  classNameRemove(this,"clickEffect",300,);
  });
  eventHandler(zplayerAudioPlayer,"loadedmetadata",function(){
    
    const audioDuration=Math.round(zplayerAudioPlayer.duration);
    const time=formatTime(audioDuration);
      zplayerPlayerSlider.setAttribute("max",zplayerAudioPlayer.duration);
updateDuration(time);
    
  });

function classNameChange(el,className){
  el.className=className;
}
function titleChange(el,title){
  el.title=title;
}
  eventHandler(zplayerAudioPlayer,"timeupdate",updateTimePlayed);
function updateTimePlayed(){
    const audioTimeElasped=Math.round(zplayerAudioPlayer.currentTime);
    setSliderValue(audioTimeElasped);
    const time=formatTime(audioTimeElasped);
if(time.minutes >= 60){
      zplayerPlayerTimeElapsed.textContent=`${time.hours}:${time.minutes}:${time.seconds}`;
}
else{
      zplayerPlayerTimeElapsed.textContent=`${time.minutes}:${time.seconds}`
}
const timeLeft=formatTime(Math.round(zplayerAudioPlayer.duration- zplayerAudioPlayer.currentTime || 0));
  updateDuration(timeLeft);
}

eventHandler(zplayerPlayerNextBtn,"click",nextSong);
eventHandler(zplayerPlayerPrevBtn,"click",previousSong);
eventHandler(zplayerPlayerSlider,"change",sliderFunc);
eventHandler(zplayerPlayerSlider,"input",sliderFunc);
eventHandler(zplayerPlayerSlider,"mousemove",sliderFunc);
function updateDuration(time){
  if(time.minutes >= 60){
      zplayerPlayerDuration.textContent=`-${time.hours}:${time.minutes}:${time.seconds}`;
}
else{
      zplayerPlayerDuration.textContent=`-${time.minutes}:${time.seconds}`;
}
}
function setSliderValue(value){
  zplayerPlayerSlider.value=value;
  const percent=Math.floor((100/zplayerAudioPlayer.duration)*zplayerAudioPlayer.currentTime)
  const bgColor=`linear-gradient(90deg,#7b8 ${percent}%,#fff6 ${percent}%)`;
  zplayerPlayerSlider.style.background=bgColor;
}
function setHeaderText(selected){
 zplayerHeaderText.textContent=`${musicArray[selected].artist} - ${musicArray[selected].title}`;
}
function setPlayerImage(selected){
if(zplayer.classList.contains("minimized")){
    zplayerPlayerMinimizedImage.src=musicArray[selected].cover;
}
  zplayerPlayerImage.src=musicArray[selected].cover;
}
function classNameRemove(el,className,dur){
  dur=dur || 0;
  return setTimeout(function() {
    el.classList.remove(className);
  },dur);
}
function classNameAdd(el,className,dur){
    dur=dur || 0;
  return setTimeout(function() {
    el.classList.add(className);
  },dur);
}

function formatTime(timeInSeconds){
const time=new Date(timeInSeconds * 1000).toISOString().substr(11,8);
  return {
    hours:time.substr(0,2),
    minutes:time.substr(3,2),
    seconds:time.substr(6,2)
  }

}
function eventHandler(el,evt,func){
  return  el.addEventListener(evt,func)
}
const AudioCtx=window.AudioContext || window.webkitAudioContext;
const audioCtx=new AudioCtx();
let audioSource,analyser;
    audioSource=audioCtx.createMediaElementSource(zplayerAudioPlayer);
function initVisualizer(){

  analyser=audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize=256;
  let bufferLength=analyser.frequencyBinCount;
  let dataArray=new Uint8Array(bufferLength);
  let barWidth=canvas.width/bufferLength;
  let barHeight,x=0;
  function animate(){
    x=0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    analyser.getByteFrequencyData(dataArray);
     drawVisualizer(bufferLength,x,barHeight,barWidth,dataArray);
    requestAnimationFrame(animate)
  }
  animate();
}
function drawVisualizer(bufferLength,x,barHeight,barWidth,dataArray){
     for( let i=0;i < bufferLength;i++) {
      barHeight=dataArray[i] * 0.7;
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate(i * Math.PI * 4/ bufferLength);
  let hue=i * barHeight/2;
      ctx.fillStyle=`hsl(${hue},100%,50%)`;
      ctx.fillRect(0,0,barWidth,barHeight);
      x+=barWidth;
    ctx.restore();
    } 
}
