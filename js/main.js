var bookmarks = [];

if(localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
}

var bookmarksContainer = document.getElementById('bookmarks-container');
var bookmarkIndexInput = document.getElementById('bookmarkIndexInput');
var bookmarkNameInput = document.getElementById('bookmarkNameInput');
var bookmarkUrlInput = document.getElementById('bookmarkUrlInput');
var addBookmarkBtn = document.getElementById('addBookmarkBtn');
var updateBookmarkBtn = document.getElementById('updateBookmarkBtn');
var cancelUpdateBookmarkBtn = document.getElementById('cancelUpdateBookmarkBtn');
var updateBtns = document.getElementById('updateBtns');
var bookmarkNameAlert = document.getElementById('bookmarkNameAlert');
var bookmarkUrlAlert = document.getElementById('bookmarkUrlAlert');

function renderBookmarks(){
    html = '';
    for(var i = 0; i < bookmarks.length; i++){
        var url = "https://" + bookmarks[i].url.replace(/^(http(s)?:\/\/)/,'');
        html += `<div class="bookmark-site-container d-flex justify-content-between col-6 p-4">
                    <h2>${bookmarks[i].name}</h2>
                    <div class="buttons-group">
                        <a href="${url}" target="_blank" class="btn btn-primary">Visit</a>
                        <button class="btn btn-info" onclick="updateBookmarkForm(${i})">Update</button>
                        <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button>
                    </div>
                </div>`
    }

    bookmarksContainer.innerHTML = html;
}

function addBookmark(){
    if(!validateInputs()) return;
    var bookmark = {};
    bookmark.name = bookmarkNameInput.value;
    bookmark.url = bookmarkUrlInput.value;
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    clearInputs();
}

function clearInputs(){
    bookmarkIndexInput.value = "";
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
    removeAlerts();
}

function validateName(){
    bookmarkNameAlert.classList.replace('d-block','d-none');
    var name = bookmarkNameInput.value;
    if(name.length == 0){
        bookmarkNameAlert.innerHTML = 'Please Enter a Name';
        bookmarkNameAlert.classList.replace('d-none','d-block');
        return false;
    }
    return true;
}

function validateUrl(){
    bookmarkUrlAlert.classList.replace('d-block','d-none');
    var url = bookmarkUrlInput.value;
    urlRegex = /^(http(s)?:\/\/)?(\w{3,}\.)?[\w-]+\.(com|net)$/;
    if(url.length == 0 || !urlRegex.test(url)){
        bookmarkUrlAlert.innerHTML = 'Please Enter a valid URL';
        bookmarkUrlAlert.classList.replace('d-none','d-block');
        return false;
    }
    return true;

}

function validateInputs(){
    var validName = validateName();
    var validUrl = validateUrl();
    return validName && validUrl;
}

function removeAlerts(){
    bookmarkNameAlert.classList.replace('d-block','d-none');
    bookmarkUrlAlert.classList.replace('d-block','d-none');
}

function updateBookmarkForm(i){
    removeAlerts();
    bookmarkNameInput.value = bookmarks[i].name;
    bookmarkUrlInput.value = bookmarks[i].url;
    bookmarkIndexInput.value = i;
    addBookmarkBtn.classList.replace('d-inline','d-none');
    updateBtns.classList.replace('d-none','d-block');
}

function updateBookmark(){
    if(!validateInputs()) return;
    var bookmark = {};
    var i = bookmarkIndexInput.value;
    bookmark.name = bookmarkNameInput.value;
    bookmark.url = bookmarkUrlInput.value;
    bookmarks[i] = bookmark;
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    clearInputs();
    addBookmarkBtn.classList.replace('d-none','d-inline');
    updateBtns.classList.replace('d-block','d-none');
}

function deleteBookmark(i){
    bookmarks.splice(i,1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    cancelUpdateBookmark();
    renderBookmarks();
}

function cancelUpdateBookmark(){
    addBookmarkBtn.classList.replace('d-none','d-inline');
    updateBtns.classList.replace('d-block','d-none');
    clearInputs();
}

addBookmarkBtn.addEventListener('click',addBookmark);
updateBookmarkBtn.addEventListener('click',updateBookmark);
cancelUpdateBookmarkBtn.addEventListener('click',cancelUpdateBookmark);
renderBookmarks();