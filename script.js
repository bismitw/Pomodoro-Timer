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


})
