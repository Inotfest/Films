import search from "./search.js";
import renderContent from "./renderContent.js";
import { variables } from "../variables.js";
import pagination from "./pagination.js";
import trimmingAnArray from "../trimmingAnArray.js";

export default async function () {
    const main = document.querySelector("#main");
    const content = document.createElement("div");
    const modalWindow = document.createElement("div");
    const boxButton = document.createElement("div");
    const moreButton = document.createElement("button");

    main.innerHTML = "";

    variables.initialValue = 0;

    variables.movieArrayRendering = variables.currentMovieArray.slice(
        variables.initialValue,
        variables.amountOfElements
    );

    moreButton.textContent = "More";

    boxButton.classList.add("more");
    moreButton.classList.add("more__button");
    modalWindow.classList.add("modal");

    moreButton.addEventListener("click", () => {
        const addContent = document.querySelector(".content");

        variables.initialValue = variables.amountOfElements;
        variables.amountOfElements += variables.selectNumberValue;

        if (variables.filter) {
            variables.movieArrayRendering = trimmingAnArray(
                variables.filteredArrayOfMovies
            );

            if (
                variables.amountOfElements >=
                variables.filteredArrayOfMovies.length
            ) {
                boxButton.classList.add("hidden");
            }
        } else {
            variables.movieArrayRendering = trimmingAnArray(
                variables.currentMovieArray
            );

            if (
                variables.amountOfElements >= variables.currentMovieArray.length
            ) {
                boxButton.classList.add("hidden");
            }
        }

        addContent.append(renderContent(variables.movieArrayRendering));
    });

    boxButton.append(moreButton);

    content.append(renderContent(variables.movieArrayRendering));
    content.append(boxButton);

    main.append(search());
    main.append(content);
    main.append(pagination());
    main.append(modalWindow);
}
