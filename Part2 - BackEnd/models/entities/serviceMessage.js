class serviceMessage extends Error {
    code = null

    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}

module.exports = serviceMessage;