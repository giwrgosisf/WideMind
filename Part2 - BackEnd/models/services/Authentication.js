const { v4: uuidv4 } = require("uuid");

const daoManager = require("../DAO/DAOManager");


class Authentication {

    authenticate(username, password) {
        const userDAO = daoManager.getUserDAO;
        const sessionId = uuidv4();

        const foundUser = userDAO.findUserByPassword(username,password);

        if (foundUser === null){
            return null;
        }
        
        if (foundUser.sessionId) {
            console.log("User already logged in with sessionId:", foundUser.sessionId);
            return foundUser.sessionId; // Return the existing session ID
        }

        foundUser.sessionId = sessionId;
        console.log("User authenticated");
        return sessionId;
    }
}

module.exports = Authentication;

