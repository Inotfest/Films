import { variables } from "../variables";
import modalWindow from "./modalWindow";

export default function content(arr) {
    const films = document.createElement("div");
    const noSearch = document.createElement("h1");

    films.classList.add("container");
    films.classList.add("content");

    noSearch.textContent = "No search result";

    arr.forEach((film) => {
        const filmWraper = document.createElement("div");
        const cardFilm = document.createElement("div");
        const cardPhoto = document.createElement("div");
        const cardTitle = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("div");
        const like = document.createElement("div");
        const p = document.createElement("p");

        const filmImg =
            film.image === null
                ? "https://durmazz.com/writable/uploads/products/default.jpg"
                : film.image.medium;

        img.src = filmImg;
        p.textContent = film.name;
        like.innerHTML = "&#10084;";

        filmWraper.classList.add("film");
        cardFilm.classList.add("film__card");
        cardPhoto.classList.add("film__photo");
        cardTitle.classList.add("film__title");
        name.classList.add("film__name");
        like.classList.add("film__like");

        const key = film.id;
        const filmLocalStorage = JSON.parse(localStorage.getItem(key));

        if (key === filmLocalStorage?.id) {
            like.classList.add("film__like-active");
        }

        cardPhoto.addEventListener("click", () => modalWindow(film));
        name.addEventListener("click", () => modalWindow(film));

        like.addEventListener("click", () => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
                like.classList.remove("film__like-active");
            } else {
                like.classList.add("film__like-active");
                localStorage.setItem(key, JSON.stringify(film));
            }
        });

        name.append(p);
        cardPhoto.append(img);
        cardTitle.append(name);
        cardTitle.append(like);
        cardFilm.append(cardPhoto);
        cardFilm.append(cardTitle);
        filmWraper.append(cardFilm);
        films.append(filmWraper);
    });

    if (arr.length === 0) {
        return noSearch;
    } else {
        return films;
    }
}
