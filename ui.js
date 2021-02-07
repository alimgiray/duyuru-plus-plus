
function createContainer() {
  var div = document.createElement('div');
  div.setAttribute("id", "hiddenUsers");
  
  document.getElementsByClassName("sidebar")[0].appendChild(div);
}

function createHeader() {
  var div = document.createElement('div')
  div.setAttribute("id", "hiddenUsersHeader");
  div.innerText = "Engellenenler";
  
  document.getElementById("hiddenUsers").appendChild(div);
}

function createInput() {
  var div = document.createElement('div')
  div.setAttribute("id", "hiddenUsersInputArea")

  var input = document.createElement('input');
  input.setAttribute("id", "hiddenUsersInput");
  div.appendChild(input);

  var btn = document.createElement("button");
  btn.innerText = "+";
  btn.addEventListener("click", addHiddenUser);
  div.appendChild(btn);

  document.getElementById("hiddenUsers").appendChild(div);
}

function createList() {
  // If created before, delete the list and than rerender
  if(document.getElementById("hiddenUsersList")){
    document.getElementById("hiddenUsersList").remove();
  }

  var div = document.createElement('div')
  div.setAttribute("id", "hiddenUsersList");

  var ul = document.createElement('ul');
  div.appendChild(ul);

  chrome.storage.sync.get(['hiddenUsers'], function(result) {
    result.hiddenUsers.forEach(hiddenUser => {
      
      var li = document.createElement('li');
      
      var span = document.createElement('span');
      span.setAttribute('class', 'hiddenUserName');
      span.innerText = hiddenUser;

      var btn = document.createElement('button');
      btn.innerText = '-';
      btn.addEventListener("click", function(){
        removeHiddenUser(hiddenUser);
    }, false);
      
      li.appendChild(btn);
      li.appendChild(span);
      
      ul.appendChild(li);
    });
  });

  document.getElementById("hiddenUsers").appendChild(div);
}

function createWidget() {
  createContainer();
  createHeader();
  createInput();
  createList();
}

createWidget();