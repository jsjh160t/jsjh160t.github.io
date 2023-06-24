<script>
  document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表單預設提交行為

    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];

    if (!file) {
      alert('請選擇一個圖片檔案。');
      return;
    }

    var formData = new FormData();
    formData.append('file', file);

    // 上傳圖片到 GitHub
    var apiUrl = 'https://api.github.com/repos/jsjh160t/jsjh160t.github.io/contents/3/3.jpg?access_token=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';
    fetch(apiUrl, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        alert('圖片上傳成功！');
      })
      .catch(error => {
        console.error('圖片上傳失敗：', error);
      });
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
