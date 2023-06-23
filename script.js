const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

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
    //create the button containing delete symbol
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
    //create the icon
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}
//Event Listeners
itemForm.addEventListener('submit', addItem)