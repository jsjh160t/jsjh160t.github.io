
let video;
let currentFacingMode = 'environment'; // 初始為後鏡頭

// 分析結果文字物件
const header2 = document.getElementById("prediction");
const header4 = document.getElementById("score");
      
// Load the image model and setup the video
async function init() {
    // Convenience function to setup the video
    video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.style.width = '100%';
    document.getElementById("video-container").appendChild(video);

    // Check if the user interacts with the page
    //document.addEventListener('click', startVideo);  不用再按20230706
    startVideo();
    
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
    // 讀取模型
        mobilenet.load().then(model => {
          // 類別分析
          model.classify(video).then(predictions => {
            console.log(predictions);
            // 類別
            header2.innerText = predictions[0]['className'];
            // 分數
            header4.innerText = predictions[0]['probability'];
          });
        });
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

