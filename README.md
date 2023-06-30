# jsjh160t.github.io

AI省電舒適空調：<br>
Fuzzy控制：<br>
(1)MOM去模糊化模式；<br>
(2)SOM去模糊化模式。<br><br>

1/啟動TF demo<br>
2/Template Image Classification ：本地端範例(tiger.jpg) cat<br>
3/Custom Image Classification  ：無法上傳檔案(20230624解決--自訂上傳按鈕)(分開html與js)<br>
4/Template Image Object Detection ：本地端範例(od_sample4.jpg)<br>
5/WebCam Image Object Detection  無法擷取影像(20230624解決--將google.colab那一行註解掉)<br>
6/WebCam Video Object Detection<br>
7/Template Image 人體姿態(靜態) ：本地端範例(pose_sample2)-firefox可以，chrome不行<br>
  (20230627增加以下指令，就可以在chrome正常執行：)<br>
  // 觸發函式<br>
  async function loadImage(e) {<br>
     //方法1.等待~~確保 TensorFlow.js 在進行其他操作之前已經初始化。<br>
     await tf.ready();<br>
     //方法2.等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。<br>
     //await tf.setBackend('webgl'); <br>   
        
8/Custom Image 人體姿態(靜態) ：無法上傳檔案(20230624解決--自訂上傳按鈕)(分開html與js)<br>
  (20230627增加同上指令，就可以在chrome正常執行。)<br>

9/WebCam Image 人體姿態(動態) ：無法擷取影像<br>
  (20230627增加以下指令，就可以在chrome正常執行。)<br>
  // webcam 攝影<br>
  async function takePhoto() {<br>
    //方法1.等待~~確保 TensorFlow.js 在進行其他操作之前已經初始化。<br>
    //await tf.ready();<br>
    //方法2.等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。<br>
    await tf.setBackend('webgl');<br>
    
10/WebCam Video 人體姿態(動態) ：無法顯示<br>
  (20230630增加以下指令，就可以在chrome正常執行。)<br>
  async function app() {<br>
    //方法1.等待~~確保 TensorFlow.js 在進行其他操作之前已經初始化。<br>
    //await tf.ready();<br>
    //方法2.等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。<br>
    await tf.setBackend('webgl');<br>
        
11/Custom Image 多人人體姿態(靜態) ：無法上傳檔案<br>

12/tmo~tm2：teachable machine的models+javascript，tm0：沒照HTML格式規範，tm1：(原始版)webcam+修改檔案來源，tm2：chatgpt改為上傳檔案並清除預測值+tf.ready()

