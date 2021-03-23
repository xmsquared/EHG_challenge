import React, {useEffect, useRef} from 'react';

const ImageGenerator = () => {
  const width = 256;
  const height = 128;
  // Record red, green, blue components for each pixel
  const rgbData = [0, 0, 0];
  let red = useRef(rgbData[0]);
  let green = useRef(rgbData[1]);
  let blue = useRef(rgbData[2]);

  // Update the image and clear the previous image after any state change, leave for future function need
  useEffect (() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Use imageData, One dimetion array, store data as format [red, green, blue, alpha, ....
    // One set represents color for one pixel, so array iterate 4 units each time 
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Each component breaks into 32 steps, it increase in 8 each time, once it reaches 256, record 255 instead
      if (blue.current > 255){
        imageData.data[i + 2] = 255;
        blue.current = 8;
      }

      imageData.data[i + 0] = red.current; 
      imageData.data[i + 1] = green.current; 
      imageData.data[i + 2] = blue.current; 
      imageData.data[i + 3] = 255; 

      blue.current += 8;

      // change red component in every 32 pixels, and change green component in every 1024 pixels to ensure no dulplicate color
      if (i > 0) {
        const pixel_index = i / 4;
        if (pixel_index % 32 === 0) {
          red.current += 8;
          imageData.data[i + 0] = red.current;
          if (red.current > 255){
            imageData.data[i + 0] = 255;
            red.current = 8;
          }
        }

        if (pixel_index % Math.pow(32, 2)=== 0) {
          green.current += 8;
          imageData.data[i + 1] = green.current;
          if (green.current > 255){
            imageData.data[i + 1] = 255;
            green.current = 8;
          }
        }
      }
    }

    // draw the image
    ctx.putImageData(imageData, 0, 0);
  
  }
  );

  return (
      <div>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h1>Display Image</h1>
        </div>

        <div style={{ textAlign: "center" }}>
            <canvas id="canvas" width={width} height={height}></canvas>
        </div>

    </div>
  );
}

export default ImageGenerator