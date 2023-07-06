// 宣告影像容器物件
const videoContainer = document.getElementById("video-container");

// 分析結果文字物件
const header2 = document.getElementById("prediction");
const header4 = document.getElementById("score");

// 啟動手機鏡頭並進行影像辨識
async function startCamera() {
  try {
    // 取得視訊流
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    // 建立video元素並設定為視訊流來源
    const video = document.createElement("video");
    video.srcObject = stream;

    // 等待使用者互動後再播放視訊
    videoContainer.addEventListener("click", function() {
      video.play();
      videoContainer.removeEventListener("click", arguments.callee);
    });

    // 將video元素加入影像容器
    videoContainer.appendChild(video);
  } catch (error) {
    console.error("無法存取攝像頭: ", error);
  }
}

// 觸發函式
async function loadImage(image) {
  // 範例影像大小
  const img_width = image.videoWidth;
  const img_height = image.videoHeight;

  // 建立canvas元素並設定大小
  const canvas = document.createElement("canvas");
  canvas.width = img_width;
  canvas.height = img_height;

  // 繪製影像到canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, img_width, img_height);

  // 讀取模型
  mobilenet.load().then(model => {
    // 類別分析
    model.classify(canvas).then(predictions => {
      console.log(predictions);
      // 類別
      header2.innerText = predictions[0]['className'];
      // 分數
      header4.innerText = predictions[0]['probability'];
    });
  });

  // 循環呼叫下一張影像
  requestAnimationFrame(() => loadImage(image));
}

// 在網頁載入完成後啟動手機鏡頭
window.addEventListener("DOMContentLoaded", startCamera);
