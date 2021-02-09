// Hides posts with given users on the page
function hidePosts() {
  chrome.storage.sync.get(['hiddenUsers'], function(result) {
    if (!result || !result.hiddenUsers) {
      return;
    }
    var posts = window.document.getElementsByClassName("entry0");
    for (var post of posts) {
      for (var i = 0; i < post.childNodes.length; i++) {
        if (post.childNodes[i].className == "bottomright duclsact") {
          usernameDiv = post.childNodes[i];
          username = usernameDiv.childNodes[0].childNodes[0].text;
          post.style.display = "block";
          if (result.hiddenUsers.includes(username)) {
            post.style.display = "none";
          }
          break;
        }        
      }
    }
  });
}

// Add a new item in the store
function addHiddenUser() {
  chrome.storage.sync.get(['hiddenUsers'], function(result) {
    var userToHide = document.getElementById("hiddenUsersInput").value;
    if (!result || !result.hiddenUsers) {
      result.hiddenUsers = []
    }  
    if (!result.hiddenUsers.includes(userToHide)) {
      result.hiddenUsers.push(userToHide);
      chrome.storage.sync.set({"hiddenUsers": result.hiddenUsers}, function() {});
      createList();
    }
    document.getElementById("hiddenUsersInput").value = "";
  });
}

function checkEnter(e) {
  if (e.key !== 'Enter') {
    return;
  }
  addHiddenUser();
}

function removeHiddenUser(username) {
  chrome.storage.sync.get(['hiddenUsers'], function(result) {
    const hiddenUsers = result.hiddenUsers.filter(user => user !== username);
    chrome.storage.sync.set({"hiddenUsers": hiddenUsers}, function() {});
    createList();
  });
}

hidePosts();

chrome.storage.onChanged.addListener(function(changes, namespace) {
  hidePosts();
});