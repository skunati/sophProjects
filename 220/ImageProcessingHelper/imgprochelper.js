let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg'); 

//imageMapXY(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image 
function imageMapXY(img, func){
  let result = lib220.createImage(img.width, img.height, [0,0,0]);
  for (let i = 0; i < img.width; ++i){
    for (let j = 0; j < img.height; ++j){
      result.setPixel(i, j, func(img, i, j))
    }
  }
  return result;
}

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

//imageMask(img: Image, func: (img: Image, x: number, y: number) => boolean, maskValue: Pixel): Image
function imageMask(img, func, maskValue) {
  let result = img.copy();
  function checkMask(img, x, y) {
    if (func(img, x, y)) {return maskValue;}
    else {return img.getPixel(x,y);}
  }
  result = imageMapXY(img, checkMask);
  return result;
}

//blurPixel(img: Image, x: number, y: number): Pixel 
function blurPixel(img, x, y) {
  let width = img.width;
  let height = img.height;
  let validPixelCount = 1;

  let pixel1 = img.getPixel(x,y);
  let pixel2 = [0,0,0];
  let pixel3 = [0,0,0];
  let pixel4 = [0,0,0];
  let pixel5 = [0,0,0];
  let pixel6 = [0,0,0];
  let pixel7 = [0,0,0];
  let pixel8 = [0,0,0];
  let pixel9 = [0,0,0];

  if (x-1 >= 0 && y-1 >= 0) {pixel2 = img.getPixel(x-1,y-1); ++validPixelCount;}
  if (x+1 < width && y-1 >= 0) {pixel3 = img.getPixel(x+1,y-1); ++validPixelCount;}
  if (x-1 >= 0 && y+1 < height) {pixel4 = img.getPixel(x-1,y+1); ++validPixelCount;}
  if (x+1 < width && y+1 < height) {pixel5 = img.getPixel(x+1,y+1); ++validPixelCount;}
  if (x-1 >= 0) {pixel6 = img.getPixel(x-1,y); ++validPixelCount;}
  if (x+1 < width) {pixel7 = img.getPixel(x+1,y); ++validPixelCount;}
  if (y-1 >= 0) {pixel8 = img.getPixel(x,y-1); ++validPixelCount;}
  if (y+1 < height) {pixel9 = img.getPixel(x,y+1); ++validPixelCount;}
  
  let averageRed = (pixel1[0] + pixel2[0] + pixel3[0] + pixel4[0] + pixel5[0] + pixel6[0] + pixel7[0] + pixel8[0] + pixel9[0])/validPixelCount;
  let averageGreen = (pixel1[1] + pixel2[1] + pixel3[1] + pixel4[1] + pixel5[1] + pixel6[1] + pixel7[1] + pixel8[1] + pixel9[1])/validPixelCount;
  let averageBlue = (pixel1[2] + pixel2[2] + pixel3[2] + pixel4[2] + pixel5[2] + pixel6[2] + pixel7[2] + pixel8[2] + pixel9[2])/validPixelCount;
  let color = [averageRed, averageGreen, averageBlue];

  return color;
}

//blurImage(img: Image): Image 
function blurImage(img) {
  return imageMapXY(img, blurPixel);
}


//isGrayish(p: Pixel): boolean 
function isGrayish(p) {
  return ((p[0] >= 0.3 && p[0] <= 0.7) && (p[1] >= 0.3 && p[1] <= 0.7) && (p[2] >= 0.3 && p[2] <= 0.7)); 
}

//makePixelGrayscale(p: Pixel): Pixel
function makePixelGrayscale(p) {
  if (isGrayish(p)) {
    let average = (p[0]+p[1]+p[2])/3;
    let color = [average, average, average];
    return color;
  }
  return p;
}

////toGrayscale(img: Image): Image
function toGrayscale(img) {
  function fitImageMapXY(img, x, y) {
    let pixel = img.getPixel(x,y);
    return makePixelGrayscale(pixel);
  }
  let result = imageMapXY(img, fitImageMapXY);
  return result;
}


//makePixelSaturated(p: Pixel): Pixel
function makePixelSaturated(p) {
  let color = p
  if (color[0] > 0.7) {color[0] = 1;}
  if (color[1] > 0.7) {color[1] = 1;}
  if (color[2] > 0.7) {color[2] = 1;}
  return color;
}

//saturateHigh(img: Image): Image
function saturateHigh(img) {
  function fitImageMapXY(img, x, y) {
    let pixel = img.getPixel(x,y);
    return makePixelSaturated(pixel);
  }
  let result = imageMapXY(img, fitImageMapXY);
  return result;
}


//makePixelBlackened(p: Pixel): Pixel
function makePixelBlackened(p) {
  let color = p
  if (color[0] < 0.3) {color[0] = 0;}
  if (color[1] < 0.3) {color[1] = 0;}
  if (color[2] < 0.3) {color[2] = 0;}
  return color;
}

//blackenLow(img: Image): Imag
function blackenLow(img) {
  function fitImageMapXY(img, x, y) {
    let pixel = img.getPixel(x,y);
    return makePixelBlackened(pixel);
  }
  let result = imageMapXY(img, fitImageMapXY);
  return result;
}


//reduceFunctions(fa: ((p: Pixel) => Pixel)[] ): ((x: Pixel) => Pixel)
function reduceFunctions(fa) {
  function helperReduce(pixel, func) {return func(pixel);}
  return function(pixel) {return fa.reduce(helperReduce, pixel);}
}

//colorize(img: Image): Image
function colorize(img) {
  let functions = [makePixelGrayscale, makePixelSaturated, makePixelBlackened]
  let result = imageMap(img, reduceFunctions(functions));
  return result;
}

test('imageMapXY function definition is correct', function() {
  let identityFunction = function(image, x, y) {
    return image.getPixel(x, y);
  };
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = imageMapXY(inputImage, identityFunction);
  let p = outputImage.getPixel(0, 0);
  assert(p[0] === 0);
  assert(p[1] === 0);
  assert(p[2] === 0);
  assert(inputImage !== outputImage);
}); 

function pixelEq (p1, p2) {
  const epsilon = 0.002;
  for (let i = 0; i < 3; ++i) {
    if (Math.abs(p1[i] - p2[i]) > epsilon) {
      return false;
    }
  }
  return true;
};

test('identity function with imageMapXY', function() {
  let identityFunction = function(image, x, y ) {
    return image.getPixel(x, y);
  };
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
  inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
  inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
  let outputImage = imageMapXY(inputImage, identityFunction);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0.7, 0.8]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

// imageMask(robot, function(img, x, y) {return (y % 10 === 0);}, [1, 0, 0]).show();
// blurImage(robot).show();
// toGrayscale(robot).show();
// saturateHigh(robot).show();
// blackenLow(robot).show();
// colorize(robot).show();