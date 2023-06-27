# jsjh160t.github.io

AI省電舒適空調：<br>
Fuzzy控制：<br>
(1)MOM去模糊化模式；<br>
(2)SOM去模糊化模式。<br><br>

1/啟動TF demo<br>
2/Template Image Classification ：tiger cat<br>
3/Custom Image Classification  ：無法上傳檔案(20230624解決--自訂上傳按鈕且分開html與js)<br>
4/Template Image Object Detection ：od_sample4<br>
5/WebCam Image Object Detection  無法擷取影像(20230624解決且分開html與js)<br>
6/WebCam Video Object Detection<br>
7/Template Image 人體姿態(靜態) ：pose_sample2  firefox可以，chrome不行<br>
  20230627增加指令，就可以在chrome正常執行：<br>
  async function loadImage(e) {<br>
    //方法1.等待~~確保 TensorFlow.js 在進行其他操作之前已經初始化。<br>
    await tf.ready();<br>
    //方法2.等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。<br>
    await tf.setBackend('webgl');<br>  
8/Custom Image 人體姿態(靜態) ：無法上傳檔案(20230624解決--自訂上傳按鈕且分開html與js)<br>
  20230627增加同上指令，就可以在chrome正常執行。<br>
9/WebCam Image 人體姿態(動態) ：<br>
10/WebCam Video 人體姿態(動態) ：<br>
11/多人 人體姿態(動態) ：<br>
