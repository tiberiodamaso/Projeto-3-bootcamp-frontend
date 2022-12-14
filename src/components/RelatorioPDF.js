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
        marginBottom: 1,
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
    }


});



function RelatorioPDF({ empresa, trimestre, dcpsTrimestre, gomoExport, gomoReceita, observacao }) {  
        

    const [dcp1, dcp2, dcp3] = dcpsTrimestre
    const ano = dcp1.ano
    const cnpj = dcp1.cnpj
    

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

            </Page>
        </Document>
     );
};

export default RelatorioPDF;