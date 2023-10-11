document.addEventListener("DOMContentLoaded", () => {
  let fetchedData;

  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("inputBuscar");
  const searchButton = document.getElementById("btnBuscar");
  const moviesList = document.getElementById("lista");

  searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    if (searchValue !== "") {
      fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredMovies = data.filter((movie) => {
            const { title, genres, tagline, overview } = movie;
            const lowercaseGenres = genres.map((genre) =>
              genre.name.toLowerCase()
            );
            return (
              lowercaseGenres.includes(searchValue) ||
              title.toLowerCase().includes(searchValue) ||
              tagline.toLowerCase().includes(searchValue) ||
              overview.toLowerCase().includes(searchValue)
            );
          });

          moviesList.innerHTML = "";

          filteredMovies.forEach((movie, index) => {
            const { title, tagline, vote_average, overview, genres, release_date, runtime, budget, revenue} = movie;
            const stars = "⭐️".repeat(Math.round(vote_average / 2));
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.classList.add("bg-dark");
            const releaseYear = new Date(release_date).getFullYear();

            const buttonId = `btn-${index}`;
            const offcanvasId = `offcanvas-${index}`;

            const buttonWrapper = document.createElement("div");
            buttonWrapper.classList.add("justify-content-between");
            
            
            const movieInfo = document.createElement("div");
            movieInfo.innerHTML = `<div id="${buttonId}" class=" text-white text-start" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasId}">
            <div class="row">
              <div class="col-10 text-left">
                <strong>${title}</strong>
                <br>
                <span class="text-muted">${tagline}</span>
              </div>
              <div class="col-2 text-end"> 
                <span>${stars}</span>
              </div>
            </div>
          </div>
            
            <div class="offcanvas offcanvas-top" tabindex="-1" id="${offcanvasId}" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel"><strong>${title}</strong></h5>
            </div>
            <div class="btn text-start d-flex justify-content-between">\n
            <div>${overview}\n
            <hr>
          </div>
          </div>
            <div class="text-start m-3 d-flex justify-content-between">
            ${genres.map((genre) => genre.name).join(", ")}
          
            <button class="btn btn-secondary m-2 dropdown-toggle" type="button" data-bs-toggle="dropdown">
            More
            </button>
            <ul class="dropdown-menu">
                  <li><p class="dropdown-item">Year: ${releaseYear}</p></li>
                  <li><p class="dropdown-item">Runtime: ${runtime} mins</p></li>
                  <li><p class="dropdown-item">Budget: $${budget}</p></li>
                  <li><p class="dropdown-item">Revenue: $${revenue}</p></li>
                </ul>
            </div>
            </div>`;

            buttonWrapper.appendChild(movieInfo);
            listItem.appendChild(buttonWrapper);
            moviesList.appendChild(listItem);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
});
