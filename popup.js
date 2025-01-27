document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");

    document.getElementById("start").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "start" }, (response) => {
            console.log(response.status);
        });
    });

    document.getElementById("pause").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "pause" }, (response) => {
            console.log(response.status);
        });
    });

    document.getElementById("reset").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "reset" }, (response) => {
            console.log(response.status);
            timerElement.textContent = "20:00";
        });
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "updateTimer") {
            const minutes = Math.floor(message.remainingTime / 60);
            const seconds = message.remainingTime % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }
    });
});
