import { Page, Text, View, Image, Font, Document, StyleSheet } from '@react-pdf/renderer';
import brasao from '../assets/brasao.png'


Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

// --- Styles ---
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: {
        fontSize: 10,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
    subtitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 2,
        marginLeft: 16,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Oswald'
      },
    text: {
        margin: 16,
        fontSize: 10,
        textAlign: 'justify',
        //fontFamily: 'Times-Roman'
    },
    obs: {
        margin: 16,
        fontSize: 10,
        textAlign: 'justify',
        fontStyle: 'italic'
    },
    nfes: {
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 2,
      fontSize: 9,
      textAlign: 'justify',
      color: 'grey'
  },
    signature: {
        margin: 16,
        fontSize: 10,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    image: {
        marginVertical: 5,
        marginHorizontal: 200,
    },
    
    tableStyle: {
        display: "table",
        width: "auto",
        marginLeft: 16,
        marginRight: 16
    },
    tableRowStyle:{
        flexDirection: "row"
      },
      
    firstTableColHeaderStyle:{
        width: "10%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderBottomColor: "#000000",
        borderWidth: 0,
        backgroundColor: "#FFFFFF"
      },
      
    tableColHeaderStyle:{
        width: "20%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderBottomColor: "#000000",
        borderWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: "#FFFFFF"
      },
      
    firstTableColStyle:{
        width: "10%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderWidth: 0,
        borderTopWidth: 0
      },
      
    tableColStyle:{
        width: "20%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
      },
      
    tableCellHeaderStyle:{
        textAlign: "center",
        margin: 4,
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: 'Oswald'
      },
      
    tableCellStyle:{
        textAlign: "center",
        margin: 5,
        fontSize: 8
      },
    tableCellStyleHighlight:{
        textAlign: "center",
        margin: 5,
        fontSize: 8,
        backgroundColor: "silver"
      },
    divider: {
        display: "table",
        width: "auto",
        marginLeft: 16,
        marginRight: 16,
        borderStyle: "solid",
        borderColor: "grey",
        borderBottom: 1
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 10,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    }


});



function RelatorioPDF({ empresa, trimestre, dcpsTrimestre, gomoExport, gomoReceita, gomoInsumo, gomoCombustivel, gomoEnergia, gomoServico, observacao, nfesDesconsideradas }) {  
        
    

    const [dcp1, dcp2, dcp3] = dcpsTrimestre
    const ano = dcp1.ano
    const cnpj = dcp1.cnpj
    const nfes = nfesDesconsideradas
    

    const createTableTrimestre = ()=>{
        return (
            <View style={styles.tableRowStyle} fixed>

    
            <View style={styles.firstTableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}> {ano} </Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}></Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}> {trimestre[0]} </Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}></Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}> {trimestre[1]} </Text>
            </View>
            
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}></Text>
            </View>
            
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}> {trimestre[2]} </Text>
            </View>           

            </View>
        )
    }
        
    const createTableHeader = () => {
        return (

           
          <View style={styles.tableRowStyle} fixed>
    
            <View style={styles.firstTableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Linha</Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Declarado</Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Calculado</Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Declarado</Text>
            </View>
    
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Calculado</Text>
            </View>
            
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Declarado</Text>
            </View>
            
            <View style={styles.tableColHeaderStyle}>
              <Text style={styles.tableCellHeaderStyle}>Calculado</Text>
            </View>

          </View>
        );
      };
    
    const createTableRow = (linha, dec1, cal1, dec2, cal2, dec3, cal3) => {
        return (
          <View style={styles.tableRowStyle}>
    
            <View style={styles.firstTableColStyle}>
              <Text style={styles.tableCellStyle}>{linha}</Text>
            </View>
    
            <View style={styles.tableColStyle}>
              <Text style={styles.tableCellStyle}>{dec1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
    
            <View style={styles.tableColStyle}>
              <Text style={Math.floor(dec1)!==Math.floor(cal1)?styles.tableCellStyleHighlight:styles.tableCellStyle}>{cal1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
    
            <View style={styles.tableColStyle}>
              <Text style={styles.tableCellStyle}>{dec2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
    
            <View style={styles.tableColStyle}>
              <Text style={Math.floor(dec2)!==Math.floor(cal2)?styles.tableCellStyleHighlight:styles.tableCellStyle}>{cal2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>

            <View style={styles.tableColStyle}>
              <Text style={styles.tableCellStyle}>{dec3.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>

            <View style={styles.tableColStyle}>
              <Text style={Math.floor(dec3)!==Math.floor(cal3)?styles.tableCellStyleHighlight:styles.tableCellStyle}>{cal3.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
    
          </View>
        );
      };

     
               
   
    


    
    return ( 
        <Document>
            <Page size="A4" style={styles.body}>
            <Text style={styles.header} fixed>
                - Criado pelo aplicativo Análise de DCP -
            </Text>

            <Image
                style={styles.image}
                src={brasao}
            />

            <Text style={styles.title}>Análise de DCP</Text>
            
            <Text style={styles.subtitle}>
                {cnpj} - {empresa}
            </Text>
            
            <Text style={styles.text}>            
            Trata o presente processo de análise de divergências no DCP - Demonstrativo do Crédito Presumido. Em comparação com as Notas Fiscais Eletrônicas emitias durante o período da análise, foram encontradas as seguintes divergências:
            </Text>

            {/* ------- Exportação Direta no Mês -------- */}
            <Text style={styles.subtitle}>
            Exportação Direta no Mês            
            </Text>

            <View style={styles.divider}></View>
            
            
            <View style={styles.tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
            
            {createTableRow(1, dcp1['linha_1'], gomoExport[0]['linha_1'], dcp2['linha_1'], gomoExport[1]['linha_1'], dcp3['linha_1'], gomoExport[2]['linha_1'])}
            {createTableRow(2, dcp1['linha_2'], gomoExport[0]['linha_2'], dcp2['linha_2'], gomoExport[1]['linha_2'], dcp3['linha_2'], gomoExport[2]['linha_2'])}
            {createTableRow(3, dcp1['linha_3'], gomoExport[0]['linha_3'], dcp2['linha_3'], gomoExport[1]['linha_3'], dcp3['linha_3'], gomoExport[2]['linha_3'])}
            {createTableRow(4, dcp1['linha_4'], gomoExport[0]['linha_4'], dcp2['linha_4'], gomoExport[1]['linha_4'], dcp3['linha_4'], gomoExport[2]['linha_4'])}
            {createTableRow(5, dcp1['linha_5'], gomoExport[0]['linha_5'], dcp2['linha_5'], gomoExport[1]['linha_5'], dcp3['linha_5'], gomoExport[2]['linha_5'])}
            {createTableRow(6, dcp1['linha_6'], gomoExport[0]['linha_6'], dcp2['linha_6'], gomoExport[1]['linha_6'], dcp3['linha_6'], gomoExport[2]['linha_6'])}
            {createTableRow(7, dcp1['linha_7'], gomoExport[0]['linha_7'], dcp2['linha_7'], gomoExport[1]['linha_7'], dcp3['linha_7'], gomoExport[2]['linha_7'])}
            </View>



            {/* ------- Receita Operacional Bruta-------- */}
            <Text style={styles.subtitle}>
            Receita Operacional Bruta            
            </Text>

            <View style={styles.divider}></View>
            
            
            <View style={styles.tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
            
            {createTableRow(8, dcp1['linha_8'], gomoReceita[0]['linha_8'], dcp2['linha_8'], gomoReceita[1]['linha_8'], dcp3['linha_8'], gomoReceita[2]['linha_8'])}
            {createTableRow(9, dcp1['linha_9'], gomoReceita[0]['linha_9'], dcp2['linha_9'], gomoReceita[1]['linha_9'], dcp3['linha_9'], gomoReceita[2]['linha_9'])}
            {createTableRow(10, dcp1['linha_10'], gomoReceita[0]['linha_10'], dcp2['linha_10'], gomoReceita[1]['linha_10'], dcp3['linha_10'], gomoReceita[2]['linha_10'])}
            </View>



            {/* ------- Matérias Primas -------- */}
            <Text style={styles.subtitle}>
            Matérias Primas            
            </Text>

            <View style={styles.divider}></View>
            
            
            <View style={styles.tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
            
            {createTableRow(11, dcp1['linha_11'], gomoInsumo[0]['linha_11'], dcp2['linha_11'], gomoInsumo[1]['linha_11'], dcp3['linha_11'], gomoInsumo[2]['linha_11'])}
            {createTableRow(12, dcp1['linha_12'], gomoInsumo[0]['linha_12'], dcp2['linha_12'], gomoInsumo[1]['linha_12'], dcp3['linha_12'], gomoInsumo[2]['linha_12'])}
            {createTableRow(13, dcp1['linha_13'], gomoInsumo[0]['linha_13'], dcp2['linha_13'], gomoInsumo[1]['linha_13'], dcp3['linha_13'], gomoInsumo[2]['linha_13'])}
            {createTableRow(14, dcp1['linha_14'], gomoInsumo[0]['linha_14'], dcp2['linha_14'], gomoInsumo[1]['linha_14'], dcp3['linha_14'], gomoInsumo[2]['linha_14'])}
            {createTableRow(15, dcp1['linha_15'], gomoInsumo[0]['linha_15'], dcp2['linha_15'], gomoInsumo[1]['linha_15'], dcp3['linha_15'], gomoInsumo[2]['linha_15'])}
            {createTableRow(16, dcp1['linha_16'], gomoInsumo[0]['linha_16'], dcp2['linha_16'], gomoInsumo[1]['linha_16'], dcp3['linha_16'], gomoInsumo[2]['linha_16'])}
            {createTableRow(17, dcp1['linha_17'], gomoInsumo[0]['linha_17'], dcp2['linha_17'], gomoInsumo[1]['linha_17'], dcp3['linha_17'], gomoInsumo[2]['linha_17'])}
            {createTableRow(18, dcp1['linha_18'], gomoInsumo[0]['linha_18'], dcp2['linha_18'], gomoInsumo[1]['linha_18'], dcp3['linha_18'], gomoInsumo[2]['linha_18'])}
            {createTableRow(19, dcp1['linha_19'], gomoInsumo[0]['linha_19'], dcp2['linha_19'], gomoInsumo[1]['linha_19'], dcp3['linha_19'], gomoInsumo[2]['linha_19'])}
            {createTableRow(20, dcp1['linha_20'], gomoInsumo[0]['linha_20'], dcp2['linha_20'], gomoInsumo[1]['linha_20'], dcp3['linha_20'], gomoInsumo[2]['linha_20'])}
            {createTableRow(21, dcp1['linha_21'], gomoInsumo[0]['linha_21'], dcp2['linha_21'], gomoInsumo[1]['linha_21'], dcp3['linha_21'], gomoInsumo[2]['linha_21'])}
            {createTableRow(22, dcp1['linha_22'], gomoInsumo[0]['linha_22'], dcp2['linha_22'], gomoInsumo[1]['linha_22'], dcp3['linha_22'], gomoInsumo[2]['linha_22'])}
            {createTableRow(23, dcp1['linha_23'], gomoInsumo[0]['linha_23'], dcp2['linha_23'], gomoInsumo[1]['linha_23'], dcp3['linha_23'], gomoInsumo[2]['linha_23'])}
            {createTableRow(24, dcp1['linha_24'], gomoInsumo[0]['linha_24'], dcp2['linha_24'], gomoInsumo[1]['linha_24'], dcp3['linha_24'], gomoInsumo[2]['linha_24'])}
            {createTableRow(25, dcp1['linha_25'], gomoInsumo[0]['linha_25'], dcp2['linha_25'], gomoInsumo[1]['linha_25'], dcp3['linha_25'], gomoInsumo[2]['linha_25'])}
            {createTableRow(26, dcp1['linha_26'], gomoInsumo[0]['linha_26'], dcp2['linha_26'], gomoInsumo[1]['linha_26'], dcp3['linha_26'], gomoInsumo[2]['linha_26'])}
            </View>



            {/* ------- Combustíveis -------- */}
            <Text style={styles.subtitle}>
            Combustíveis            
            </Text>

            <View style={styles.divider}></View>
            
            
            <View style={styles.tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
            
            {createTableRow(27, dcp1['linha_27'], gomoCombustivel[0]['linha_27'], dcp2['linha_27'], gomoCombustivel[1]['linha_27'], dcp3['linha_27'], gomoCombustivel[2]['linha_27'])}
            {createTableRow(28, dcp1['linha_28'], gomoCombustivel[0]['linha_28'], dcp2['linha_28'], gomoCombustivel[1]['linha_28'], dcp3['linha_28'], gomoCombustivel[2]['linha_28'])}
            {createTableRow(29, dcp1['linha_29'], gomoCombustivel[0]['linha_29'], dcp2['linha_29'], gomoCombustivel[1]['linha_29'], dcp3['linha_29'], gomoCombustivel[2]['linha_29'])}
            {createTableRow(30, dcp1['linha_30'], gomoCombustivel[0]['linha_30'], dcp2['linha_30'], gomoCombustivel[1]['linha_30'], dcp3['linha_30'], gomoCombustivel[2]['linha_30'])}
            {createTableRow(31, dcp1['linha_31'], gomoCombustivel[0]['linha_31'], dcp2['linha_31'], gomoCombustivel[1]['linha_31'], dcp3['linha_31'], gomoCombustivel[2]['linha_31'])}
            {createTableRow(32, dcp1['linha_32'], gomoCombustivel[0]['linha_32'], dcp2['linha_32'], gomoCombustivel[1]['linha_32'], dcp3['linha_32'], gomoCombustivel[2]['linha_32'])}
            {createTableRow(33, dcp1['linha_33'], gomoCombustivel[0]['linha_33'], dcp2['linha_33'], gomoCombustivel[1]['linha_33'], dcp3['linha_33'], gomoCombustivel[2]['linha_33'])}
            {createTableRow(34, dcp1['linha_34'], gomoCombustivel[0]['linha_34'], dcp2['linha_34'], gomoCombustivel[1]['linha_34'], dcp3['linha_34'], gomoCombustivel[2]['linha_34'])}
            {createTableRow(35, dcp1['linha_35'], gomoCombustivel[0]['linha_35'], dcp2['linha_35'], gomoCombustivel[1]['linha_35'], dcp3['linha_35'], gomoCombustivel[2]['linha_35'])}
            {createTableRow(36, dcp1['linha_36'], gomoCombustivel[0]['linha_36'], dcp2['linha_36'], gomoCombustivel[1]['linha_36'], dcp3['linha_36'], gomoCombustivel[2]['linha_36'])}
            {createTableRow(37, dcp1['linha_37'], gomoCombustivel[0]['linha_37'], dcp2['linha_37'], gomoCombustivel[1]['linha_37'], dcp3['linha_37'], gomoCombustivel[2]['linha_37'])}
            {createTableRow(38, dcp1['linha_38'], gomoCombustivel[0]['linha_38'], dcp2['linha_38'], gomoCombustivel[1]['linha_38'], dcp3['linha_38'], gomoCombustivel[2]['linha_38'])}
            {createTableRow(39, dcp1['linha_39'], gomoCombustivel[0]['linha_39'], dcp2['linha_39'], gomoCombustivel[1]['linha_39'], dcp3['linha_39'], gomoCombustivel[2]['linha_39'])}
            {createTableRow(40, dcp1['linha_40'], gomoCombustivel[0]['linha_40'], dcp2['linha_40'], gomoCombustivel[1]['linha_40'], dcp3['linha_40'], gomoCombustivel[2]['linha_40'])}
            {createTableRow(41, dcp1['linha_41'], gomoCombustivel[0]['linha_41'], dcp2['linha_41'], gomoCombustivel[1]['linha_41'], dcp3['linha_41'], gomoCombustivel[2]['linha_41'])}
            {createTableRow(42, dcp1['linha_42'], gomoCombustivel[0]['linha_42'], dcp2['linha_42'], gomoCombustivel[1]['linha_42'], dcp3['linha_42'], gomoCombustivel[2]['linha_42'])}
            
            </View>




            {/* ------- Energia Elétrica -------- */}
            <Text style={styles.subtitle} break>
            Energia Elétrica            
            </Text>

            <View style={styles.divider}></View>
            
            
            <View style={styles.tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
            
            {createTableRow(43, dcp1['linha_43'], gomoEnergia[0]['linha_43'], dcp2['linha_43'], gomoEnergia[1]['linha_43'], dcp3['linha_43'], gomoEnergia[2]['linha_43'])}
            {createTableRow(44, dcp1['linha_44'], gomoEnergia[0]['linha_44'], dcp2['linha_44'], gomoEnergia[1]['linha_44'], dcp3['linha_44'], gomoEnergia[2]['linha_44'])}
            {createTableRow(45, dcp1['linha_45'], gomoEnergia[0]['linha_45'], dcp2['linha_45'], gomoEnergia[1]['linha_45'], dcp3['linha_45'], gomoEnergia[2]['linha_45'])}
            {createTableRow(46, dcp1['linha_46'], gomoEnergia[0]['linha_46'], dcp2['linha_46'], gomoEnergia[1]['linha_46'], dcp3['linha_46'], gomoEnergia[2]['linha_46'])}
            {createTableRow(47, dcp1['linha_47'], gomoEnergia[0]['linha_47'], dcp2['linha_47'], gomoEnergia[1]['linha_47'], dcp3['linha_47'], gomoEnergia[2]['linha_47'])}
            {createTableRow(48, dcp1['linha_48'], gomoEnergia[0]['linha_48'], dcp2['linha_48'], gomoEnergia[1]['linha_48'], dcp3['linha_48'], gomoEnergia[2]['linha_48'])}
            </View>


             {/* ------- Prestação de Serviços -------- */}
             <Text style={styles.subtitle}>
             Prestação de Serviços            
            </Text>

            <View style={styles.divider}></View>
            
            
            <View style={styles.tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
            
            {createTableRow(49, dcp1['linha_49'], gomoServico[0]['linha_49'], dcp2['linha_49'], gomoServico[1]['linha_49'], dcp3['linha_49'], gomoServico[2]['linha_49'])}
            {createTableRow(50, dcp1['linha_50'], gomoServico[0]['linha_50'], dcp2['linha_50'], gomoServico[1]['linha_50'], dcp3['linha_50'], gomoServico[2]['linha_50'])}
            {createTableRow(51, dcp1['linha_51'], gomoServico[0]['linha_51'], dcp2['linha_51'], gomoServico[1]['linha_51'], dcp3['linha_51'], gomoServico[2]['linha_51'])}
            {createTableRow(52, dcp1['linha_52'], gomoServico[0]['linha_52'], dcp2['linha_52'], gomoServico[1]['linha_52'], dcp3['linha_52'], gomoServico[2]['linha_52'])}
            {createTableRow(53, dcp1['linha_53'], gomoServico[0]['linha_53'], dcp2['linha_53'], gomoServico[1]['linha_53'], dcp3['linha_53'], gomoServico[2]['linha_53'])}
            {createTableRow(54, dcp1['linha_54'], gomoServico[0]['linha_54'], dcp2['linha_54'], gomoServico[1]['linha_54'], dcp3['linha_54'], gomoServico[2]['linha_54'])}
            </View>





            <View style={styles.divider}></View>
            

            {/* ------- Notas Fiscais Desconsideradas -------- */}
            <Text style={styles.subtitle}>
            Notas Fiscais Desconsideradas            
            </Text>
            
            <Text style={styles.nfes}>Operacao  -  País  -  CFOP  -  NCM  -  Valor R$  -  NI  - Nome</Text>
            {nfes.map( (nf,index) => {
                    return (
                      
                        <Text key={index} style={styles.nfes}>{nf.operacao} - {nf.pais} - {nf.cfop} - {nf.ncm} - {nf.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - {nf.ni} - {nf.nome}</Text>

                      )
                  })
            }


            <View style={styles.divider}></View>   

            <Text style={styles.obs}>
            Observações: {observacao}
            </Text>       
            
            <Text style={styles.text}>            
            Diante do exposto, intimo o contribuinte a apresentar documentos comprobatórios no prazo de 30 (trinta) dias.
            </Text>

            <Text style={styles.signature}>            
            - Assinado Digitalmente -
            </Text>


            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />

            </Page>
        </Document>
     );
};

export default RelatorioPDF;