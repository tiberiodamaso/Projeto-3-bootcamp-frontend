import trimestre from "./trimestre";

function somaNoMes(notas, criterios, ano, mes) {
  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota._id.cfop) &&
      nota._id.ano === ano &&
      nota._id.mes === mes
    );
  });

  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.total.$numberDecimal);
  }, 0);

  return soma;
}

function somaAteAnterior(notas, criterios, ano, mes) {
  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota._id.cfop) &&
      nota._id.ano === ano &&
      nota._id.mes < mes
    );
  });

  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.total.$numberDecimal);
  }, 0);

  return soma;
}

function somaAteMes(notas, criterios, ano, mes) {
  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota._id.cfop) &&
      nota._id.ano === ano &&
      nota._id.mes <= mes
    );
  });

  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.total.$numberDecimal);
  }, 0);

  return soma;
}

function exportacoes(notas, ano, trim) {
  const cfopExportacao = ["7101", "7105", "7127"];
  const cfopComercial = ["5501", "6501"];
  const todosCfop = ["7101", "7105", "7127", "5501", "6501"];
  const { lower, upper } = trimestre(trim);

  const exportacoes = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_1: somaAteAnterior(notas, cfopExportacao, 2020, x),
      linha_2: somaAteAnterior(notas, cfopComercial, 2020, x),
      linha_3: somaAteAnterior(notas, todosCfop, 2020, x),
      linha_4: somaNoMes(notas, cfopExportacao, 2020, x),
      linha_5: somaNoMes(notas, cfopComercial, 2020, x),
      linha_6: somaNoMes(notas, todosCfop, 2020, x),
      linha_7: somaAteMes(notas, todosCfop, 2020, x),
    };

    exportacoes[x - lower] = periodo;
  }
  console.log(exportacoes);
  return exportacoes;
}

function receitas(notas, ano, trim) {
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
  const { lower, upper } = trimestre(trim);
  console.log("no receitas, lower e upper", lower, upper);
  const receitas = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_8: somaAteAnterior(notas, cfopReceitaBruta, 2020, x),
      linha_9: somaNoMes(notas, cfopReceitaBruta, 2020, x),
      linha_10: somaAteMes(notas, cfopReceitaBruta, 2020, x),
    };
    receitas[x - lower] = periodo;
  }
  console.log("la vai receitas");
  console.log(receitas);
  return receitas;
}

function insumos(notas, ano, trim) {
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
  const { lower, upper } = trimestre(trim);

  const insumos = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_11: somaAteAnterior(notas, cfopInsumos, 2020, x),
      linha_12: somaNoMes(notas, cfopInsumos, 2020, x),
      linha_13: somaAteMes(notas, cfopInsumos, 2020, x),
      linha_14: somaAteAnterior(notas, cfopCompraTotal, 2020, x),
      linha_15: somaNoMes(notas, cfopCompraTotal, 2020, x),
      linha_16: somaAteMes(notas, cfopCompraTotal, 2020, x),
      linha_17:
        somaAteMes(notas, cfopInsumos, 2020, x) /
        somaAteMes(notas, cfopCompraTotal, 2020, x),
    };
    insumos[x - lower] = periodo;
  }
  console.log(insumos);
  return insumos;
}
export { exportacoes, receitas, insumos };
