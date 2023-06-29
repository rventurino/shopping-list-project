const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => { addItemToDom(item)})
    checkUI()
}


function onAddItemSubmit(e) {
    e.preventDefault()

    const newItem = itemInput.value
    
    //Validate Input
    if(newItem === ''){
        alert('Please input an item')
        return;
    }

    //check for edit mode
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    } else{
        if(checkIfItemExists(newItem)){
            alert('Item already exists')
            return;
        }
    }

    //create item DOM element
    addItemToDom(newItem)
    //addd item to local storage
    addItemToStorage(newItem)
    //check UI in case empty
    //will bring back filter and clear buttons if not present
    checkUI()

    //clear input
    itemInput.value = ''
    
}

//////////////////////////////////////

//Add item to the DOM
function addItemToDom(item){
     //Create the list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))
    //create the button containing delete symbol via function call
    const button = createButton('remove-item btn-link text-red')
    //add button to li
    li.appendChild(button)
    //add li to UL in DOM
    itemList.appendChild(li)
}

function createButton(classes){
    const button = document.createElement('button')
    button.className = classes
    //create the icon via function call 
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

/////////////////////////////////

//Add item to local storage
function addItemToStorage(item){
    //initialize storage array
    const itemsFromStorage = getItemsFromStorage();


    itemsFromStorage.push(item)

    //convert to JSON string and add to storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

//pull info from local storage
function getItemsFromStorage() {
     //initialize storage array
     let itemsFromStorage;

     //if items in storage create the empty array, else parse to array and push
     if(localStorage.getItem('items') === null){
         itemsFromStorage = []
     } else {
         itemsFromStorage = JSON.parse(localStorage.getItem('items'))
     }
 
     return itemsFromStorage
}

//////////////////////////

//li click event handlers 
//function to determine what was clicked on
function onClickItem(e){
    console.log();
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    } else if(e.target.id !== 'item-list'){
        setItemToEdit(e.target)
    }
}

function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage()

    if(itemsFromStorage.includes(item)){
        return true;
    } else {
        return false;
    }
}

function setItemToEdit(item){
    isEditMode = true;
    //remove style if other element is already selected
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))
    //add edit mode styling class to clicked element
    item.classList.add('edit-mode')
    //change submit button to update mode
    formBtn.innerHTML ='<i class="fa-solid fa-pen"></i> Update Item'
    //change BG color of update button
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
}

function removeItem(item) {
    if(confirm('Are you sure?')){
        //remove from dom
        item.remove()
        //remove from storage
        removeItemFromStorage(item.textContent)
        checkUI()
    }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    //reset to local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
//////////////////////////////////

//clear button functionality
function clearItems() {
    if(confirm('Are you sure you want to remove all items?')){
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild)
        }
        //Clear from localStorage
        localStorage.removeItem('items')
        checkUI()
    }
}

//////////////////////////////////


function filterItems(e){
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        } else{
            item.style.display = 'none'
        }
    });
}


//////////////////////////////////

//Check UI state, if list is empty eliminate the clear button and "filter" box
function checkUI(){
    

    const items = itemList.querySelectorAll('li')
    if (items.length === 0){
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else{
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = '#333'

    isEditMode = false

}

//Initialize the app
function init(){
    //Event Listeners
    //event listener to add item by listening for submit event and calling addItem function
    itemForm.addEventListener('submit', onAddItemSubmit)
    //event listener to target the x button on the LI and trigger removal
    itemList.addEventListener('click', onClickItem)
    //event listener to clear entire list by clicking clear all
    clearBtn.addEventListener('click', clearItems)
    //Filter items based on text input
    itemFilter.addEventListener('input', filterItems)
    //On page load, pull existing items from storage (if applicable)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI();
}

init();


/*
//local storage crash course
session: deletes on page close
local: persistent 
Objects and arrays need stringified to store in localstorage!

localStorage.setItem('name', "Ryan")
console.log(localStorage.getItem('name'));
localStorage.removeItem('name')
localStorage.clear()
*/