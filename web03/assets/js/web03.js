// 宣告canvas物件
      const canvas1 = document.getElementById("canvas1");
      // 宣告canvas繪圖物件
      const ctx = canvas1.getContext("2d");
      
      // 分析結果文字物件
      const header2 = document.getElementById("prediction");
      const header4 = document.getElementById("score");
      
      // 上傳按鈕物件
      const uploadBtn = document.getElementById("upload");
      
      // 當使用者選擇檔案後觸發的事件處理函式
      uploadBtn.addEventListener("change", async function(event) {
        // 取得使用者選擇的檔案
        const file = event.target.files[0];
        
        // 讀取檔案並轉換成Base64編碼
        const reader = new FileReader();
        reader.onload = function(event) {
          const base64Image = event.target.result;
          
          // 建立新的影像物件
          const myImage = new Image();
          myImage.src = base64Image;
          
          // 一旦成功載入影像，觸發執行loadImage函式
          myImage.addEventListener("load", function() {
            loadImage(myImage);
          }, false);
        };
        reader.readAsDataURL(file);
      });
      
      // 觸發函式
      async function loadImage(image) {
        // 範例影像大小
        const img_width = image.width;
        const img_height = image.height;
  
        // 調整canvas大小
        canvas1.width = img_width;
        canvas1.height = img_height;
  
        // canvas繪製底圖
        ctx.drawImage(image, 0, 0, img_width, img_height);
  
        // 讀取模型
        mobilenet.load().then(model => {
          // 類別分析
          model.classify(image).then(predictions => {
            console.log(predictions);
            // 類別
            header2.innerText = predictions[0]['className'];
            // 分數 20230707四捨五入至小數第二位
            header4.innerText = predictions[0]['probability'].toFixed(2);
          });
        });
      }
