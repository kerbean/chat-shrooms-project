import axios from "axios";

export default {
    // Gets Nickname
    getNick: function () {
        return axios.get("/api/nick");
    },
    // Saves Nickname
    saveNick: function (nick) {
        return axios.post("/api/nick", nick);
    }
};
