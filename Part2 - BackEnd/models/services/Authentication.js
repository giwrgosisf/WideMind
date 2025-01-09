const { v4: uuidv4 } = require("uuid");

const DAOManager = require("../DAO/DAOManager");
const daoManager = new DAOManager();

class Authentication {

    authenticate(username, password) {
        const userDAO = daoManager.getUserDAO;
        const sessionId = uuidv4();

        const foundUser = userDAO.findUserByPassword(username,password);

        if (foundUser === null){
            return null;
        }

        foundUser.sessionId = sessionId;
        console.log("User authenticated");
        return sessionId;
    }
}

module.exports = Authentication;

