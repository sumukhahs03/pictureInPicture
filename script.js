const videoElement = document.querySelector('#video');
const start = document.querySelector('#start');
const stopStream = document.querySelector('#stop');
const popout = document.querySelector('#popout');

// Options for getDisplayMedia()

var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: true
};

// Set event listeners for the start and stop buttons
start.addEventListener("click", function (evt) {
    startCapture();
}, false);

stopStream.addEventListener("click", function (evt) {
    stopCapture();
}, false);

async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        videoElement.srcObject = captureStream;
        videoElement.classList.remove('visually-hidden');
        videoElement.onloadedmetadata = function () {
            videoElement.play();
        }
    } catch (err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

async function popoutStream() {
    videoElement.classList.add('visually-hidden');
    await videoElement.requestPictureInPicture();
}

function stopCapture(evt) {
    let tracks = videoElement.srcObject.getTracks();
    videoElement.classList.add('visually-hidden');
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
}

popout.addEventListener('click', popoutStream);

