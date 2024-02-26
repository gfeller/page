let stream;

// Function to handle errors
function handleError(error) {
    console.error('Error: ', error);
}

// Function to start the webcam
async function startWebcam() {
    try {

        const constraints = {
            video: {
                facingMode: 'user',
                //frameRate: { ideal: Number(document.getElementById('frameRate').value) },
                //focusMode: document.getElementById('focusMode').value,
                //focusDistance: Number(document.getElementById('focusDistance').value),
                advanced: [
                    //  { iso: Number(document.getElementById('isoValue').value) },
                    //   { exposureMode: 'manual' },
                    //     { exposureTime: Number(document.getElementById('exposureTime').value) },
                    { focusMode: document.getElementById('focusMode').value },
                    { focusDistance: Number(document.getElementById('focusDistance').value) }
                ]
            }
        };
        if(!stream) {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
        }




        setTimeout(() => {

            const possibleConstraints = stream.getVideoTracks()[0].getCapabilities();
            Object.keys(constraints.video).forEach(key => {
                if(!possibleConstraints[key]){
                    delete constraints.video[key];
                }
            });
                stream.getVideoTracks()[0].applyConstraints(constraints.video).then(x=>{
                    const settings = JSON.stringify( stream.getVideoTracks()[0].getSettings());
                    const constraints = JSON.stringify(stream.getVideoTracks()[0].getConstraints());
                    const capabilities = JSON.stringify(stream.getVideoTracks()[0].getCapabilities(), undefined, 2);
                    document.getElementById("data").innerText = `Settings: ${settings}
Constraincts: ${constraints}
Capabilities : ${capabilities}
`;
                }).catch(error => {
                    document.getElementById("data").innerText = error;
                    debugger;
                })

            }
            , 100)

        const videoElement = document.getElementById('video-element');
        videoElement.srcObject = stream;
    } catch (error) {
        handleError(error);
    }
}

// Update frame rate when input changes
document.getElementById('frameRate').addEventListener('change', function() {
    stopWebcam();
    startWebcam();
});

// Update ISO value when input changes
document.getElementById('isoValue').addEventListener('change', function() {
    stopWebcam();
    startWebcam();
});

// Update exposure time when input changes
document.getElementById('exposureTime').addEventListener('change', function() {
    stopWebcam();
    startWebcam();
});

// Update color temperature when input changes
document.getElementById('colorTemperature').addEventListener('change', function() {
    stopWebcam();
    startWebcam();
});

// Update focus mode when input changes
document.getElementById('focusMode').addEventListener('change', function() {
    stopWebcam();
    startWebcam();
});

// Update focus distance when input changes
document.getElementById('focusDistance').addEventListener('change', function() {
    stopWebcam();
    startWebcam();
});

// Stop the webcam
function stopWebcam() {
    if (stream) {
      //  const tracks = stream.getTracks();
      //  tracks.forEach(track => track.stop());
    }
}

// Start the webcam when the page loads
window.onload = function() {
    startWebcam();
};