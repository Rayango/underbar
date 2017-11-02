(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] 
      : n < array.length ? array.slice(array.length - n, array.length) : array.slice();
  };

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var index in collection) {
        if (collection.hasOwnProperty(index)) {
          iterator(collection[index], index, collection);
        }  
      }
    }
  };

  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  _.filter = function(collection, test) {
    var filteredCollection = [];
    for (var i = 0; i < collection.length; i++) {
      if (test(collection[i])) {
        filteredCollection.push(collection[i]);
      }
    }
    return filteredCollection;
  };

  _.reject = function(collection, test) {
    var rejectedCollection = []
    for (var i = 0; i < collection.length; i++) {
      if (!test(collection[i])) {
        rejectedCollection.push(collection[i]);
      }
    }
    return rejectedCollection;
  };

  _.uniq = function(array, isSorted, iterator) {
    var array2 = array.slice();
    var uniqueArray = [];

    if (!isSorted) {
      array2 = array2.sort();
    }
    if (iterator) {
      for (var i = 0; i < array2.length; i++) {
        if (iterator(array2[i]) !== iterator(uniqueArray[uniqueArray.length - 1])) {
          uniqueArray.push(array2[i]);
        } 
      }
    } else {
      for (var i = 0; i < array2.length; i++) {
        if (array2[i] !== uniqueArray[uniqueArray.length - 1]) {
          uniqueArray.push(array2[i]);
        } 
      }
    }
    return uniqueArray;
  };

  _.map = function(collection, iterator) {
    var newCollection = [];
    for (var i = 0; i < collection.length; i++) {
      newCollection.push(iterator(collection[i]));
    }
    return newCollection;
  };

  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {
    var i = 0;
    if (Array.isArray(collection)) {
      if (accumulator == null) {
        accumulator = collection[i];
        i++;
      }
      for (i; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      if (accumulator == null) {
        accumuator = Object.keys(collection)[0];
        i++;
      }
      for (i; i < Object.keys(collection).length; i++) {
        accumulator = iterator(accumulator, collection[Object.keys(collection)[i]]);
      }
    }
    return accumulator;
  };

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  _.every = function(collection, test) {
    if (test == null) {
      test = _.identity;
    }
    return _.reduce(collection, function(allTrue, element) {
      if (!allTrue) {
        return false;
      }
      return test(element) ? true : false;
    }, true);
  };

  _.some = function(collection, iterator) {
    if (iterator == null) {
      iterator = _.identity;
    }
    return _.reduce(collection, function(anyTrue, element) {
      if (anyTrue) {
        return true;
      }
      return iterator(element) ? true : false;
    }, false);
  };

  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (obj[key] == null) {
          obj[key] = arguments[i][key];
        }  
      }
    }
    return obj;
  };

  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  _.memoize = function(func) {
    var hash = {};
    return function() {
      var args = JSON.stringify(Array.prototype.slice.call(arguments));
      if (hash[args] == null) {
        hash[args] = func.apply(this, arguments);
      }
      return hash[args]; 
    }  
  };

  _.delay = function(func, wait) {
    var args = [];
    if (arguments.length > 2) {
      for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
    }
    setTimeout(func, wait, ...args);
  };

  _.shuffle = function(array) {
    var arrayCopy = array.slice();
    var randomElement;
    var shuffledArray = [];
    while (arrayCopy.length > 0) {
      randomElement = Math.floor((Math.random() * arrayCopy.length));
      shuffledArray.push(arrayCopy[randomElement]);
      arrayCopy.splice(randomElement, 1);
    }
    return shuffledArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
