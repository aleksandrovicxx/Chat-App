import Chatroom from "./chat.js";
import { ChatUI } from "./ui.js";

// DOM
let ulChats = document.querySelector('ul')
let dugme = document.getElementById('sendmsg')
let inputPolje = document.getElementById('message')
let inputUsername = document.getElementById('updateUsername')
let btnupdate = document.getElementById('update')
let divBtnsForRooms = document.getElementById('btnsForRooms')
let btnForColorPicker = document.getElementById('colorBtn')
let colorFromPicker = document.getElementById('colorPicker')

// Ul on bottom

//Lokalna memorija
export let username = 'anonymus'
if(localStorage.username){
    username = localStorage.username
}

if(localStorage.backgroundColor){
    document.querySelector('#sekcijaZaPoruke').style.backgroundColor = localStorage.backgroundColor
}

let room = `#general`
// Objekti
let chatroom = new Chatroom (room, username)
let chatui = new ChatUI (ulChats)

// Prikaz objekata na stranici
chatroom.getChats(data =>{
    let msg = chatui.templateLi(data)
    chatui.list.appendChild(msg)
    inputPolje.value = ``
})

//Slanje poruke
dugme.addEventListener('click', ()=>{
    chatroom.addChat(inputPolje.value);
})

// Promena imena
btnupdate.addEventListener('click', ()=>{
    username = inputUsername.value;
    let allMessages = document.querySelectorAll('li');
    allMessages.forEach(message => {
        let usernameElement = message.querySelector('div');
        let messageUsername = usernameElement.textContent.split(':')[0].trim();
        
        if(messageUsername == username){
            message.style.textAlign = 'right'
        } else {
            message.style.textAlign = 'left'
        }
    })
    chatroom.username = inputUsername.value;
    localStorage.username = inputUsername.value
    inputUsername.value = ``;
    btnupdate.value = 'Username updated';
    setTimeout(()=>{
        btnupdate.value = `Update`
    },3000)
})

// Promena sobe
divBtnsForRooms.addEventListener('click', e =>{
    if(e.target.id == 'js'){
        let allBtns = document.querySelectorAll("input[name='room']") 
        allBtns.forEach(oneBtns => {
            oneBtns.style.backgroundColor = 'purple'
            oneBtns.style.color = 'white'
        });
        document.getElementById('js').style.backgroundColor = 'white'
        document.getElementById('js').style.border = '1px purple solid'
        document.getElementById('js').style.color = 'purple'
        chatui.delete()
        chatroom.room = `#js`
        chatroom.getChats(data =>{
            chatui.list.append(chatui.templateLi(data))
        })
    } else if (e.target.id == 'homework'){
        let allBtns = document.querySelectorAll("input[name='room']") 
        allBtns.forEach(oneBtns => {
            oneBtns.style.backgroundColor = 'purple'
            oneBtns.style.color = 'white'
        });
        document.getElementById('homework').style.backgroundColor = 'white'
        document.getElementById('homework').style.border = '1px purple solid'
        document.getElementById('homework').style.color = 'purple'
        chatui.delete()
        chatroom.room = `#homework`
        chatroom.getChats(data =>{
            chatui.list.append(chatui.templateLi(data))
        })
    } else if (e.target.id == `tests`){
        let allBtns = document.querySelectorAll("input[name='room']") 
        allBtns.forEach(oneBtns => {
            oneBtns.style.backgroundColor = 'purple'
            oneBtns.style.color = 'white'
        });
        document.getElementById('tests').style.backgroundColor = 'white'
        document.getElementById('tests').style.border = '1px purple solid'
        document.getElementById('tests').style.color = 'purple'
        chatui.delete()
        chatroom.room = `#test`
        chatroom.getChats(data =>{
            chatui.list.append(chatui.templateLi(data))
        })
    } else if (e.target.id == `general`){
        let allBtns = document.querySelectorAll("input[name='room']") 
        allBtns.forEach(oneBtns => {
            oneBtns.style.backgroundColor = 'purple'
            oneBtns.style.color = 'white'
        });
        document.getElementById('general').style.backgroundColor = 'white'
        document.getElementById('general').style.border = '1px purple solid'
        document.getElementById('general').style.color = 'purple'
        chatui.delete()
        chatroom.room = `#general`
        chatroom.getChats(data =>{
            chatui.list.append(chatui.templateLi(data))
        })
    }
})

btnForColorPicker.addEventListener('click', () =>{
    document.querySelector('#sekcijaZaPoruke').style.backgroundColor = colorFromPicker.value
    localStorage.backgroundColor = colorFromPicker.value
})

ulChats.scrollTop = ulChats.scrollHeight;// NE RADI. NE ZNAM ZASTO

// Brisanje poruke 

// korisnik3.addChat(`Nova poruka 2`)