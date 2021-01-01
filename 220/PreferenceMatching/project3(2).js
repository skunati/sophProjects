const oracleLib = require('oracle');

function randomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}


function generateInput(n) {
  let retArray = [];

  function shuffleArray(arr) {
    for (let i = n-1; i > 0; --i) {
      let r = randomInt(0,i+1)
      let temp = arr[i];
      arr[i] = arr[r];
      arr[r] = temp;
    } 
  }
  
  for (let j = 0; j < n; ++j) {
    let prefArray = [];
    for (let k = 0; k < n; ++k) {prefArray.push(k);}
    shuffleArray(prefArray);
    retArray.push(prefArray);
  }
  
  return retArray;
}



function oracle(f) {
  let numTests = 50; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 6; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = f(companies, candidates);

    test('Hires length is correct', function() {
      assert(companies.length === hires.length);
    });

    test('No equal elements', function() {
      for (let i = 0; i < hires.length; ++i) {
        for (let j = i+1; j < hires.length; ++j) {
          if ((hires[i].company === hires[j].company) || (hires[i].candidate===hires[j].candidate)) {
            assert(false);
          }
        }
      }
      assert(true);
    });

    test('First preferences test', function() {
      for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
          if ((companies[i][0] === j) && (candidates[j][0] === i)) {
            for (let k = 0; k < n; ++k) {
              if (hires[k].company === i && hires[k].candidate !== j) {assert(false);}
              if (hires[k].company !== i && hires[k].candidate === j) {assert(false);}
            }
          }
        }   
        /*if (candidates[companies[i][0]][0] === i) {
          let coprf = i;
          let caprf = companies[i][0];

          for (let j = 0; j < hires.length; ++j) {
            assert(!((hires[j].company === cprf) && (hires[j].candidate !== caprf)));
          }
        }*/
      }
      assert(true);
    });

    /*
    test('', function() {
      
    });
    */
  }
}

function runOracle(f) {
  let numTests = 100; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 4; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let offers = f(companies, candidates).trace;
    let out = f(companies,candidates).out;
    let propArray = [];
    let trArray = [];
    let assertValue = true;
    for (let j = 0; j < n; ++j) {trArray.push({match:0});}
    for (let j = 0; j < n; ++j) {propArray.push(trArray);}

    for (let k = 0; k < offers.length; ++k) {
      
      for (let l = 0; l < k; ++l) {
        if ((offers[l].from === offers[k].from) && (offers[l].to === offers[k].to) && (offers[l].fromCo === offers[k].fromCo)) {
          assertValue = false; break;}
        }
        
      if (offers[k].fromCo) {
        for (let l = 0; l < n; ++l) {
          if ((propArray[offers[k].from][l].match === 1)) {
            assertValue = false; break;}
          }
          /*
        let isPrefMatched = companies[offers[k].from].indexOf(offers[k].to);
        for (let l = 0; l < isPrefMatched; ++l) {
          let c1 = 0;
          for(let m = 0; m<n; ++m) {
            if(propArray[m][companies[offers[k].from][l]].match === 1) {++c1;}
          }
          if (c1 === 0) {assertValue = false; break;}
        }*/
      }
      if (assertValue === false) {break;}
    }
    /*
    test('Null', () => { assert(true); });

    test('', function() {
      
    });
      */
    test('runOracle master test', function() {
      assert(assertValue);
    });
  }
}


//oracle(wheat1);
//oracle(chaff1);
//console.log(generateInput(6));
//runOracle(oracleLib.traceWheat1);
//runOracle(oracleLib.traceChaff1);
