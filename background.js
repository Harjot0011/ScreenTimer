// Create a Google Chrome extension to remind the user to stop looking at the screen every 20 minutes.
// The extension includes a start and pause button, and a visible countdown timer.

// background.js
let timer = null;
let isRunning = false;
let remainingTime = 20 * 60; // 20 minutes in seconds

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            remainingTime--;
            chrome.runtime.sendMessage({ action: "updateTimer", remainingTime });

            if (remainingTime <= 0) {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Time to Take a Break!",
                    message: "It's been 20 minutes. Look away from the screen for a while!"
                });
                remainingTime = 20 * 60; // Reset timer
            }
        }, 1000); // Update every second
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") {
        startTimer();
        sendResponse({ status: "Timer started" });
    } else if (message.action === "pause") {
        pauseTimer();
        sendResponse({ status: "Timer paused" });
    } else if (message.action === "reset") {
        remainingTime = 20 * 60;
        chrome.runtime.sendMessage({ action: "updateTimer", remainingTime }); // Ensure timer resets visually
        sendResponse({ status: "Timer reset" });
    }
});
