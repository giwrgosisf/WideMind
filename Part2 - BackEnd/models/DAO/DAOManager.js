
const User = require("../entities/user");
const userDAO = require("./userDAO");

class DAOManager {
    constructor() {
        this.userDAO = new userDAO();
    }

    get getUserDAO() {
        return this.userDAO;
    }

    createTestUsers() {
        const testUsers = [
            new User("nikos_papadopoulos", "kaliMera2025"),
            new User("eleni_krivopoulou", "paradosi@2023"),
            new User("giannis_katsaros", "secreT!123"),
            new User("anastasia_papadakis", "omorfh@2024"),
            new User("kostas_antonopoulos", "1234kalimera!"),
            new User("maria_kalogeropoulou", "kwdikos!2022"),
            new User("vasilis_tzimas", "Xairete!2025"),
        ];

        for (const user of testUsers) {
            const result = this.userDAO.addUser(user);
            if (!result) {
                console.log(`Error saving user ${user.username}: User already exists.`);
            }
        }
    }
}

const daoManagerInstance = new DAOManager();
module.exports = daoManagerInstance;