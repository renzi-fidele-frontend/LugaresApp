async function inicializarMapa(refMap, lat, lng) {
   const { Map } = await google.maps.importLibrary("maps");
   const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

   const map = new Map(refMap, {
      center: { lat: lat, lng: lng },
      zoom: 16,
      mapId: "787418ad62470b71",
   });

   // Mudar a cor do fundo
   const pinBackground = new PinElement({
      background: "#6c63ff",
      glyphColor: "white",
      scale: 1.2,
   });

   const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat: lat, lng: lng },
      content: pinBackground.element,
   });
}

export default inicializarMapa;
