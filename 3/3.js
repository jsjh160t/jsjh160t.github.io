  //const fileContent = 'BASE64_ENCODED_IMAGE_CONTENT'; // 圖片的Base64編碼內容
  //var url = "https://api.github.com/repos/jsjh160t/jsjh160t.github.io/contents/3/3.jpg?access_token=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",
  
  function uploadImage() {
      const accessToken = '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'; //YOUR_ACCESS_TOKEN
      const owner = 'jsjh160t'; //YOUR_USERNAME
      const repo = 'jsjh160t.github.io';  //YOUR_REPO
      const path = '3/3.jpg'; // 上傳的圖片路徑

      const imageInput = document.getElementById('imageInput');
      const file = imageInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const fileContent = event.target.result.split(',')[1]; // 取得Base64編碼的圖片內容

          const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

          const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ${accessToken}'
            },
            body: JSON.stringify({
              message: 'Upload image',
              content: fileContent
            })
          };

          fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log('Image uploaded:', data);

              // 顯示預覽圖片
              //const previewContainer = document.getElementById('previewContainer');
              //const imagePreview = document.createElement('img');
              //imagePreview.src = URL.createObjectURL(file);
              //previewContainer.appendChild(imagePreview);

              
              //進行預測
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
              myImage.src = URL.createObjectURL(file); 
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
            })
            .catch(error => {
              console.error('Error uploading image:', error);
            });
        };

        reader.readAsDataURL(file);
      }
    }
  
