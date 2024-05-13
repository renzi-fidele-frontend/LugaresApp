const axios = require("axios").default;

const PLACE_API_KEY = "AIzaSyDGXdkdzkpCChcuyAPuC9Ur2bPVmHIzI5k";

async function apanharCoordernadasPorEndereco(endereco) {
   let coordenadas;
   const response = await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&language=pt-BR&key=${PLACE_API_KEY}`)
      .then((v) => {
         console.log("Dados apanhados com sucesso!");
         console.log(v.data);
         coordenadas = v.data.results[0].geometry.location;
         return coordenadas;
      })
      .catch((erro) => {
         console.error("Erro ao apanhar enderecos");
         console.log(erro);
      });
   return coordenadas;
}

exports.apanharCoordernadasPorEndereco = apanharCoordernadasPorEndereco;
