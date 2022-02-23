export default function modalWindow(film) {
    const modalWindow = document.querySelector(".modal");
    const modalContent = document.createElement("div");
    const photoFilm = document.createElement("div");
    const titleFilms = document.createElement("div");
    const img = document.createElement("img");
    const close = document.createElement("div");
    const cross = document.createElement("span");
    const name = document.createElement("h1");
    const rating = document.createElement("p");
    const genres = document.createElement("p");
    const language = document.createElement("p");
    const summary = document.createElement("h3");
    const summaryContent = document.createElement("p");

    const filmRating = film.rating.average ? film.rating.average : "no rating";
    const filmGenres =
        film.genres.length === 0 ? "no genres" : film.genres.join(", ");

    const filmImg =
        film.image === null
            ? "https://durmazz.com/writable/uploads/products/default.jpg"
            : film.image.original;

    const filmSummary = film.summary ? film.summary : "not summary";

    img.src = filmImg;
    cross.innerHTML = "&#10006;";
    name.textContent = film.name;
    rating.textContent = `Rating: ${filmRating}`;
    genres.textContent = `Genres: ${filmGenres}`;
    language.textContent = `Language: ${film.language}`;
    summary.textContent = "Summary:";
    summaryContent.innerHTML = filmSummary;

    modalWindow.classList.add("modal-active");
    modalContent.classList.add("modal-content");
    photoFilm.classList.add("modal-content__photo");
    titleFilms.classList.add("modal-content__title");
    close.classList.add("modal-content__close");
    cross.classList.add("modal-content__cross");
    rating.classList.add("modal-content__info");
    genres.classList.add("modal-content__info");
    language.classList.add("modal-content__info");
    summaryContent.classList.add("modal-content__summary");

    close.addEventListener("click", () => {
        modalWindow.classList.remove("modal-active");
        modalWindow.textContent = "";
    });

    photoFilm.append(img);
    modalContent.append(photoFilm);

    close.append(cross);

    titleFilms.append(close);
    titleFilms.append(name);
    titleFilms.append(rating);
    titleFilms.append(genres);
    titleFilms.append(language);
    titleFilms.append(summary);
    titleFilms.append(summaryContent);

    modalContent.append(titleFilms);
    modalWindow.append(modalContent);
}
