<script>
  var url = "https://api.github.com/repos/jsjh160t/jsjh160t.github.io/contents/3/3.jpg?access_token=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",
    data = {
      "message": "test", // 檔案的備註資訊
      "content": "bXkgbmV3IGZpbGUgY29udGVudHM=" // base64 編碼
    };

  $.ajax({
    type: "put",
    url: url,
    headers: {
      "Content-Type": "application/json" // 指定送出資料為 json 格式
    },
    data: JSON.stringify(data), // 一定要將物件轉成字串才會被接受
    success: function ()json {
      console.log("good! " + JSON.stringify(json));
    },
    error: function ()json {
    console.log("error! " + JSON.stringify(json));
    }
  });

  
  // 宣告canvas 物件
  const canvas1 = document.getElementById('canvas1');
  // 宣告canvas 繪圖物件
  var ctx = canvas1.getContext('2d')

  // 分析結果文字物件
  let header2 = document.getElementById("prediction");
  let header4 = document.getElementById("score");

  // 先告js 影像物件
  var myImage = new Image();
  // 指定本地端範例影像路徑
  myImage.src = "3.jpg"; 
  // 一旦成功載入影像，觸發執行loadImage函式
  myImage.addEventListener("load", loadImage, false);

  // 觸發函式
  async function loadImage(e) {
    // 範例影像大小
    img_width = myImage.width;
    img_height = myImage.height;

    // 調整canvas大小
    canvas1.width = img_width;
    canvas1.height = img_height;

    // canvas 繪製底圖
    ctx.drawImage(myImage, 0, 0, img_width, img_height);

    // 讀取模型
    mobilenet.load().then(model => {
      // 類別分析
      model.classify(myImage).then(predictions => {
        console.log(predictions)
        // 類別
        header2.innerText = predictions[0]['className'];
        // 分數
        header4.innerText = predictions[0]['probability'];
      });
    });
  }    
</script>