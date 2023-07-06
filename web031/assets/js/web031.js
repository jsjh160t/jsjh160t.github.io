// 宣告canvas物件
const canvas1 = document.getElementById("canvas1");
// 宣告canvas繪圖物件
const ctx = canvas1.getContext("2d");

// 分析結果文字物件
const header2 = document.getElementById("prediction");
const header4 = document.getElementById("score");

// 啟動手機鏡頭並進行影像辨識
async function startCamera() {
  try {
    // 取得視訊流
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // 將視訊流設定為canvas的影像來源
    const video = document.createElement("video");
    video.srcObject = stream;
    
    // 等待視訊載入完成
    video.addEventListener("loadedmetadata", () => {
      // 調整canvas大小
      canvas1.width = video.videoWidth;
      canvas1.height = video.videoHeight;
      
      // 開始影像辨識
      loadImage(video);
    });
    
    // 將視訊播放到隱藏的video元素上
    video.play();
  } catch (error) {
    console.error("無法存取攝像頭: ", error);
  }
}

// 觸發函式
async function loadImage(image) {
  // 範例影像大小
  const img_width = image.videoWidth;
  const img_height = image.videoHeight;

  // canvas繪製底圖
  ctx.drawImage(image, 0, 0, img_width, img_height);

  // 讀取模型
  mobilenet.load().then(model => {
    // 類別分析
    model.classify(canvas1).then(predictions => {
      console.log(predictions);
      // 類別
      header2.innerText = predictions[0]['className'];
      // 分數
      header4.innerText = predictions[0]['probability'];
    });
  });
}

// 在網頁載入完成後啟動手機鏡頭
window.addEventListener("DOMContentLoaded", startCamera);
