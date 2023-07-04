// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
//const URL = "./tm-my-image-model/";
const URL = "tm-my-image-model/";

let model, video, labelContainer, maxPredictions;
let currentFacingMode = 'environment'; // 初始為後鏡頭

// Load the image model and setup the video
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    await tf.setBackend('webgl'); //等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup the video
    video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.style.width = '50%';
    document.getElementById("video-container").appendChild(video);

    // Check if the user interacts with the page
    document.addEventListener('click', startVideo);

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function startVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Get the available video sources (cameras)
        const sources = await navigator.mediaDevices.enumerateDevices();
        let videoSourceId = null;

        // Find the video source ID of the desired facing mode
        for (let source of sources) {
            if (source.kind === 'videoinput') {
                if (currentFacingMode === 'environment' && source.label.includes('back')) {
                    videoSourceId = source.deviceId;
                    break;
                } else if (currentFacingMode === 'user' && source.label.includes('front')) {
                    videoSourceId = source.deviceId;
                    break;
                }
            }
        }

        // Constraints object to specify the video source
        const constraints = {
            video: {
                deviceId: videoSourceId ? { exact: videoSourceId } : undefined,
                facingMode: currentFacingMode
            }
        };

        // Get the media stream using the constraints
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        await video.play();
        document.removeEventListener('click', startVideo); // Remove the event listener after starting the video
        window.requestAnimationFrame(loop);
    }
}

async function loop() {
    await predict();
    window.requestAnimationFrame(loop);
}

// run the video frame through the image model
async function predict() {
    // predict can take in an image, video, or canvas HTML element
    const prediction = await model.predict(video);
   
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

// 切換前後鏡頭
function switchCamera() {
    if (currentFacingMode === 'environment') {
        currentFacingMode = 'user'; // 切換為前鏡頭
    } else {
        currentFacingMode = 'environment'; // 切換為後鏡頭
    }

    // 重新啟動視訊
    startVideo();
}

