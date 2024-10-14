const musicApp=document.querySelector('.player')
const musicAudio=musicApp.querySelector('#main_audio');
const playBtn=musicApp.querySelector('#musicBtn');
let list_index=0;
//--------------------------------------------------
const albumImg=document.querySelector('.album>img');
const musicName=musicApp.querySelector('.name');
const musicArtist=musicApp.querySelector('.artist');
const playList=document.querySelector('.play_list');
const totalTime=musicApp.querySelector('.totalTime');
const playTime=musicApp.querySelector('.currentTime');
const progressive=musicApp.querySelector('.center');
const progressBar=musicApp.querySelector('.bar');
const prevBtn=musicApp.querySelector('#prevBtn');
const nextBtn=musicApp.querySelector('#nextBtn');
const repeatBtn=musicApp.querySelector('#repeatBtn');
const listBtn=musicApp.querySelector('#listBtn');
const volumeBtn=musicApp.querySelector('#volumeBtn');
const soundValue=musicApp.querySelector('.value');
//--------------------------------------------------
const barLength=50;
const visual=document.querySelector('.visualizer');
for(i=0; i<barLength; i++){
    const bar=document.createElement('span');
    bar.setAttribute("class","bar");
    visual.appendChild(bar);
}
const bars=document.querySelectorAll('.visualizer>span');
const visualizing=()=>{
    bars.forEach((bar)=>{
        bar.style.height=`${Math.floor(Math.random()*100)}%`;
    });
    requestAnimationFrame(visualizing);
    }
// ===============================================
const loadMusic=(num)=>{
    musicAudio.src=`songs/${musicList[num].audio}.mp3`;
    albumImg.src=`images/${musicList[num].img}.jpg`;
    musicName.innerHTML=musicList[num].name;
    musicArtist.innerHTML=musicList[num].artist;
    totalTime.innerHTML=musicList[num].total;
}
loadMusic(list_index);
const musicPlay=()=>{
    visualizing();
    albumImg.style.animationPlayState='running';
    playBtn.innerHTML="pause";
    musicAudio.play();
    listClassActive(); // 테스트 개선 사항
}
const musicPause=()=>{
    albumImg.style.animationPlayState='paused';
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
musicAudio.addEventListener('timeupdate',(e)=>{
    let current=e.target.currentTime;
    let duration=e.target.duration;
    let progressRatio=(current/duration)*100;
    progressBar.style.width=`${progressRatio}%`;
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
progressive.addEventListener('click',(e)=>{
    let clickPos=e.offsetX;
    let maxWidth=progressive.clientWidth; console.log(maxWidth);
    musicAudio.currentTime=(clickPos/maxWidth)*musicAudio.duration;
    if(playBtn.innerHTML=="play_arrow"){
        musicPlay();
    }
});
/* --------------------------------------------------------- */
repeatBtn.addEventListener('click',()=>{
    let getTextRepeat=repeatBtn.innerHTML;
    if(getTextRepeat=="repeat"){
        repeatBtn.innerText="repeat_one";
        repeatBtn.setAttribute('title','한곡 반복');
    }else{
        repeatBtn.innerText="repeat";
        repeatBtn.setAttribute('title','전체 반복');
    }
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
    playList.classList.toggle('active');
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
const sound=musicApp.querySelector('.sound');
const muteBtn=musicApp.querySelector('#mute');
const musicRange=musicApp.querySelector('#range');
let soundOpen=false;
let muteOn=false;
let currentVal=50;
soundValue.innerHTML=currentVal;
volumeBtn.addEventListener('click',()=>{
    if(soundOpen==false){
        volumeBtn.style.color="#09f";
        sound.style.display="flex";
        soundOpen=true;
    }else{
        volumeBtn.style.color="#090909";
        sound.style.display="none";
        soundOpen=false;
    }
});
musicRange.addEventListener('change',()=>{
    if(muteOn==false){
        musicAudio.volume=musicRange.value/100;
        currentVal=musicRange.value;
        soundValue.innerHTML=currentVal;
    }else{
        musicAudio.volume=0;
        currentVal=0;
        soundValue.innerHTML=currentVal;
    }
    if(musicAudio.volume==0){
        volumeBtn.innerHTML="volume_off";
        muteBtn.innerHTML="volume_off";
        muteOn=true;
    }
});
muteBtn.addEventListener('click',()=>{
    if(muteOn==false){
        musicAudio.volume=0;
        volumeBtn.innerHTML="volume_off";
        muteBtn.innerHTML="volume_off";
        muteOn=true;
    }else{
        musicAudio.volume=musicRange.value/100;
        volumeBtn.innerHTML="volume_up";
        muteBtn.innerHTML="volume_up";
        muteOn=false;
    }
});
// volume 0일 때 volume off 50 이상일 때 volume up 50 미만일 때 volume down 
/*
    volumeBar.addEventListener('change',()=>{
        musicAudio.volume=volumeBar.value/100;
        let currentVol=musicAudio.volume;
    });
*/
const shuffleBtn=musicApp.querySelector('#shuffleBtn');
const savedList=musicList;
let isShuffling=false;
shuffleBtn.addEventListener('click',()=>{
    if(!isShuffling){
        isShuffling=true;
        shuffleBtn.innerHTML="shuffle_on";
        console.log('on');
        // 음악 리스트 현재 듣고 있는 곡은 무조건 고정
        // 나머지 곡들은 랜덤 순서로 섞어서 진행
        // 단 1 사이클에 1번만 나와야 하고 모든 곡이 나와야 함
        // 전체 듣기가 켜져있을 때 모든 곡이 끝나면 처음 셔플된 곡들
        // 그대로 나옴
    }else{
        isShuffling=false;
        shuffleBtn.innerHTML="shuffle";
        console.log('off');
        // 음악 리스트가 지금 상태로 되돌아감
        musicList=savedList;
        console.log(musicList);
    }
});
// =============================================