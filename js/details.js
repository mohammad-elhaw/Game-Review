
import UI from "./ui.js";

let closeBtn = document.querySelector(".btn-close");
let games = document.querySelector(".games");
let details = document.querySelector(".details");
let loading = document.querySelector(".loading");

export default class Details{

    constructor(id){
        this.ui = new UI();

        closeBtn.addEventListener("click",function(){
            details.classList.add("d-none");
            games.classList.remove("d-none");
        });

        this.getDetails(id);
    }


    async getDetails(id) {
        loading.classList.remove("d-none");
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b9b1818e42msh5a0c4b0eb3c802fp105983jsn0ab2bdce090e',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            this.ui.displayDetails(result);
        } catch (error) {
            console.error(error);
        }
        finally{
            loading.classList.add("d-none");
        }

    }
}