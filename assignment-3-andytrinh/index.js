/*
 * Write your JS code in this file.
 */
var Post = [];

var allPostElems = [];

var modal = document.getElementById('sell-something-modal');

var btn = document.getElementById("sell-something-button");

var create = document.getElementById('modal-accept');

var xclose = document.getElementById('modal-close');

var cancel = document.getElementById('modal-cancel');

var hidden = document.getElementById('modal-backdrop');

var input1 = document.getElementById('post-text-input');

var input2 = document.getElementById('post-photo-input');

var input3 = document.getElementById('post-price-input');

var input4 = document.getElementById('post-city-input');

var content1 = document.getElementsByClassName('content');

var filterContainer = document.getElementsByClassName('filter-container');

var filterButton = document.getElementById('filter-update-button');

function addElementToArray () {
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPostElems.push(postElems[i]);
  }
}

function filter () {
  addElementToArray();
  var text = document.getElementById('filter-text').value.toLowerCase(); //user inputs
  var min = document.getElementById('filter-min-price').value;
  var max = document.getElementById('filter-max-price').value;
  var city = document.getElementById('filter-city').value.toLowerCase();
  var condition = []; //post conditions
  var title = [];
  var price = [];
  var postCity = [];

  //stores title of elements into the array
  for(var i = 0; i < 8; i++) {
    title[i] = allPostElems[i].getElementsByClassName('post-title')[0].text.toLowerCase();
  }

  //stores price of elements into the array
  for(var i = 0; i < 8; i++) {
    price[i] = Number(allPostElems[i].getAttribute('data-price'));
  }

  //stores city of elements into the array
  for(var i = 0; i < 8; i++) {
    postCity[i] = allPostElems[i].getAttribute('data-city').toLowerCase();
  }

  //stores condition of elements into the array
  for(var i = 0; i < 8; i++) {
    condition[i] = allPostElems[i].getAttribute('data-condition');
  }

  //filters for min
  for(var i = 0; i < 8; i++) {
    if(min != "") { //checks if min is not empty
      if (price[i] < min) {
        allPostElems[i].style.display = "none";
      }
    }
  }

  //filters for max
  for(var i = 0; i < 8; i++) {
    if (max != "") { //checks if max is not empty
      if (price[i] > max) {
        allPostElems[i].style.display = "none";
      }
    }
  }

  //filters for city
  for(var i = 0; i < 8; i++) {
    if (city != "") { //checks for emptiness
      if (postCity[i] !== city) {
        allPostElems[i].style.display = "none";
      }
    }
  }

  //filters for title
  for(var i = 0; i < 8; i++) {
    if (text != "") { //checks for emptiness
      if (title[i].indexOf(text) === -1) {
        allPostElems[i].style.display = "none";
      }
    }
  }

  //filters for condition
  for(var i = 0; i < 8; i++) {
    var filterCondition = document.querySelector('#filter-condition input:checked').value;
    if (filterCondition == "new" || "excellent" || "good" || "fair" || "poor") {
      if(condition[i].indexOf(filterCondition) === -1) {
        allPostElems[i].style.display = "none";
      }
    }
  }
}

filterButton.addEventListener('click', filter);

btn.onclick = function () {
    modal.style.display = "block";
}

xclose.onclick = function () {
  modal.style.display = "none";
  hidden.style.display = "none";
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  var input5 = document.querySelector('#post-condition-fieldset input[checked]');
  input5.checked = true;
}

cancel.onclick = function () {
  modal.style.display = "none";
  hidden.style.display = "none";
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  var input5 = document.querySelector('#post-condition-fieldset input[checked]');
  input5.checked = true;
}

close.onclick = function () {
  $.modal.close();
}

function Create(text, picture, cost, city, condition) {
  var WholeContainer = document.createElement('div');
  WholeContainer.classList.add('post');
  WholeContainer.setAttribute('data-price', cost);
  WholeContainer.setAttribute('data-city', city);
  WholeContainer.setAttribute('data-condition', condition);

  var TextContainer = document.createElement('div');
  TextContainer.classList.add('post-contents');
  WholeContainer.appendChild(TextContainer);

  var PictureCont = document.createElement('div');
  PictureCont.classList.add('post-image-container');
  TextContainer.appendChild(PictureCont);

  var Image = document.createElement('img');
  Image.src = picture;
  Image.alt = text;
  PictureCont.appendChild(Image);

  var ContentContainer = document.createElement('div');
  ContentContainer.classList.add('post-info-container');
  TextContainer.appendChild(ContentContainer);

  var Title = document.createElement('a');
  Title.classList.add('post-title');
  Title.textContent = text;
  ContentContainer.appendChild(Title);

  var space1 = document.createTextNode(' ');
  ContentContainer.appendChild(space1);

  var CostSpan = document.createElement('span');
  CostSpan.classList.add('post-price');
  CostSpan.textContent = '$' + cost;
  ContentContainer.appendChild(CostSpan);

  var space2 = document.createTextNode(' ');
  ContentContainer.appendChild(space2);

  var CitySpan = document.createElement('span');
  CitySpan.classList.add('post-city');
  CitySpan.textContent = '('+city+')';
  ContentContainer.appendChild(CitySpan);
  return WholeContainer;
}

function checkFields(text, picture, cost, city, condition) {
  if (!text){
    alert("One or more fields have not been entered.");
    exit();
  }
  if (!picture){
    alert("One or more fields have not been entered.");
    exit();
  }
  if (!cost) {
    alert("One or more fields have not been entered.");
    exit();
  }
  if(!city){
    alert("One or more fields have not been entered.");
    exit();
  }
  if(!condition) {
    alert("One or more fields have not been entered.");
    exit();
  }
}

function acceptCreate() {
  var picture = document.getElementById('post-photo-input').value;
  var text = document.getElementById('post-text-input').value;
  var cost = document.getElementById('post-price-input').value;
  var condition = document.querySelector('#post-condition-fieldset input:checked').value;
  var city = document.getElementById('post-city-input').value;

  checkFields(text, picture, cost, city, condition);

  var newElement = Create(text, picture, cost, city, condition);
  Post.push(newElement);

  var newElement2 = document.getElementById('posts');
  newElement2.appendChild(newElement);

  modal.style.display = "none";
  hidden.style.display = "none";
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  var input5 = document.querySelector('#post-condition-fieldset input[checked]');
  input5.checked = true;
}

create.addEventListener('click', acceptCreate);

//closes modal if clicked outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    hidden.style.display = "none";
    input1.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    var input5 = document.querySelector('#post-condition-fieldset input[checked]');
    input5.checked = true;
  }
}
