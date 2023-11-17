let currentTags = [];
const FILTER_BOX = document.getElementById('js-issues-search');


function getTags(url) {
    for(let i = 1; i < url.split('+label%3A').length; i++){
        currentTags.push(url.split("+label%3A")[i])
    }
}

function saveTags(tags){
    chrome.storage.sync.set({'tags': tags}, () => {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
        console.log("saved");
    })
}

function insertToggle() {
    let modal = document.getElementById("js-issues-toolbar");
    const CHECKBOX_CONTAINER = document.createElement('div');
    
    const TOGGLE = document.createElement('input')
    TOGGLE.type = 'checkbox';
    TOGGLE.name = 'Do you want to save this search?';
    TOGGLE.id = 'save-search-toggle';
    
    TOGGLE.onchange = function (){
        if (TOGGLE.checked){
            getTags(window.location.href);
            saveTags(currentTags);
        } else {
            console.log("unchecked");
        }
    }

    const LABEL = document.createElement('label')
    LABEL.htmlFor = 'save-search-toggle';
    LABEL.textContent = "Save Search";


    CHECKBOX_CONTAINER.appendChild(TOGGLE)
    CHECKBOX_CONTAINER.appendChild(LABEL);
    modal.appendChild(CHECKBOX_CONTAINER);
}

if(document.title.startsWith("Issues")){
    console.log("Save Search Running")
    chrome.storage.sync.get('tags', (data) => {
        if (!chrome.runtime.error){
            currentTags = data;
        }
    })
    console.log(currentTags)
    insertToggle();
}
