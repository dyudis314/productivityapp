// INPUT CONTROLLER (IIFE)
var inputController = (function() {


// Function constructors
var Monday = function(id, description) {
  this.id = id;
  this.description = description;
};

var Tuesday = function(id, description) {
  this.id = id;
  this.description = description;
};

var Wednesday = function(id, description) {
  this.id = id;
  this.description = description;
};

var Thursday = function(id, description) {
  this.id = id;
  this.description = description;
};

var Friday = function(id, description) {
  this.id = id;
  this.description = description;
};

var data = {
  allDays: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  }

};

return {
  addDay: function(type, des) {
    var newDay, ID;


    // Create a new ID, ID is last ID + 1
    if (data.allDays[type].length > 0) {
    ID = data.allDays[type][data.allDays[type].length - 1].id + 1;
    } else {
      ID = 0;
    }

    // (Per below) User selects 'monday', then a new item is created through the constructor. The new item is then pushed into the correpsonding array in the data object.
    
    if (type === 'monday') {
newDay = new Monday(ID, des);
    } else if (type == 'tuesday') {
      newDay = new Tuesday(ID, des)
    } else if (type == 'wednesday') {
      newDay = new Wednesday(ID, des)
    } else if (type = 'thursday') {
      newDay = new Thursday(ID, des)
    } else {
      newDay = new Friday(ID, des)
    }

data.allDays[type].push(newDay);
return newDay;
  },

  deleteItem: function(type, id) {
    var ids, index;

ids = data.allDays[type].map(function(current) {
return current.id;
});

index = ids.indexOf(id);

if (index !== -1) {
  data.allDays[type].splice(index, 1);
}

  },

  testing: function() {
    console.log(data);
  }

};


})();



// UI CONTROLLER (IIFE)

var UIController = (function() {




  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputBtn: '.add-circle-outline',
    mondayContainer: '.monday__list',
    tuesdayContainer: '.tuesday__list',
    wednesdayContainer: '.wednesday__list',
    thursdayContainer: '.thursday__list',
    fridayContainer: '.friday__list',
    container: '.container1',
    dateLabel: '.month',
    quoteLabel: '.quoteDisplay'
  };

return {
  getInput: function() {
    return {
type: document.querySelector(DOMstrings.inputType).value, // Will be either monday, tuesday, wednesday, thursday or friday
description: document.querySelector(DOMstrings.inputDescription).value
    };


  },

  addListItem: function(obj, type) {
    var html, newHtml, element;

    // Create HTML string with placeholder text

    if (type === 'monday') { // may need to edit
element = DOMstrings.mondayContainer;

    html = '<div class="item__UI" id="monday-%id%"><div class="item__description">%description%<ion-icon class="close-circle-outline" name="close-circle-outline"></ion-icon></div></div></div></div>'
  } else if (type === 'tuesday') {
    element = DOMstrings.tuesdayContainer;
    html = '<div class="item__UI" id="tuesday-%id%"><div class="item__description">%description%<ion-icon class="close-circle-outline" name="close-circle-outline"></ion-icon></div></div></div></div>'
  } else if (type === 'wednesday') {
    element = DOMstrings.wednesdayContainer;
    html = '<div class="item__UI" id="wednesday-%id%"><div class="item__description">%description%<ion-icon class="close-circle-outline" name="close-circle-outline"></ion-icon></div></div></div></div>'
  } else if (type === 'thursday') {
    element = DOMstrings.thursdayContainer;
    html = '<div class="item__UI" id="thursday-%id%"><div class="item__description">%description%<ion-icon class="close-circle-outline" name="close-circle-outline"></ion-icon></div></div></div></div>'
  } else {
    element = DOMstrings.fridayContainer;
    html = '<div class="item__UI" id="friday-%id%"><div class="item__description">%description%<ion-icon class="close-circle-outline" name="close-circle-outline"></ion-icon></div></div></div></div>'
  }

    // Replace the placeholder text with some actual data

newHtml = html.replace('%id%', obj.id);
newHtml = newHtml.replace('%description%', obj.description);

    // Insert the HTML into the DOM
document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  },

  deleteListItem: function(selectorID) {

var el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);

  },

  clearFields: function() {
    var fields, fieldsArr;
    fields = document.querySelectorAll(DOMstrings.inputDescription);

    var fieldsArr = Array.prototype.slice.call(fields);

    fieldsArr.forEach(function(current, index, array) {
current.value = "";
    });
  },

displayMonth: function() {
var now, months, month, year;

now = new Date();

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
month = now.getMonth();

year = now.getFullYear();
document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

  },

  randomQuoteGenerator: function() {
    var quotes;

quotes = [
['Anything not worth doing is not worth doing well.'],
['Power is made by power being taken.'],
['The mind\'s first step to self-awareness must be through the body.'],
['A man may well bring a horse to the water but he cannot make him drink.'],
['If it is not right, do not do it, if it is not true, do not say it.'],
['Choose not to be harmed - and you won\'t feel harmed. Don\'t feel harmed, and you haven\'t been.'],
['External things are not the problem. It’s your assessment of them. Which you can erase right now.'],
['Be tolerant with others and strict with yourself.'],
['We are more often frightened than hurt; and we suffer more in imagination than in reality.'],
['If a man knows not which port he sails, no wind is favorable.'],
['Life is very short and anxious for those who forget the past, neglect the present, and fear the future.'],
['How does it help…to make troubles heavier by bemoaning them?'],
['Don’t seek for everything to happen as you wish it would, but rather wish that everything happens as it actually will—then your life will flow well.']
]

function newQuote() {
  var randomNumber =  Math.floor(Math.random() * (quotes.length));
  document.querySelector(DOMstrings.quoteLabel).textContent = quotes[randomNumber];
 
}
return newQuote();



  },

getDOMstrings: function() {
  return DOMstrings;
}

};

})();




// GLOBAL APP CONTROLLER

var controller = (function(inputCtrl, UICtrl) {


var setupEventListeners = function() {
  var DOM = UICtrl.getDOMstrings();

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
 
 if (event.keyCode === 13 || event.which === 13) {
   ctrlAddItem();
 }
 
  });

  document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

};


  var ctrlAddItem = function() {
var input, newDay;
    

  // 1. Get the field input data
input = UICtrl.getInput();
console.log(input);

if (input.description !== "") {

  // 2. Add the item to the input controller
newDay = inputCtrl.addDay(input.type, input.description);

  // 3. Add the item to the UI
UICtrl.addListItem(newDay, input.type);

// 4. Clear the fields
UICtrl.clearFields();


}

  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

itemID = event.target.parentNode.parentNode.id;

if(itemID) {

splitID = itemID.split('-');
type = splitID[0];
ID = parseInt(splitID[1]);

// 1 Delete the item from the data structure
inputCtrl.deleteItem(type, ID);
// 2. Delete the item from UI
UICtrl.deleteListItem(itemID);
}

  };

  return {

    init: function() {
      console.log('Application has started');
      UICtrl.displayMonth();
      UICtrl.randomQuoteGenerator();
      setupEventListeners();
    }

  };


})(inputController, UIController);


controller.init();




