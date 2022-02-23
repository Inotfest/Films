import locationResolver from "../locationResolver.js";

function header() {
    const arrayOfLinks = ["about", "films", "favorite", "contacts"];

    const header = document.createElement("header");
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    header.classList.add("header");
    nav.classList.add("nav");
    ul.classList.add("menu");

    arrayOfLinks.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = `#/${item}/`;
        a.textContent = item[0].toUpperCase() + item.slice(1);

        a.addEventListener("click", () => {
            locationResolver(`#/${item}/`);
        });

        li.classList.add("menu__element");
        a.classList.add("menu__item");

        li.append(a);
        ul.append(li);
    });

    nav.append(ul);
    header.append(nav);
    root.append(header);
}

export default header;
