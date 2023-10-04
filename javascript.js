document.addEventListener('DOMContentLoaded', () => {
  let fetchedData; // Declare a variable to store the fetched data

  fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => response.json())
    .then(data => {
      fetchedData = data; // Assign the fetched data to the variable
      console.log(fetchedData); // Log the data to verify
    })
    .catch(error => {
      console.error('Error:', error);
    });

  const searchInput = document.getElementById('inputBuscar');
  const searchButton = document.getElementById('btnBuscar');
  const moviesList = document.getElementById('lista');
  const topContainer = document.getElementById('topContainer'); // Add this line to get the top container element

  searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    if (searchValue !== '') {
      const filteredMovies = fetchedData.filter(movie => {
        const { title, genres, tagline, overview } = movie;
        const lowercaseGenres = genres.map(genre => genre.name.toLowerCase());
        return (
          lowercaseGenres.includes(searchValue) || // Comprueba si algún género coincide
          title.toLowerCase().includes(searchValue) ||
          tagline.toLowerCase().includes(searchValue) ||
          overview.toLowerCase().includes(searchValue)
        );
      });

      moviesList.innerHTML = '';

      filteredMovies.forEach(movie => {
        const { title, tagline, vote_average } = movie;
        const stars = '⭐️'.repeat(Math.round(vote_average / 2));
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${title}</strong><br>${tagline}<br>${stars}`;
        moviesList.appendChild(listItem);

        // Add event listener to each movie item
        listItem.addEventListener('click', () => {
          // Clear the top container
          topContainer.innerHTML = '';

          // Create elements for movie details
          const movieTitle = document.createElement('h2');
          movieTitle.textContent = movie.title;

          const movieOverview = document.createElement('p');
          movieOverview.textContent = movie.overview;

          const genresList = document.createElement('ul');
          movie.genres.forEach(genre => {
            const genreItem = document.createElement('li');
            genreItem.textContent = genre.name;
            genresList.appendChild(genreItem);
          });

          // Append movie details to the top container
          topContainer.appendChild(movieTitle);
          topContainer.appendChild(movieOverview);
          topContainer.appendChild(genresList);
        });
      });
    }
  });
});