class User {
    constructor(username, password, sessionId = null){
        this._username = username;
        this._password = password;
        this._sessionId = sessionId;
    }


    // setters and getters

    set username(username) {
        this._username = username;
    }

    get username(){
        return this._username
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get sessionId() {
        return this._sessionId;
    }

    
    set sessionId(sessionId) {
        this._sessionId = sessionId;
    }


    updateUser(user){
        this._username = user.username;
        this._password = user.password;
        this._sessionId = user.sessionId;
    }

}

module.exports = User;