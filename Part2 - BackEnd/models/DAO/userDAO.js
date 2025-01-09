const User = require("../entities/user")

class usersDAO {

    constructor() {
        this.usersList = [];
    }


    findUserById(username, sessionId) {
        let result = this.usersList.find(user => user.username === username && user.sessionId === sessionId)

        if (result === undefined) {
            result = null;
        }

        return result;
    }

    addUser(user) {
        const existingUser = this.usersList.find(u => u.username === user.username && u.password === user.password)

        if (existingUser) {
            return false;
        }

        this.usersList.push(user);
        return true;
    }


    findUserByPassword(username, password) {
        let result = this.usersList.find(user => user.username === username && user.password === password)

        if (result === undefined) {
            result = null;
        }

        return result;
    }
}

module.exports = new usersDAO();