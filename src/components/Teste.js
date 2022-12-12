import { useEffect, useState } from "react";
import api from "../api/api.js";
import { exportacoes } from "../utils/montaDCP.js";

function Teste() {
  const [notas, setNotas] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const cfopExportacao = ["7101", "7105", "7127"];
  const cfopComercial = ["5501", "6501"];
  const cfopInsumos = [
    "1101",
    "1111",
    "1116",
    "1120",
    "1122",
    "2101",
    "2111",
    "2116",
    "2120",
    "2122",
  ];
  const cfopCompraTotal = [
    "1101",
    "1102",
    "1111",
    "1113",
    "1116",
    "1117",
    "1118",
    "1120",
    "1121",
    "1122",
    "2101",
    "2102",
    "2111",
    "2113",
    "2116",
    "2117",
    "2118",
    "2120",
    "2121",
    "2122",
  ];
  const cfopReceitaBruta = [
    "5101",
    "5102",
    "5103",
    "5105",
    "5109",
    "5111",
    "5113",
    "5116",
    "5118",
    "5122",
    "5124",
    "5125",
    "5403",
    "5405",
    "5656",
    "5501",
    "6101",
    "6102",
    "6103",
    "6105",
    "6107",
    "6108",
    "6109",
    "6111",
    "6113",
    "6116",
    "6118",
    "6122",
    "6124",
    "6125",
    "6401",
    "6403",
    "6405",
    "6501",
    "7101",
    "7105",
    "7127",
  ];

  useEffect(() => {
    async function fetchNotas() {
      const response = await api.get("/nfe/all-nfe", {
        params: { cnpj: "48941274000136", trim: 1, ano: 2020 },
      });
      console.log(exportacoes(response.data, 2020, 1));
      setNotas(response.data);
      setIsLoading(false);
    }
    fetchNotas();
  }, [reload]);

  return <div>oi!</div>;
}

export default Teste;
