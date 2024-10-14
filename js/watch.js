const musicApp=document.querySelector('.player')
const musicAudio=musicApp.querySelector('#main_audio');
const playBtn=musicApp.querySelector('#musicBtn');
let list_index=0;
//--------------------------------------------------
const albumImg=musicApp.querySelector('.backgroundImage>img');
const musicName=musicApp.querySelector('.name');
const musicArtist=musicApp.querySelector('.artist');
const playTime=musicApp.querySelector('.currentTime');
const playList=document.querySelector('.play_list');
const progressive=musicApp.querySelector('.progress');
const progressBar=musicApp.querySelector('.bar');
const prevBtn=musicApp.querySelector('#prevBtn');
const nextBtn=musicApp.querySelector('#nextBtn');
const repeatFunc=musicApp.querySelector('.repeatFunc');
const repeatBtn=musicApp.querySelector('#repeatBtn');
const repeatText=musicApp.querySelector('.repeatText');
const listBtn=musicApp.querySelector('#listBtn');
const volumeBtn=musicApp.querySelector('#volumeBtn');
const volumeSelect=musicApp.querySelector('.volumeSelect');
const volumeMinus=musicApp.querySelector('.minus');
const volumePlus=musicApp.querySelector('.plus');
const volumeBar=musicApp.querySelector('.volume_bar');
const currentVolume=musicApp.querySelector('.currentVolume');
const muteBtn=musicApp.querySelector('#mute');
const menuBtn=musicApp.querySelector('#menuBtn');
const menuScreen=musicApp.querySelector('.menuScreen');
const shuffleFunc=musicApp.querySelector('.shuffleFunc');
const shuffleBtn=musicApp.querySelector('#shuffleBtn');
const shuffleText=musicApp.querySelector('.shuffleText');
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
    listClassActive(); // 테스트 개선 사항
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
musicAudio.addEventListener('ended',()=>{
    let getTextRepeat=repeatBtn.innerHTML;
    if(getTextRepeat=="repeat"){
        nextMusic();
    }else{
        loadMusic(list_index);
        musicPlay();
    }
});
/* --------------------------------------------------------- */
volumeBtn.addEventListener('click',()=>{
    volumeSelect.classList.add('active');
});
let muteOn=false;
let currentVol=7;
const maxVol=15;
currentVolume.innerHTML=currentVol;
let volumeProgressRatio=(currentVol/maxVol)*100;
musicAudio.volume=volumeProgressRatio/100;
function volumeProgress(per) {
    const progress = per / 100;
    const dashoffset = CIRCUMFERENCE * (1 - progress);
    volumeBar.style.strokeDashoffset = dashoffset;
}
volumeBar.style.strokeDasharray = CIRCUMFERENCE;
volumeProgress(volumeProgressRatio);
// console.log(volumeProgressRatio);
// console.log(musicAudio.volume);
volumeMinus.addEventListener('click',()=>{
    if(currentVol>0){
        currentVol--;
        currentVolume.innerHTML=currentVol;
        volumeProgressRatio=(currentVol/maxVol)*100;
        musicAudio.volume=volumeProgressRatio/100;
        volumeProgress(volumeProgressRatio);
        volumeBtn.innerHTML="volume_up";
        muteBtn.innerHTML="volume_up";
    }else{
        currentVol=0;
        musicAudio.volume=0;
    }
    if(musicAudio.volume==0){
        volumeBtn.innerHTML="volume_off";
        muteBtn.innerHTML="volume_off";
        volumeMinus.style.color='#666';
    }
    volumePlus.style.color='#fff';
    console.log('minus');
});
volumePlus.addEventListener('click',()=>{
    if(currentVol<maxVol){
        currentVol++;
        currentVolume.innerHTML=currentVol;
        volumeProgressRatio=(currentVol/maxVol)*100;
        musicAudio.volume=volumeProgressRatio/100;
        volumeProgress(volumeProgressRatio);
        volumeBtn.innerHTML="volume_up";
        muteBtn.innerHTML="volume_up";
    }else{
        currentVol=maxVol;
        musicAudio.volume=1;
    }
    if(musicAudio.volume==1){
        volumePlus.style.color='#666';
    }
    volumeMinus.style.color='#fff';
    console.log('plus');
});
muteBtn.addEventListener('click',()=>{
    if(muteOn==false){
        musicAudio.volume=0;
        volumeBtn.innerHTML="volume_off";
        muteBtn.innerHTML="volume_off";
        muteOn=true;
    }else{
        musicAudio.volume=volumeProgressRatio/100;
        volumeBtn.innerHTML="volume_up";
        muteBtn.innerHTML="volume_up";
        muteOn=false;
    }
});
const backToMain=musicApp.querySelector('.backToMain');
backToMain.addEventListener('click',()=>{
    volumeSelect.classList.remove('active');
});
// ===================================================
const fragment=document.createDocumentFragment();
const ul=playList.querySelector('ul');
for(let i=0; i<musicList.length; i++){
    let li=document.createElement('li');
    li.setAttribute('data-index',i);
    li.innerHTML=`<strong>${musicList[i].name}</strong><em>${musicList[i].artist}</em>`;
    fragment.appendChild(li);
}
ul.appendChild(fragment);
listBtn.addEventListener('click',()=>{
    playList.classList.add('on');
});
/* -------- 테스트 개선 사항 ----------- */
const musicListName=playList.querySelectorAll('li');
const listClassActive=()=>{
    musicListName.forEach((list)=>{
        if(list_index==list.dataset.index){ //getAttribute('data-index');
            list.classList.add('active');
        }else{
            list.classList.remove('active');
        }
    });
}
musicListName.forEach((list)=>{
    list.addEventListener('click',(e)=>{
        list_index=e.currentTarget.dataset.index;
        loadMusic(list_index);
        musicPlay();
        listClassActive();
    });
});
const backToMain2=musicApp.querySelector('.backToMain2');
backToMain2.addEventListener('click',()=>{
    playList.classList.remove('on');
});
// =============================================
menuBtn.addEventListener('click',()=>{
    menuScreen.classList.add('on');
});
let isShuffling=false;
shuffleFunc.addEventListener('click',()=>{
    if(!isShuffling){
        isShuffling=true;
        shuffleFunc.classList.add('on');
        shuffleBtn.innerHTML="shuffle_on";
        shuffleText.innerHTML="ON";
        console.log('on');
        // 음악 리스트 현재 듣고 있는 곡은 무조건 고정
        // 나머지 곡들은 랜덤 순서로 섞어서 진행
        // 단 1 사이클에 1번만 나와야 하고 모든 곡이 나와야 함
        // 전체 듣기가 켜져있을 때 모든 곡이 끝나면 처음 셔플된 곡들
        // 그대로 나옴
    }else{
        isShuffling=false;
        shuffleFunc.classList.remove('on');
        shuffleBtn.innerHTML="shuffle";
        shuffleText.innerHTML="OFF";
        console.log('off');
        // 음악 리스트가 지금 상태로 되돌아감
    }
});
repeatFunc.addEventListener('click',()=>{
    let getTextRepeat=repeatBtn.innerHTML;
    if(getTextRepeat=="repeat"){
        repeatFunc.classList.add('on');
        repeatBtn.innerText="repeat_one";
        repeatText.innerHTML="한곡 재생";
    }else{
        repeatFunc.classList.remove('on');
        repeatBtn.innerText="repeat";
        repeatText.innerHTML="전체 재생";
    }
});
const backToMain3=musicApp.querySelector('.backToMain3');
backToMain3.addEventListener('click',()=>{
    menuScreen.classList.remove('on');
});