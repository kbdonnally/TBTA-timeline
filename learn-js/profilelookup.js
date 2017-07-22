
//Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["Javascript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(firstName, prop){
// Only change code below this line

  for (i=0; i < contacts.length; i++) { // for each entry in array
    if (contacts[i].firstName === firstName) { // if the firstName matches input
      var doesPropExist = contacts[i].hasOwnProperty(prop); // check prop input
      switch(doesPropExist) {
        case true: // if the prop input does exist
          return contacts[i][prop]; // return the value of prop
        case false: // if not, return 'No such prop'
          return 'No such property';
      }
    } else { // if the firstName in entry does NOT match input
      continue;
    }

  }
  return 'No such contact';
// Only change code above this line
}

// Change these values to test your function
lookUpProfile("Bob", "likes");


// Algorithm Challenges:

// Palindrome: (Catch all non alphanums and throw away, lowercase, test first half/last half reversed; 
// RegExp: using [\W_]+ b/c \W doesn't have underscore so brackets mean is a 2chr charset 


function palindrome(str) {
  var string = str.replace(/[\W_]+/g, '').toLowerCase();
  var len = string.length;
  var first = string.substring(0, Math.floor(len/2));
  
  if (len%2 === 1) {
    var subOdd = string.substring(Math.floor(len/2) + 1);
    // do comparison using 'string'.split('').reverse().join('');
    return first === subOdd.split('').reverse().join('');
  } else {
    var subEven = string.substring(len/2);
    return first === subEven.split('').reverse().join('');
  }
}

// Longest Word:
// Return length of longest word in a sentence (no punctuation tested; would need regex for that I think)


function findLongestWord(str) {
  var words = str.split(' ');
  var lengths = words.map(function(w) {
    return w.length;
  });
  return Math.max.apply(null, lengths);
}

findLongestWord("The quick brown fox jumped over the lazy dog");


palindrome("_eye");

// Largest #s in array of arrays:
// (Max from each sub-array)


function largestOfFour(arr) {
  // You can do this!
  var maxes = arr.map(function(subArr) { // for each subArr in arr
    return subArr.filter(function(elem) { // for each elem in subArr
      return elem === Math.max.apply(null, subArr); // filter out all but max #
    });
  }); // returns array of maxes: [[x], [y], [z]]
  return [].concat.apply([], maxes);
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1], [12, 8], [76, 234, 1, 4, 9]]);

// 1D Array to 2D Array:


function chunkArrayInGroups(arr, size) {
  var lenNewArr = function () {
    if (arr.length%size === 0) {
      return arr.length/size;
    } else {
      return Math.floor(arr.length/size) + 1;
    }
  };
  
  var newArr = [];
  /* for (i=0; i < lenNewArr(); i++) {
    newArr.push([]);
  }
  return newArr; */
  for (i=0; i<lenNewArr(); i++) {
    newArr.push(arr.slice(i*size, (i+1)*size)); // create chunks of the size that we're told; if it's past the end index, JS goes to end then quits
  }
       
  return newArr;
}

chunkArrayInGroups(["a", "b", "c", "d", 'e'], 2);
