import { toast } from "react-hot-toast";

import api from "../api/api.js";

async function getObservacao(cnpj, ano, trimestre, setObservacao) {
  try {
    const response = await api.get("/analise/one-analise", {
      params: { cnpj: "" + cnpj, ano: ano, trimestre: trimestre },
    });
    setObservacao({
      texto: response.data[0].observacoes,
      cnpj: cnpj,
      ano: ano,
      trimestre: trimestre,
    });
  } catch (error) {
    console.log(error);
    setObservacao("");
  }
}

async function saveObservacao(observacao) {
  try {
    await api.put(
      "/analise/update",
      { observacoes: observacao.texto },
      { params: { cnpj: observacao.cnpj, ano: observacao.ano, mes: observacao.trimestre * 3 - 2 } }
    );
    toast.success("Observação salva")
  } catch (error) {
    console.log(error);
    toast.error("Não foi possível salvar a observação.")
  }
}

export { getObservacao, saveObservacao };
