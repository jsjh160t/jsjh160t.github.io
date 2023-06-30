// 宣告canvas 物件
const canvas = document.getElementById('canvas1');
// 宣告canvas 繪圖物件
var ctx = canvas.getContext('2d')

// webcam 攝影
async function takePhoto() {
  //方法1.等待~~確保 TensorFlow.js 在進行其他操作之前已經初始化。
  //await tf.ready();
  //方法2.等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。
  
  await tf.setBackend('webgl');
  // 讀取模型
  const model = await cocoSsd.load();

  const div = document.createElement('div'); // 空行
  const capture = document.createElement('button'); // 攝影按鈕
  capture.textContent = 'Capture'; // 攝影按鈕文字
  div.appendChild(capture);

  const video = document.createElement('video'); // 宣告影片物件
  video.style.display = 'block';
  const stream = await navigator.mediaDevices.getUserMedia({video: true}); // 宣告串流物件

  document.body.appendChild(div);
  div.appendChild(video);
  video.srcObject = stream; // 使影片物件顯示串流內容
  await video.play();  

  // 等待點擊攝影按鈕
  await new Promise((resolve) => capture.onclick = resolve);

  // canvas 繪製底圖
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  // 停止 webcamera
  stream.getVideoTracks()[0].stop();
  div.remove();

  // 模型推論分析
  const predictions = await model.detect(canvas);

  // 繪製分析結果
  ctx.strokeStyle = "red";
  ctx.font = "30px Arial";
  for (var i = 0; i < predictions.length; i++) {
      console.log(predictions[i]);

      // 物件框
      var x = predictions[i].bbox[0];
      var y = predictions[i].bbox[1];
      var w = predictions[i].bbox[2];
      var h = predictions[i].bbox[3];
      ctx.strokeRect(x, y, w, h);

      // 物件類別文字
      ctx.fillText(predictions[i].class, x, y+30);
  }
}

takePhoto()
