const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')

function addItem(e) {
    e.preventDefault()

    const newItem = itemInput.value
    
    //Validate Input
    if(newItem === ''){
        alert('Please input an item')
        return;
    }

    //Create the list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))
    //create the button containing delete symbol via function call
    const button = createButton('remove-item btn-link text-red')
    //add button to li
    li.appendChild(button)
    //add li to UL 
    itemList.appendChild(li)
    //clear input
    itemInput.value = ''
    
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

//////////////////////////

function removeItem(e) {
    /*
    //Demo
    console.log(e.target)
    e.target.remove();
    //Behavior here doesn't work. This will log the X button and delete ONLY the X
    */
   if(e.target.parentElement.classList.contains('remove-item')){
    //e.target = icon
    //e.target.parentElement = button containing icon
    //e.target.parentElement.parentElement = entire LI containing text, button, and icon
    e.target.parentElement.parentElement.remove()

   }
}

//////////////////////////////////

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
}

//Event Listeners
//event listener to add item by listening for submit event and calling addItem function
itemForm.addEventListener('submit', addItem)
//event listener to target the x button on the LI and trigger removal
itemList.addEventListener('click', removeItem)
//event listener to clear entire list by clicking clear all
clearBtn.addEventListener('click', clearItems)