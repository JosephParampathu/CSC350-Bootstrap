let score = {
  pitch: true,
  homerun: 0,
  ball: 0,
  totalPitches: 10,
  ballPitch: document.querySelector("#ballPitch"),
  HR: document.querySelector("#homeruns"),
  audio: new Audio("sounds/hit.mp3"),
  addBall(){this.ball+=1;},
  addHR(){this.homerun+=1;},
  reset(){this.homerun=0, this.ball=0}
}

let field ={
  HR: document.querySelector(".homerun"),
  ball: document.querySelector(".ball"),
  batter: document.querySelector(".batter")
}

function pitchHitClick(){
  score.pitch ? pitchBall():swing();
}

function pitchBall(){
  score.pitch = false;
  field.HR.classList.remove("HR");

  if(score.ball>= score.totalPitches){
    score.ballPitch.innerHTML="Game Over";
    score.reset();
    return;
  }

  field.ball.animate([
    {marginTop: '10px'},
    {marginTop: '100vh'}
  ], {
    duration: 1000
  });

  score.addBall();

  score.ballPitch.innerHTML="Ball: " + score.ball;
}

function swing(){
  score.pitch = true;
  let ballTop=field.ball.offsetTop;
  let batter=field.batter.offsetTop;

  if(batter-ballTop<100 && batter - ballTop>-10){
    hitBall();
  }

  field.batter.animate([
    {transform: 'rotate(0deg) translate(0px,0px)'},
    {transform: 'rotate(-150deg) translate(50px, 30px)'}
  ],
    {
      duration: 300
    }
  );

  score.HR.innerHTML="HR: " + score.homerun;
}

function hitBall(){
  var ballPos={
    x:field.ball.offsetLeft,
    y:field.ball.offsetTop,
  };
  var rand={
    x:Math.floor(Math.random()*2000 - 1000),
    y:Math.floor(Math.random()* -10000 +100)
  };

  field.ball.animate([
    {marginLeft:ballPos.x + 'px', marginTop:ballPos.y + 'px'},
    {marginLeft:rand.x + 'px', marginTop:rand.y + 'px'}
  ],
  {
    duration:1000
  });

  if(rand.y<-5000){
    score.audio.play();
    score.addHR();
    field.HR.classList.add("HR");
  }
}
