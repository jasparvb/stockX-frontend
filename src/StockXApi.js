import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class StockXApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        paramsOrData._token = localStorage.getItem("stockx-token");
    
        console.debug("API Call:", endpoint, paramsOrData, verb);
  
        try {
            return (await axios({
                method: verb,
                url: `${BASE_URL}/${endpoint}`,
                [verb === "get" ? "params" : "data"]: paramsOrData})).data;
                // axios sends query string data via the "params" key,
                // and request body data via the "data" key,
                // so the key we need depends on the HTTP verb
        }
  
        catch(err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async login(data) {
        let res = await this.request(`login`, data, "post");
        return res.token;
    }
    
    static async register(data) {
        let res = await this.request(`users`, data, "post");
        return res.token;
    }
    
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }
    
    static async getStock(id) {
        let res = await this.request(`stocks/${id}`);
        return res.stock;
    }

    static async getStocks(search = {}) {
        let res = await this.request(`stocks/`, search);
        return res.stocks;
    }

    static async search(search = {}) {
        let res = await this.request(`stocks/search`, search);
        return res.stocks;
    }
}


export default StockXApi;