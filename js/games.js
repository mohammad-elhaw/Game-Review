import UI from "./ui.js";
import Details from "./details.js";

let menu = document.querySelectorAll(".menu a");
let games = document.querySelector(".games");
let details = document.querySelector(".details");
let loading = document.querySelector(".loading");

export default class Games{
    constructor(){
        this.getGames("mmorpg");

        menu.forEach((item)=>{
            item.addEventListener("click", (e)=>{
                document.querySelector(".menu .active").classList.remove("active");
                e.target.classList.add("active");
                this.getGames(e.target.getAttribute("data-category"));
            });
        });

        this.ui = new UI();
    }


    async getGames(category) {
        loading.classList.remove("d-none");
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
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
            this.ui.displayData(result);
            this.addItemsEvent();
        } catch (error) {
            console.error(error);
        }
        finally{
            loading.classList.add("d-none");
        }
    }

    addItemsEvent(){
        document.querySelectorAll(".card").forEach((item)=>{
            item.addEventListener("click",()=>{
                const id = item.getAttribute("data-id");
                this.showDetails(id);
            });
        });
    }

    showDetails(id){
        const theDetails = new Details(id);
        games.classList.add("d-none");
        details.classList.remove("d-none");
    }
}