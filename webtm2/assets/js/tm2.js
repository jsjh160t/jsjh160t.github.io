
        // the link to your model provided by Teachable Machine export panel
        //const URL = "./tm-my-image-model/";
        const URL = "tm-my-image-model/";

        let model, labelContainer, maxPredictions;

        // Load the image model
        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            // load the model and metadata
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }
        }

        // Function to handle image upload
        function uploadImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async function() {
                const image = document.createElement('img');
                image.src = reader.result;
                image.width = 240; // Set desired width of the image 原為200
                image.height = 240; // Set desired height of the image 原為200
                showUploadedImage(image);
                await predict(image);
            }
            reader.readAsDataURL(file);
        }

        // Function to display the uploaded image
        function showUploadedImage(image) {
            const uploadedImageContainer = document.getElementById("uploaded-image-container");
            uploadedImageContainer.innerHTML = "";
            uploadedImageContainer.appendChild(image);
        }

        async function predict(image) {
            await tf.ready(); // Ensure TensorFlow.js is ready
            // Clear previous predictions
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.childNodes[i].innerHTML = "";
            }
            
            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(image);
            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }

        // Initialize the model
        init();