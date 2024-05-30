async function inicializarMapa(refMap, lat, lng) {
   const { Map } = await google.maps.importLibrary("maps");

   let map = new Map(refMap, {
      center: { lat: lat, lng: lng },
      zoom: 16,
   });
}

export default inicializarMapa;
