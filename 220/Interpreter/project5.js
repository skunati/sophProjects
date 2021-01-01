function interpExpression(state, e) {
  
  if (e.kind === 'number') {
    return e.value;
  }

  else if (e.kind === 'boolean') {
     return  e.value; 
  }
  
  else if(e.kind === 'variable') {
    assert(lib220.getProperty(state, e.name).found)
    let temp = lib220.getProperty(state, e.name).value;
    let x = parser.parseExpression(temp.toString()).value;
    return x.value
  }
  
  else if (e.kind === 'operator') {
    let var1 = parser.parseExpression(interpExpression(state, e.e1).toString()).value; 
    let var2 = parser.parseExpression(interpExpression(state, e.e2).toString()).value;
    
    if (e.op === '+') {
      assert(var1.kind === 'number' && var2.kind === 'number'); 
      return var1.value + var2.value;
    } 
    else if (e.op === '-') { 
      assert(var1.kind === 'number' && var2.kind === 'number'); 
      return var1.value - var2.value;
    } 
    else if (e.op === '*') { 
      assert(var1.kind === 'number' && var2.kind === 'number'); 
      return var1.value * var2.value;
    }
    else if (e.op === '/') { 
      assert(var1.kind === 'number' && var2.kind === 'number'); 
      assert(var2 !== 0)
      return var1.value / var2.value;
    }
    else if(e.op === '&&') {
      assert(var1.kind === 'boolean' && var2.kind === 'boolean');
      return var1.value && var2.value;
    }
    else if(e.op === '||') {
      assert(var1.kind === 'boolean' && var2.kind === 'boolean');
      return var1.value ||  var2.value;
    }
    else if(e.op === '<') {
      assert(var1.kind === 'number' && var2.kind === 'number');
      return var1.value < var2.value;
    }
    else if(e.op === '>') {
      assert(var1.kind === 'number' && var2.kind === 'number');
      return var1.value > var2.value;
    }
    else if(e.op === '===') {
      assert((var1.kind === 'number' && var2.kind === 'number') || (var1.kind === 'boolean' && var2.kind === 'boolean'));
      return var1.value === var2.value;
    }
  } 
  
  else {
    assert(false);
  }
}


function interpStatement(state, s) {
  if(s.kind === 'let') {
    let value = interpExpression(state, s.expression);
    lib220.setProperty(state, s.name, value);
  }
  
  else if(s.kind === 'assignment') {
    let value = interpExpression(state, s.expression);
    lib220.setProperty(state, s.name, value);
  }
  
  else if(s.kind === 'if') {
    let value = interpExpression(state, s.test);
    
    if (value) {
      interpBlock(state, s.truePart); 
    } 
    
    else { 
      interpBlock(state, s.falsePart);
    }
  }
  
  else if(s.kind === 'while') {
    while (interpExpression(state, s.test)) { 
      interpBlock(state, s.body); 
    }
  }
  
  else if(s.kind === 'print') {
    console.log(interpExpression(state, s.expression))
  }
  
  else {assert(false)}
}


function interpBlock(state, b) {
  let i = 0;
  while(i < b.length) {
    interpStatement(state, b[i]);
    ++i;
  }
}


function interpProgram(p) {
  if(p === "error"){
    assert(false)
  }
  let state = {};
  let i = 0;
  while(i < p.length) {
    interpStatement(state, p[i]);
    ++i;
  }
  return state;
}



test("assignment", function() {
  let st = interpProgram(parser.parseProgram("let x = 10; x = 20;").value);
  assert(st.x === 20);
});


test("multiplication with a variable", function() {
  let r = interpExpression({ x: 10 }, parser.parseExpression("x * 2").value);
  assert(r === 20);
});

