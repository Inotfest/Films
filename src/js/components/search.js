import { variables } from "../variables";
import renderContent from "./renderContent.js";
import getData from "../getData";
import trimmingAnArray from "../trimmingAnArray";

export default function search() {
    const searchWrapper = document.createElement("div");
    const inputBox = document.createElement("div");
    const selectBox = document.createElement("div");

    const input = document.createElement("input");
    const button = document.createElement("button");

    const selectNumber = document.createElement("select");
    const selectLanguages = document.createElement("select");
    const selectGenres = document.createElement("select");

    button.textContent = "Search";

    variables.arrayNumberOfElements.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = "Show " + item;
        selectNumber.append(option);
    });

    variables.arrayOfGenres.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        selectGenres.append(option);
    });

    variables.arrayOfLanguages.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        selectLanguages.append(option);
    });

    selectNumber.value = variables.selectNumberValue;

    searchWrapper.classList.add("films");
    searchWrapper.classList.add("container");

    inputBox.classList.add("box-input");
    input.classList.add("box-input__input");
    button.classList.add("box-input__button");

    selectBox.classList.add("select-box");
    selectNumber.classList.add("select-box__select");
    selectLanguages.classList.add("select-box__select");
    selectGenres.classList.add("select-box__select");

    inputBox.append(input);
    inputBox.append(button);

    selectBox.append(selectNumber);
    selectBox.append(selectLanguages);
    selectBox.append(selectGenres);

    searchWrapper.append(inputBox);
    searchWrapper.append(selectBox);

    selectNumber.addEventListener("change", () => {
        const content = document.querySelector(".content");
        content.innerHTML = "";

        variables.initialValue = 0;
        variables.amountOfElements = +selectNumber.value;
        variables.selectNumberValue = +selectNumber.value;

        if (variables.filter) {
            variables.movieArrayRendering = trimmingAnArray(
                variables.filteredArrayOfMovies
            );
        } else {
            variables.movieArrayRendering = trimmingAnArray(
                variables.currentMovieArray
            );
        }

        content.append(renderContent(variables.movieArrayRendering));
    });

    button.addEventListener("click", async () => {
        const content = document.querySelector(".content");
        content.innerHTML = "";

        variables.initialValue = 0;
        variables.amountOfElements = +selectNumber.value;
        variables.selectNumberValue = +selectNumber.value;

        const more = document.querySelector(".more");
        const pagination = document.querySelector(".pagination__content");

        if (input.value) {
            selectNumber.setAttribute("disabled", "disabled");

            more.classList.add("hidden");
            pagination.classList.add("hidden");

            const url = `https://api.tvmaze.com/search/shows?q=${input.value}`;
            const data = await getData(url);
            const arrayOfFoundMovies = data.map((film) => film.show);

            const newArr = movieFiltering(arrayOfFoundMovies);

            content.append(renderContent(newArr));
        } else if (
            selectGenres.value !== "All genres" ||
            selectLanguages.value !== "All languages"
        ) {
            variables.filter = true;

            more.classList.remove("hidden");

            variables.filteredArrayOfMovies = movieFiltering(
                variables.currentMovieArray
            );

            variables.movieArrayRendering = trimmingAnArray(
                variables.filteredArrayOfMovies
            );

            if (
                variables.amountOfElements >=
                variables.filteredArrayOfMovies.length
            ) {
                more.classList.add("hidden");
            }

            pagination.classList.add("hidden");
            content.append(renderContent(variables.movieArrayRendering));
        } else {
            variables.initialValue = 0;
            variables.amountOfElements = +selectNumber.value;
            more.classList.remove("hidden");
            pagination.classList.remove("hidden");

            selectNumber.removeAttribute("disabled");
            variables.filter = false;
            variables.movieArrayRendering = trimmingAnArray(
                variables.currentMovieArray
            );

            content.append(renderContent(variables.movieArrayRendering));
        }
    });

    function movieFiltering(arr) {
        const filteredArrayByLanguages = [];
        const resulFilter = [];

        if (selectLanguages.value !== "All languages") {
            arr.forEach((film) =>
                film.language.includes(selectLanguages.value)
                    ? filteredArrayByLanguages.push(film)
                    : false
            );
        } else {
            filteredArrayByLanguages.push(...arr);
        }

        if (selectGenres.value !== "All genres") {
            filteredArrayByLanguages.forEach((film) =>
                film.genres.includes(selectGenres.value)
                    ? resulFilter.push(film)
                    : false
            );
        } else {
            resulFilter.push(...filteredArrayByLanguages);
        }

        return resulFilter;
    }

    return searchWrapper;
}
