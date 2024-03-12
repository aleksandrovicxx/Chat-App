import { username } from "./app.js"
export class ChatUI {
    constructor (l){
        this.list = l
    }

    set list(l) {
        this._list = l
    }

    get list(){
        return this._list
    }
    
     //formatDate
    formatDate(vreme) {
        let sati = vreme.getHours()
        if(sati < 10){
            sati = `0`+ sati
        }
        let minuti = vreme.getMinutes()
        if(minuti < 10){
            minuti = `0`+ minuti
        }
        let dan = vreme.getDate()
        if(dan < 10){
            dan = `0${dan}`
        }
        let mesec = vreme.getMonth()+1
        if(mesec < 10){
            mesec = `0`+mesec
        }
        let godina = vreme.getFullYear()

        let ispis = `${dan}.${mesec}.${godina}. - ${sati}:${minuti}`;

        let trenutnoVreme = new Date()
        let danasnjiDan = trenutnoVreme.getDate()
        if(danasnjiDan < 10){
            danasnjiDan = `0`+danasnjiDan
        }
        let trenutniMesec = trenutnoVreme.getMonth()+1
        if(trenutniMesec<10){
            trenutniMesec = `0` + trenutniMesec
        }
        if(dan == danasnjiDan && mesec == trenutniMesec){
            ispis = `${sati}:${minuti}`
        }
        return ispis;
    }
    //templateLi(data)
    templateLi (data){
        let divNameAndMsg = document.createElement('div')
        divNameAndMsg.style.fontSize = '21px'
        let divDate = document.createElement('div')
        divDate.style.color = 'gray'
        divNameAndMsg.innerHTML =  `<b>${data.username}:</b> ${data.message}`
        divDate.textContent = this.formatDate(data.created_at.toDate())
        let liForMsg = document.createElement('li')
        let imgDelete = document.createElement('img')
        imgDelete.id = 'imgDelete'
        imgDelete.classList.add('imgDelete')
        imgDelete.src = 'Images/DeleteMsg.png'
        imgDelete.addEventListener('click', ()=>{
            let askForDelete = confirm('Da li ste sigurni za brisanje?')
            if(askForDelete){
                if(data.username == username){
                    liForMsg.innerHTML = `Obrisali ste svoju poruku`
                    setTimeout(() => {
                        liForMsg.remove()
                        db.collection('chats')
                        .where('created_at', '==', data.created_at)
                        .where('message', '==', data.message)
                        .where('room', '==', data.room)
                        .where('username', '==', data.username)
                        .get()
                        .then((snapshot) => {
                            snapshot.forEach(msg => {
                                msg.ref.delete().then(() => {
                                    console.log("Dokument uspješno izbrisan!");
                                }).catch((error) => {
                                    console.error("Greška prilikom brisanja dokumenta: ", error);
                                });  
                            });
                        })
                    }, 3000);
                } else {
                    liForMsg.innerHTML = `Obrisali ste poruku`
                    setTimeout(() => {
                        liForMsg.remove()
                    }, 3000);
                }
            }
        })
        liForMsg.append(divNameAndMsg, divDate, imgDelete)
        if(username == data.username){
            liForMsg.classList.add('liRight')
        } else {
            liForMsg.classList.add('liLeft')

        }
        return liForMsg
    }
    delete(){
        this.list.innerHTML = ``
    };
}