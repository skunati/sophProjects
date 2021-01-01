class State{
  
  constructor(){ 
   
    let name = "";
    let transitions = [];
    
    this.getT = () => transitions;
    this.setName = (s) => {
      name = s;   
      return this;
    };
    

    this.nextState = (input) => {
      let tran = transitions.filter(function callback(x){lib220.getProperty(x, input).found})
      let x = "";
      if(tran.length!==0) {x = tran[0].input;};
      
      return x;
    };


    this.addTransition = (s1, s2) => {
      let a = {}
      lib220.setProperty(a,s1,s2)
      transitions.push(a)
      
      return this;
      };
    
    
    this.getName = () => name;
  }
}



class Memento{
  
  constructor(){
    
    let state = "";
    this.storeState = (curState) => {
      state = curState; 
      return this;
    }
    this.getState = () => state;
  }
}



class FSA {
  
  constructor() {
    
    let currentState = "";
    let arrayOfStates = [];
    

    this.nextState = (input) => {      
      if(currentState === "") {return this;}      
      
      let state = currentState.nextState(input);
      let sameState = arrayOfStates.filter(
        function(x){
          x.getName() === state;
        });
      
      if(sameState.length !== 0) {currentState = sameState[0]};      
      
      return this;
    };
    

    this.createState = (stateName, outs) => {      
      if(stateName === "") {return this;}
      
      let tempS = new State();
      tempS.setName(stateName);
      
      outs.forEach(function(x) {
        tempS.addTransition(Object.keys(x)[0], lib220.getProperty(x,Object.keys(x)[0]).value);
        })
      
      let check = arrayOfStates.findIndex(function (x) {
        return x.getName() === stateName;
        })
      
      if(check === -1) {arrayOfStates.push(tempS);}
      else {arrayOfStates[check] = tempS;}
      if(arrayOfStates.length === 0) {currentState = tempS;}
      
      return this;
    };
    

    this.getStateDescription = () => {      
      if(currentState === "") {return "";} 
      else {return currentState.getName();}
    };
    
    
    this.createMemento = () => {
      let tempM = new Memento(); 
      if(currentState !== "") {tempM.storeState(currentState);}
      
      return tempM;
    };
    
    
    this.restoreMemento = (prevState) => {
      currentState = prevState.getState(); 
      
      return this;
    };
  } 
}