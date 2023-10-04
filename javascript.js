document.addEventListener('DOMContentLoaded', () => {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
      .then(response => response.json())
      .then(data => {
        // Aquí puedes realizar cualquier operación con los datos obtenidos, como almacenarlos en una variable o procesarlos de alguna manera.
        // Sin embargo, como no quieres mostrarlos al usuario, no es necesario realizar ninguna acción adicional.
        console.log(data); // Verificar que los datos se han obtenido correctamente
      })
      .catch(error => {
        // Manejo de errores en caso de que ocurra algún problema durante la solicitud.
        console.error('Error:', error);
      });
  });