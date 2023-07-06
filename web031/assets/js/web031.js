// 宣告video物件
const video = document.getElementById("video");

// 分析結果文字物件
const header2 = document.getElementById("prediction");
const header4 = document.getElementById("score");

// 啟動手機鏡頭並進行影像辨識
async function startCamera() {
  try {
    // 取得手機鏡頭的視訊串流
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // 將視訊串流設定給video元素
    video.srcObject = stream;
    
    // 等待視訊串流載入完成後再執行影像辨識
    video.addEventListener("loadedmetadata", () => {
      loadImage();
    });
  } catch (error) {
    console.error("無法取得視訊串流:", error);
  }
}

// 觸發函式
async function loadImage() {
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

// 在網頁載入時啟動手機鏡頭
window.addEventListener("DOMContentLoaded", () => {
  startCamera();
});
