let gameSeq=[];
let userSeq=[];
let score=[];
let started=false;
let level=0;
let h2=document.querySelector('h2');
let color=["yellow","red","green","purple"];
document.addEventListener('keypress',function(){
    if(started==false){
        console.log("game started");
        started=true;
    }
    levelUp();
});
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randClass=color[randIdx];
    gameSeq.push(randClass);
    console.log(gameSeq);
    let reqBtn=document.querySelector(`.${randClass}`);
    gameFlash(reqBtn);
}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        document.querySelector('body').classList.add('poora');
        setTimeout(function(){
            document.querySelector('body').classList.remove('poora');
        },200);
        let highScore=trackScore(level);
        h2.innerHTML=`Game over!  Your score was <b>${level}</b> <br/>Press any key to start & high score is ${highScore}`;
        reset();
    }
}
function gameFlash(btn){
    btn.classList.add('gameflash');
    setTimeout(function(){
        btn.classList.remove('gameflash');
    },200);
}
function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },200);
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=this.getAttribute('id');
    // console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll('.btn');
for(el of allBtns){
    el.addEventListener('click',btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
function trackScore(level){
        score.push(`${level}`);
        console.log(score);
        let max=score[0];
        for(let i=0;i<score.length;i++){
            if(score[i]>max){
                max=score[i];
            }
        }
    return max;
    }
