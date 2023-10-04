document.addEventListener('DOMContentLoaded', () => {
  let fetchedData; fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => response.json())
    .then(data => {
      fetchedData = data; console.log(fetchedData);
    })
    .catch(error => { console.error('Error:', error); });
});
  
let buscar = document.getElementById("btnBuscar");
