// 宣告canvas物件
const canvas1 = document.getElementById("canvas1");
// 宣告canvas繪圖物件
const ctx = canvas1.getContext("2d");

// 分析結果文字物件
const header2 = document.getElementById("prediction");
const header4 = document.getElementById("score");

// 啟動手機鏡頭
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    // 取得到手機鏡頭的影像串流後，建立video物件來顯示影像
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;

    // 等待影像載入後觸發執行loadVideo函式
    video.addEventListener("loadeddata", function() {
      loadVideo(video);
    });
  })
  .catch(function(error) {
    console.log("無法存取手機鏡頭: ", error);
  });

// 觸發函式
async function loadVideo(video) {
  // 範例影像大小
  const video_width = video.videoWidth;
  const video_height = video.videoHeight;

  // 調整canvas大小
  canvas1.width = video_width;
  canvas1.height = video_height;

  // 開始繪製視訊畫面並進行影像辨識
  function renderFrame() {
    // 繪製視訊畫面到canvas
    ctx.drawImage(video, 0, 0, video_width, video_height);

    // 讀取模型
    mobilenet.load().then(model => {
      // 類別分析
      model.classify(canvas1).then(predictions => {
        console.log(predictions);
        // 類別
        header2.innerText = predictions[0]['className'];
        // 分數
        header4.innerText = predictions[0]['probability'];

        // 持續繪製畫面
        requestAnimationFrame(renderFrame);
      });
    });
  }

  // 開始繪製畫面
  renderFrame();
}
