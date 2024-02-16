import React from "react";
import styles from "./Lugar.module.css";

const dummy_lugar = {
   id: "p1",
   photoURL: "https://lh5.googleusercontent.com/p/AF1QipMssjOP5VF9FgD3Is92I3j_ofWsm9M6_u3oprQ=w520-h175-n-k-no",
   titulo: "Paragem de Onibûs Brigada",
   descricao: "Aqui nesta paragem os estudantes e trabalhadores da cidade de maputo se conectam para poder chegar aos seus destinos",
   endereco: "Brigada Bus Stop, Maputo",
   userId: "908aasdjo21j2",
   coordenadas: { long: -25.9436376, lat: 32.4593921 },
};

const Lugar = () => {
   return <div id={styles.ct}>Lugar</div>;
};

export default Lugar;
