document.addEventListener("DOMContentLoaded", () => {
  let fetchedData; // Declare a variable to store the fetched data
  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data; // Assign the fetched data to the variable
      console.log(fetchedData); // Log the data to verify
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
              lowercaseGenres.includes(searchValue) || // Comprueba si algún género coincide
              title.toLowerCase().includes(searchValue) ||
              tagline.toLowerCase().includes(searchValue) ||
              overview.toLowerCase().includes(searchValue)
            );
          });

          moviesList.innerHTML = "";

          filteredMovies.forEach((movie) => {
            const { title, tagline, vote_average, overview, genres } = movie;
            const stars = "⭐️".repeat(Math.round(vote_average / 2));
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `<strong>${title}</strong><br>${tagline}<br>${stars}`;
            moviesList.appendChild(listItem);

            listItem.addEventListener("click", () => {
              listItem.innerHTML = `<div class="card text-muted" href="#offcanvasExample"><h2><strong>${title}</strong></h2>\n <hr> ${overview}\n
              <hr>
              ${genres
                .map((genre) => genre.name)
                .join(", ")} 
              <hr>
              </div>
              <strong>${title}</strong>
              <br>${tagline}<br>${stars}`;
            });
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
});
/*<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Dropdown button
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item">Action</a></li>
                </ul>*/