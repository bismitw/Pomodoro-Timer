//Pomodoro Timer- Basic Countdown


document.addEventListener('DOMContentLoaded', () => {

    //DOM Elements
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const resetBtn = document.getElementById("reset-btn");
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

    function pauseTimer(){
        isRunning = false;
        clearInterval(timerId);
        startBtn.style.display = "inline-flex";
        pauseBtn.style.display = "none";
    }

    function resetTimer(){
        pauseTimer();
        currentSession = 0;
        timeLeft = workDuration * 60;
        totalSessions = 0;
        updateDisplay();
    }

    //Auto next session
    function nextSession (){
        pauseTimer();
        totalSessions++;
        saveState();
        if(currentSession < 4 ){
            currentSession++;
        } else {
            currentSession = 0; //Back to work after long break
        }
        timeLeft = 
        currentSession === 0? workDuration * 60 : currentSession < 4? shortDuration * 60 : longDuration * 60;

        updateDisplay();
    }


    //settings Update

    function updateSettings(){
        workDuration = parseInt(workInput.value) || 25;
        shortDuration = parseInt(shortInput.value) || 5;
        longDuration = parseInt(longInput.value) || 20;
        if(!isRunning){
            timeLeft = workDuration * 60;
            updateDisplay();
        }
        saveState();
    }
    
    //Event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    workInput.addEventListener('input', updateSettings);
    shortInput.addEventListener('input', updateSettings);
    longInput.addEventListener('input', updateSettings);

    //initial display 
    updateDisplay();

    //Dark/Light theme toggle + localstorage
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle){
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.dataset.theme = savedTheme;


        themeToggle.addEventListener('click', () => {
            const isDark = document.body.dataset.theme === 'light';
            document.body.dataset.theme = isDark? 'dark' : 'light';
            localStorage.setItem('theme', document.body.dataset.theme);
        });
    }

    // Save/load state
    function saveState() {
        localStorage.setItem('pomodoro', JSON.stringify({
            workDuration, shortDuration, longDuration, totalSessions
        }));
    }

    function loadState(){
        const saved = localStorage.getItem('pomodoro');
        if(saved){
            const data = JSON.parse(saved);
            workDuration = data.workDuration || 25;
            shortDuration = data.shortDuration || 5;
            longDuration = data.longDuration || 20;
            totalSessions = data.totalSessions || 0;
            workInput.value = workDuration;
            shortInput.value = shortDuration;
            longInput.value = longDuration;
        }
    }

    loadState();
    updateDisplay();


})
