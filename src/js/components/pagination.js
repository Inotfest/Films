import { variables } from "../variables";
import getData from "../getData.js";
import films from "./films";

export default function pagination() {
    const paginationWraper = document.createElement("div");
    const paginationContent = document.createElement("div");
    const previousPage = document.createElement("button");
    const nextPage = document.createElement("button");
    const currentPage = document.createElement("span");
    const dropdown = document.createElement("div");

    previousPage.textContent = "<";
    nextPage.textContent = ">";
    currentPage.textContent = variables.page + 1;

    paginationWraper.classList.add("pagination");
    paginationContent.classList.add("pagination__content");
    currentPage.classList.add("pagination__page");
    dropdown.classList.add("pagination__dropdown");
    dropdown.classList.add("hidden");

    if (variables.page <= 0) {
        previousPage.classList.add("hidden");
    } else {
        previousPage.classList.add("pagination__button");
    }

    if (variables.page > 18) {
        nextPage.classList.add("hidden");
    } else {
        nextPage.classList.add("pagination__button");
    }

    for (let i = 1; i <= 20; i++) {
        const itemDropdown = document.createElement("div");

        itemDropdown.textContent = "Page " + i;
        itemDropdown.classList.add("pagination__item-dropdown");

        itemDropdown.addEventListener("click", () => {
            variables.page = i - 1;
            getPage();
        });

        dropdown.append(itemDropdown);
    }

    previousPage.addEventListener("click", () => {
        variables.page--;
        getPage();
    });

    nextPage.addEventListener("click", () => {
        variables.page++;
        getPage();
    });

    currentPage.addEventListener("click", () => {
        dropdown.classList.toggle("visible");
    });

    paginationContent.append(previousPage);
    paginationContent.append(currentPage);
    paginationContent.append(nextPage);
    paginationWraper.append(dropdown);
    paginationWraper.append(paginationContent);

    async function getPage() {
        const url = `http://api.tvmaze.com/shows?page=${variables.page}`;

        variables.amountOfElements = variables.selectNumberValue;
        variables.currentMovieArray = [];

        const data = await getData(url);
        variables.currentMovieArray = data.concat();

        films();
    }

    return paginationWraper;
}
