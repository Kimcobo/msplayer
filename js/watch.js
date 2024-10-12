const musicApp=document.querySelector('.player')
const musicAudio=musicApp.querySelector('#main_audio');
const playBtn=musicApp.querySelector('#musicBtn');
let list_index=0;
//--------------------------------------------------
const albumImg=musicApp.querySelector('.backgroundImage>img');
const musicName=musicApp.querySelector('.name');
const musicArtist=musicApp.querySelector('.artist');
const playTime=musicApp.querySelector('.currentTime');
const progressive=musicApp.querySelector('.progress');
const progressBar=musicApp.querySelector('.bar');
const prevBtn=musicApp.querySelector('#prevBtn');
const nextBtn=musicApp.querySelector('#nextBtn');
const repeatBtn=musicApp.querySelector('#repeatBtn');
const listBtn=musicApp.querySelector('#listBtn');
const volumeBtn=musicApp.querySelector('#volumeBtn');
//--------------------------------------------------
const loadMusic=(num)=>{
    musicAudio.src=`songs/${musicList[num].audio}.mp3`;
    albumImg.src=`images/${musicList[num].img}.jpg`;
    musicName.innerHTML=musicList[num].name;
    musicArtist.innerHTML=musicList[num].artist;
}
loadMusic(list_index);
const musicPlay=()=>{
    progressBar.style.visibility='visible';
    playBtn.innerHTML="pause";
    musicAudio.play();
    // listClassActive(); // 테스트 개선 사항
}
const musicPause=()=>{
    playBtn.innerHTML="play_arrow";
    musicAudio.pause();
}
const prevMusic=()=>{
    list_index--;
    if(list_index<0){
        list_index=musicList.length-1;
    }
    loadMusic(list_index);
    musicPlay();
}
const nextMusic=()=>{
    list_index++;
    if(list_index>=musicList.length){
        list_index=0;
    }
    loadMusic(list_index);
    musicPlay();
}
playBtn.addEventListener('click',()=>{
    if(playBtn.innerHTML=="play_arrow"){
        musicPlay();
    }else{
        musicPause();
    }
    /* listClassActive(); // 테스트 개선 사항 */
});
prevBtn.addEventListener('click',()=>{
    prevMusic();
});
nextBtn.addEventListener('click',()=>{
    nextMusic();
});

const RADIUS=60;
const CIRCUMFERENCE=2*Math.PI*RADIUS;

musicAudio.addEventListener('timeupdate',(e)=>{
    let current=e.target.currentTime;
    let duration=e.target.duration;
    let progressRatio=(current/duration)*100;
    function progress(per) {
        const progress = per / 100;
        const dashoffset = CIRCUMFERENCE * (1 - progress);
        progressBar.style.strokeDashoffset = dashoffset;
    }
    progressBar.style.strokeDasharray = CIRCUMFERENCE;
    progress(progressRatio);
    let currentMin=Math.floor(current/60);
    let currentSec=Math.floor(current%60);
    if(currentMin<10){
        currentMin=`0${currentMin}`;
    }
    if(currentSec<10){
        currentSec=`0${currentSec}`;
    }
    playTime.innerHTML=`${currentMin}:${currentSec}`;
});
/* progressive.addEventListener('click',(e)=>{
    let clickPos=e.offsetX;
    let maxWidth=progressive.clientWidth; console.log(maxWidth);
    musicAudio.currentTime=(clickPos/maxWidth)*musicAudio.duration;
    if(playBtn.innerHTML=="play_arrow"){
        musicPlay();
    }
}); */
/* --------------------------------------------------------- */
