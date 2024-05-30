async function inicializarMapa(refMap, lat, lng) {
   const { Map } = await google.maps.importLibrary("maps");
  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


   let map = new Map(refMap, {
      center: { lat: lat, lng: lng },
      zoom: 16,
   });

  /* let marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: lat, lng: lng },
    
  });*/

}

export default inicializarMapa;
