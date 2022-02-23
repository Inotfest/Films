import about from "./components/about.js";
import films from "./components/films.js";
import favorite from "./components/favorite.js";
import contacts from "./components/contacts.js";
import notFound from "./components/notFound.js";

export default function locationResolver(location) {
    switch (location) {
        case "#/about/":
            about();
            break;
        case "#/films/":

        case "":
            films();
            break;
        case "#/favorite/":
            favorite();
            break;
        case "#/contacts/":
            contacts();
            break;
        default:
            notFound();
    }
}

window.onhashchange = function () {
    const location = window.location.hash;
    if (location) {
        locationResolver(location);
    }
};
