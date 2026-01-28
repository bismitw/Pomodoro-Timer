//Pomodoro Timer- Basic Countdown


document.addEventListener('DOMContentLoaded', () => {

    //DOM Elements
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const currentModeEl = document.getElementById("current-mode");
    const sessionModeEl = document.getElementById("session-count");
    const progressArc = document.getElementById('progress-arc');
    const workInput = document.getElementById('work-duration');
    const shortInput = document.getElementById('short-duration');
    const longInput = document.getElementById('long-duration');
    const bellSound = document.getElementById('bell-sound');

    //Timer State
    let timeLeft = 25 * 60; //Default  25 min work
    let timerId = null ;
    let isRunning = false;
    let currentSession = 0; // 0 = work , 1-3 = short-break, 4 = long break
    let totalSessions = 0;

    //Default settings ( pomodoro: 25/5/15-30) [web:13] [web:14]
    let workDuration = 25;
    let shortDuration = 5;
    let longDuration = 20;


    // update display (shows time + progress circle + mode)
    function updateDisplay() {
        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft % 60;
        minutesEl.textContent = minutes.toString().padStart(2,'0');
        secondsEl.textContent = seconds.toString().padStart(2,'0');

        //progress arc (full circle = session duration)
        const sessionDuration = currentSession === 0? workDuration * 60 : 
        currentSession < 4? shortDuration * 60 :
        longDuration * 60;

        const progress  = ((sessionDuration-timeLeft)/sessionDuration) * 100;
        progressArc.style.strokeDasharray = `${progress},100`;

        //Update Mode Display 
        const modes = ["Work", "Short Break", "Short Break", "Short Break", "Long Break"];
        currentModeEl.textContent = modes[currentSession] || "work";
        sessionModeEl.textContent = totalSessions;
        
        //visual states
        document.querySelector(".timer-container").classList.toggle("running", isRunning);
    }

    //Timer Control
    function startTimer(){
        if(!isRunning){
            isRunning = true;
            startBtn.style.display = "none";
            pauseBtn.style.display = "inline-flex";
            timerId = setInterval(() => {
                timeLeft--;
                updateDisplay()
                if(timeLeft<=0){
                    bellSound.play().catch(()=>{}) //play bell sound
                    nextSession();
                }
            },1000);
        }
    }


})
