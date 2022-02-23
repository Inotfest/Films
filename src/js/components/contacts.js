export default function () {
    const main = document.querySelector("#main");

    main.innerHTML = "";

    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");

    div.classList.add("contacts");

    h1.textContent = `Author: Dima Ovchinnikov`;
    h2.textContent = `Telegram: @inotfest`;

    div.append(h1);
    div.append(h2);
    main.append(div);
}
