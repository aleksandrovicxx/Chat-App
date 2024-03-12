class Chatroom {
    constructor (r, un){
        this.room = r;
        this.username = un;
        this.chats = db.collection('chats');
        this.unsub = false;
    }

    set room(r) {
        this._room = r;
        if(this.unsub){
            this.unsub();
        }
    }
    set username(un){
        if(un.length > 2 && un.length < 10 && un.trim() != ''){
            this._username = un;
        } else {
            alert(`Duzina korisnickog imena mora da bude izmedju 2 i 10 karaktera`)
        }
    }

    get room(){
        return this._room;
    }
    get username(){
        return this._username;
    }

    // Metod za dodavanje chat-ova
    async addChat (msg) {
        try {
        let document = {
            message: msg,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(new Date())
        }
        let response = await this.chats.add(document)
        return response;
    }
    catch {
        console.log(`Greska`, err);
    }
}

    //Metoda za ispis poruka
    getChats (callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    callback(change.doc.data());
                };
            });
        })
    }
}

export default Chatroom