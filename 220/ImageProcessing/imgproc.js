let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg'); 

//function to make image redscale (no blue and green channels)
//sets blue and green color values to 0 for all pixels in an image
//removeBlueAndGreen(img: Image): Image
function removeBlueAndGreen(img){
  let result = lib220.createImage(img.width, img.height, [0,0,0]);
  for (let i = 0; i < result.width; ++i){
    for (let j = 0; j < result.height; ++j){
      let color = img.getPixel(i,j)
      result.setPixel(i,j,[color[0],0,0])
    }
  } 
  return result;
}

//function to make image grayscale
//sets RGB color values to average of color values of current pixel for each pixel in an image
//makeGrayscale(img: Image): Image
function makeGrayscale(img){
  let result = lib220.createImage(img.width, img.height, [0,0,0]);
  for (let i = 0; i < result.width; ++i){
    for (let j = 0; j < result.height; ++j){
      let color = img.getPixel(i,j)
      let average = (color[0]+color[1]+color[2])/3
      result.setPixel(i,j,[average,average,average])
    }
  } 
  return result;
}


//function which applies a transformation (using a function) to all pixels of an image
//ImageMap(img: Image, func: (p: Pixel) => Pixel): Image
function imageMap(img, f){
  let result = lib220.createImage(img.width, img.height, [0,0,0]);
  for (let i = 0; i < result.width; ++i){
    for (let j = 0; j < result.height; ++j){
      result.setPixel(i,j,f(img.getPixel(i,j)))
    }
  } 
  return result;
}


//helper function which removes blue and green channels for a single pixel
//makePixelRed(pixel: number[]): number[]
function makePixelRed(pixel){
  let color = [pixel[0], 0, 0];
  return color;
}

//helper function which converts color values to grayscale equivalent for a single pixel
//makePixelGray(pixel: number[]): number[]
function makePixelGray(pixel){
  let average = (pixel[0]+pixel[1]+pixel[2])/3
  let color = [average, average, average] 
  return color;
}

//function which uses imageMap along with a helper function makePixelRed to produce the same result as removeBlueAndGreen
//mapToRed(img: Image): Image
function mapToRed(img){
  return imageMap(img, makePixelRed);
}

//function which uses imageMap along with a helper function makePixelGray to produce the same result as makeGrayscale
//mapToGrayscale(img: Image): Image
function mapToGrayscale(img){
  return imageMap(img, makePixelGray);
}


//function which checks if passed image is of appropriate dimensions
//isImageViable(img: Image, min: number): boolean
function isImageViable(img, min){
  let minImgSize = min;
  if ((img.height < minImgSize) || (img.width < minImgSize)){
    return false;
  }
  else {return true;}
}


//function to highlight edges in an image
//calculates the absolute value of the difference of color channels in side-neighbouring pixels to determine edges
//highlightEdges(img: Image): Image
function highlightEdges(img){
  if (isImageViable(img, 2)){
    let result = lib220.createImage(img.width, img.height, [0,0,0]);
    for (let i = 0; i < result.width; ++i){
      //edge case for final column of pixels
      if (i === result.width - 1){
        continue;
      }
      for (let j = 0; j < result.height; ++j){
        let color1 = img.getPixel(i,j);
        let color2 = img.getPixel(i+1,j);
        let m1 = (color1[0] + color1[1] + color1[2])/3;
        let m2 = (color2[0] + color2[1] + color2[2])/3;
        result.setPixel(i,j,[Math.abs(m1-m2),Math.abs(m1-m2),Math.abs(m1-m2)]);        
        //edge case resolution for final pixel column
        if (i === result.width - 2){
          result.setPixel(i+1,j,[Math.abs(m1-m2),Math.abs(m1-m2),Math.abs(m1-m2)]);
        }
      }
    }
    return result;
  }
  console.log("Image is too small (edges less than 2 pixels) and cannot be used with this function.");
  return img;
}


//function which returns the average of all elements in an array containing values of a particular color channel for different pixels
//averageColorValues(arr: number[][], c: number): number
function averageColorValues(arr, c){
  let sum = 0;
  for (let i = 0; i < arr.length; ++i){
    sum += arr[i][c];
  }
  let average = sum/arr.length
  return average;
}


//functions to blur an image
//calculates the mean of each color channel of neighbouring pixel and applies the mean values to that particular pixel 
//blur(img: Image): Image
function blur(img){
  if (isImageViable(img, 2)){
    let result = lib220.createImage(img.width, img.height, [0,0,0]);
    for (let i = 0; i < result.width; ++i){
      for (let j = 0; j < result.height; ++j){
        
        let colorArray = [];
        let color1 = img.getPixel(i,j); colorArray.push(color1);
        
        //edge case for top left corner pixel
        if ((i === 0) && (j === 0)){
          let color2 = img.getPixel(i+1,j); colorArray.push(color2);
          let color3 = img.getPixel(i,j+1); colorArray.push(color3);
          let color4 = img.getPixel(i+1,j+1); colorArray.push(color4);
        }//edge case for bottom left corner pixel
        else if ((i === 0) && (j === result.height - 1)){
          let color2 = img.getPixel(i+1,j); colorArray.push(color2);
          let color3 = img.getPixel(i,j-1); colorArray.push(color3);
          let color4 = img.getPixel(i+1,j-1); colorArray.push(color4);
        }//edge case for top right corner pixel
        else if ((i === result.width - 1) && (j === 0)){
          let color2 = img.getPixel(i-1,j); colorArray.push(color2);
          let color3 = img.getPixel(i,j+1); colorArray.push(color3);
          let color4 = img.getPixel(i-1,j+1); colorArray.push(color4);
        }//edge case for bottom right corner pixel
        else if ((i === result.width - 1) && (j === result.height - 1)){
          let color2 = img.getPixel(i-1,j); colorArray.push(color2);
          let color3 = img.getPixel(i,j-1); colorArray.push(color3);
          let color4 = img.getPixel(i-1,j-1); colorArray.push(color4);
        }//edge case for left edge pixel
        else if (j === 0){
          let color2 = img.getPixel(i+1,j); colorArray.push(color2);
          let color3 = img.getPixel(i,j+1); colorArray.push(color3);
          let color4 = img.getPixel(i+1,j+1); colorArray.push(color4);
          let color5 = img.getPixel(i-1,j); colorArray.push(color5);
          let color6 = img.getPixel(i-1,j+1); colorArray.push(color6);
        }//edge case for top edge pixel
        else if (i === 0){
          let color2 = img.getPixel(i+1,j); colorArray.push(color2);
          let color3 = img.getPixel(i,j+1); colorArray.push(color3);
          let color4 = img.getPixel(i+1,j+1); colorArray.push(color4);
          let color5 = img.getPixel(i,j-1); colorArray.push(color5);
          let color6 = img.getPixel(i+1,j-1); colorArray.push(color6);
        }//edge case for right edge pixel
        else if (j === result.height - 1){
          let color2 = img.getPixel(i+1,j); colorArray.push(color2);
          let color3 = img.getPixel(i-1,j); colorArray.push(color3);
          let color4 = img.getPixel(i+1,j-1); colorArray.push(color4);
          let color5 = img.getPixel(i,j-1); colorArray.push(color5);
          let color6 = img.getPixel(i-1,j-1); colorArray.push(color6);
        }//edge case for bottom edge pixel
        else if (i === result.width - 1){
          let color2 = img.getPixel(i,j+1); colorArray.push(color2);
          let color3 = img.getPixel(i,j-1); colorArray.push(color3);
          let color4 = img.getPixel(i-1,j+1); colorArray.push(color4);
          let color5 = img.getPixel(i-1,j-1); colorArray.push(color5);
          let color6 = img.getPixel(i-1,j); colorArray.push(color6);
        }//main case for all middle pixels 
        else {
          let color2 = img.getPixel(i+1,j); colorArray.push(color2);
          let color3 = img.getPixel(i-1,j); colorArray.push(color3);
          let color4 = img.getPixel(i,j+1); colorArray.push(color4);
          let color5 = img.getPixel(i,j-1); colorArray.push(color5);
          let color6 = img.getPixel(i+1,j+1); colorArray.push(color6);
          let color7 = img.getPixel(i-1,j-1); colorArray.push(color7);
          let color8 = img.getPixel(i+1,j-1); colorArray.push(color8);
          let color9 = img.getPixel(i-1,j+1); colorArray.push(color9);
        }
        //average color value calculations
        let averageRed = averageColorValues(colorArray,0);
        let averageGreen = averageColorValues(colorArray,1);
        let averageBlue = averageColorValues(colorArray,2);
        result.setPixel(i,j,[averageRed,averageGreen,averageBlue]);
      }
    }
    return result;
  }
  console.log("Image is too small (edges less than 2 pixels) and cannot be used with this function.");
  return img;
}


//image results after passed through functions printed to console
mapToRed(robot).show();
mapToGrayscale(robot).show();
highlightEdges(robot).show();
blur(robot).show();


test('removeBlueAndGreen function definition is correct', function() {
 const white = lib220.createImage(10, 10, [1,1,1]);
 removeBlueAndGreen(white).getPixel(0,0);
});

test('No blue or green in removeBlueAndGreen result', function() {
 // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
 const white = lib220.createImage(10, 10, [1,1,1]);
 // Get the result of the function.
 const shouldBeRed = removeBlueAndGreen(white);
 // Read the center pixel.
 const pixelValue = shouldBeRed.getPixel(5, 5);
 // The red channel should be unchanged.
 assert(pixelValue[0] === 1);
 // The green channel should be 0.
 assert(pixelValue[1] === 0);
 // The blue channel should be 0.
 assert(pixelValue[2] === 0);
});