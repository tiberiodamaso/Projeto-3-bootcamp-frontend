
import { PDFDownloadLink } from '@react-pdf/renderer';
import RelatorioPDF from "../components/RelatorioPDF";

function Relatorio() {
    

    
    return (
        <PDFDownloadLink document={<RelatorioPDF />} fileName="relatorio">
            {({loading}) => (loading ? <button>Loading document...</button>:<button>Download</button>)}            
        </PDFDownloadLink>
    );
  }
  
  export default Relatorio;