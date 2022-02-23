import renderContent from "./renderContent.js";

export default function () {
    const main = document.querySelector("#main");
    const favoriteContent = document.createElement("div");
    const modalWindow = document.createElement("div");

    main.innerHTML = "";

    favoriteContent.classList.add("favorite");
    modalWindow.classList.add("modal");

    const localStorageFilms = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        const film = localStorage.getItem(key);
        localStorageFilms.push(JSON.parse(film));
    }

    favoriteContent.append(renderContent(localStorageFilms));
    main.append(favoriteContent);
    main.append(modalWindow);
}
