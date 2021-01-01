class FluentRestaurants {
  
  constructor(jsonData) {
    this.data = jsonData; 
  }

  
  fromState(stateStr) {
    return new FluentRestaurants(this.data.filter(function(x) {
      let s = lib220.getProperty(x, 'state');
      if (s.found) {
        if (s.value === stateStr) {return true;}}
      return false;
    }));
  }


  ratingLeq(rating) {
    return new FluentRestaurants(this.data.filter(function(x) {
      let s = lib220.getProperty(x, 'stars');
      if (s.found) {
        if (s.value <= rating) {return true;}}
      return false;
    }));
  }


  ratingGeq(rating) {
    return new FluentRestaurants(this.data.filter(function(x) {
      let s = lib220.getProperty(x, 'stars');
      if (s.found) {
        if (s.value >= rating) {return true;}}
      return false;
    }));
  }


  category(categoryStr) {
    return new FluentRestaurants(this.data.filter(function(x) {
      let s = lib220.getProperty(x, 'categories');
      if (s.found) {
        if (s.value.includes(categoryStr)) {return true;}}
      return false;
    }));
  }


  hasAmbience(ambienceStr) {
    return new FluentRestaurants(this.data.filter(function(x) {
      let s = lib220.getProperty(x, 'attributes');
      if (s.found) {
        if (lib220.getProperty(s.value, ambienceStr).found) {return true;}}
      return false;
    }));
  }


  bestPlace() {
    if (this.data.length === 0) {return {name: "No places match search query"}};
    
    let max = 0;
    let max2 = 0;
    
    let l = this.data.filter(function(x) {if (lib220.getProperty(x, 'stars').value >= max) {
      max = lib220.getProperty(x, 'stars').value;
      return true;
      }})

    let g = l.filter(function(x) {if (lib220.getProperty(x, 'stars').value >= max) {return true;}})

    let c = g.filter(function(x) {if (lib220.getProperty(x, 'review_count').value >= max2) {
      max = lib220.getProperty(x, 'review_count').value;
      return true;
    }})

    let b = c.filter(function(x) {if (lib220.getProperty(x, 'review_count').value >= max) {return true;}})
    return b[0];
  }
}

let f = new FluentRestaurants(lib220.loadJSONFromURL('https://people.cs.umass.edu/~joydeepb/yelp.json'));

/*
console.log(f.ratingLeq(5)
 .ratingGeq(3)
 .category('Restaurants')
 .hasAmbience('casual')
 .fromState('NV')
 .bestPlace().name);

console.log(f.ratingLeq(4)
 .ratingGeq(2)
 .category('Restaurants')
 .hasAmbience('romantic')
 .fromState('AZ')
 .bestPlace().name);


const testData = [
{
 name: "Applebee's",
 state: "NC",
 stars: 4,
 review_count: 6,
 },
 {
 name: "China Garden",
 state: "NC",
 stars: 4,
 review_count: 10,
 },
 {
 name: "Beach Ventures Roofing",
 state: "AZ",
 stars: 3,
 review_count: 30,
 },
 {
 name: "Alpaul Automobile Wash",
 state: "NC",
 stars: 3,
 review_count: 30,
 }
]

test('fromState filters correctly', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.fromState('NC').data;
 assert(list.length === 3);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "China Garden");
 assert(list[2].name === "Alpaul Automobile Wash");
});

test('bestPlace tie-breaking', function() {
 let tObj = new FluentRestaurants(testData);
 let place = tObj.fromState('NC').bestPlace();
 assert(place.name === 'China Garden');
});
*/
