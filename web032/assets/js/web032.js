
// 宣告video物件
const video = document.getElementById("video");
// 宣告切換鏡頭按鈕
const switchCameraBtn = document.getElementById("switchCameraBtn");

// 分析結果文字物件
const header2 = document.getElementById("prediction");
const header4 = document.getElementById("score");

let currentCamera = "user"; // 目前使用的鏡頭為前鏡頭

// 啟動手機鏡頭並進行影像辨識
async function startCamera() {
  try {
    // 取得手機鏡頭的視訊串流
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentCamera } });

    // 將視訊串流設定給video元素
    video.srcObject = stream;

    // 等待視訊串流載入完成後再執行影像辨識
    video.addEventListener("loadedmetadata", () => {
      // 確保視訊尺寸已經設定
      video.width = video.videoWidth/1.5;
      video.height = video.videoHeight/1.5;
      video.removeEventListener("loadedmetadata", arguments.callee);

      // 開始進行影像辨識預測
      predictLoop();
    });
  } catch (error) {
    console.error("無法取得視訊串流:", error);
  }
}

// 切換鏡頭
async function switchCamera() {
  currentCamera = currentCamera === "user" ? "environment" : "user";
  await stopCamera();
  startCamera();
}

// 停止鏡頭
async function stopCamera() {
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());
  video.srcObject = null;
}

// 影像辨識預測迴圈
function predictLoop() {
  // 讀取模型
  mobilenet.load().then(model => {
    // 進行影像辨識預測
    model.classify(video).then(predictions => {
      console.log(predictions);
      // 類別
      header2.innerText = predictions[0]['className'];
      // 分數 20230707四捨五入至小數第二位
      var numb = predictions[0]['probability'];
      header4.innerText = numb.toFixed(2);

      // 使用requestAnimationFrame進行下一輪預測
      requestAnimationFrame(predictLoop);
    });
  });
}

// 在網頁載入時啟動手機鏡頭
window.addEventListener("DOMContentLoaded", () => {
  startCamera();
  // 綁定切換鏡頭按鈕的點擊事件
  switchCameraBtn.addEventListener("click", () => {
    switchCamera();
  });
});
