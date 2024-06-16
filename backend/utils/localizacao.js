const axios = require("axios").default;

const PLACE_API_KEY = "AIzaSyDGXdkdzkpCChcuyAPuC9Ur2bPVmHIzI5k";

async function apanharCoordernadasPorEndereco(endereco) {
   let coordenadas;
   try {
      const response = await axios.get(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&language=pt-BR&key=${PLACE_API_KEY}`
      );
      coordenadas = response.data.results[0].geometry.location;
      console.log("Dados apanhados com sucesso!");
      return coordenadas;
   } catch (error) {
      console.error("Erro ao apanhar enderecos");
      return error;
   }
}

exports.apanharCoordernadasPorEndereco = apanharCoordernadasPorEndereco;
