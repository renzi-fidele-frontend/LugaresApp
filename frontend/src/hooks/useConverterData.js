//  Convertendo o tempo em segundos para formato de data
const useConverterData = (data) => {
   let t = new Date(data);
   let dd = t?.getDate();
   let mm = t?.getMonth() + 1;
   let yyyy = t?.getFullYear();
   let frase = `${dd < 10 ? "0" + dd : dd}/${mm < 10 && "0" + mm}/${yyyy}`;
   return frase;
};

export default useConverterData;
