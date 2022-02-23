export default function notFound() {
    const main = document.querySelector("#main");
    main.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = "Error 404. Page not found";

    main.append(h1);
}
