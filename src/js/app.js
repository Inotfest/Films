import locationResolver from "./locationResolver.js";
import header from "./components/header.js";
import getData from "./getData.js";
import { variables } from "./variables.js";

async function app() {
    const url = `http://api.tvmaze.com/shows?page=${variables.page}`;
    const data = await getData(url);
    variables.currentMovieArray = data.concat();
    header();
    locationResolver(window.location.hash);
}

app();
