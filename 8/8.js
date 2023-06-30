  //const fileContent = 'BASE64_ENCODED_IMAGE_CONTENT'; // 圖片的Base64編碼內容
  //var url = "https://api.github.com/repos/jsjh160t/jsjh160t.github.io/contents/3/3.jpg?access_token=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",
  
  function uploadImage() {
      const accessToken = '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'; //YOUR_ACCESS_TOKEN
      const owner = 'jsjh160t'; //YOUR_USERNAME
      const repo = 'jsjh160t.github.io';  //YOUR_REPO
      const path = '8/8.jpg'; // 上傳的圖片路徑

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
              
              //進行預測
              // 宣告canvas 物件
              const canvas1 = document.getElementById('canvas1');
              // 宣告canvas 繪圖物件
              var ctx = canvas1.getContext('2d')

              // 宣告js 影像物件
              var myImage = new Image();
              
              // 指定上傳本地端影像路徑(URL)
              myImage.src = URL.createObjectURL(file); 
              
              // 一旦成功載入影像，觸發執行loadImage函式
              myImage.addEventListener("load", loadImage, false);

              // 觸發函式
              async function loadImage(e) {
                //方法1.等待~~確保 TensorFlow.js 在進行其他操作之前已經初始化。
                await tf.ready();
                //方法2.等待 TensorFlow.js 初始化，確保後端已經設置好並且準備就緒。
                //await tf.setBackend('webgl');
  
                // 範例影像大小
                img_width = myImage.width;
                img_height = myImage.height;

                // 調整canvas大小
                canvas1.width = img_width;
                canvas1.height = img_height;

                // 人體關節點註解文字顏色
                ctx.strokeStyle = "red";
                // 人體關節點註解文字大小&字體
                ctx.font = "20px Arial";
                // canvas 繪製底圖
                ctx.drawImage(myImage, 0, 0, img_width, img_height);

                // 讀取模型
                const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
                const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

                // 模型推論分析
                const poses = await detector.estimatePoses(canvas1);

                // 繪製模型分析結果
                keypoints = poses[0].keypoints
                for (var i = 0; i < keypoints.length; i++) {   //對應關節
                    console.log(keypoints[i]);

                    // 關節點pixel-wise位置
                    x = keypoints[i].x
                    y = keypoints[i].y

                    // 關節點類別
                    name = keypoints[i].name

                    // 圈選關節點估測位置
                    ctx.beginPath();
                    ctx.arc(x, y, 20, 0, 2 * Math.PI);
                    ctx.stroke();

                    // 繪製關節點文字註解
                    ctx.fillText(name, x+30, y);
                }
              }
              
            })
            .catch(error => {
              console.error('Error uploading image:', error);
            });
        };

        reader.readAsDataURL(file);
      }
    }
                
