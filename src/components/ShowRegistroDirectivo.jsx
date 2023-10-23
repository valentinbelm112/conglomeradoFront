import { useState } from "react";
import { South } from "@mui/icons-material";
import "./styles/ShowRegistroDirectivo.scss"
import ReactImageZoom from 'react-image-zoom';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { useEffect } from "react";
const ShowRegistroDirectivo = (props) => {
    const [open, setOpen] = useState(false);
    const[dataDocument,setDataDocument]=useState([]);
    console.log(props);
    const images = [
        "https://imgv2-2-f.scribdassets.com/img/document/52029008/original/21021e4237/1684374832?v=1"
    ]
    const [combo, SetCombo] = useState(1)
    
    useEffect(() => {
       if(props.Detalledocumento) {
      
        const dataFound=props?.Detalledocumento.data.find(item=>item.destipdoc ==='DocInscripcion')
        setDataDocument(dataFound);
       }
       
    
      }, []); 
   

    const handleChange = (event) => {
        console.log("RRRRRRRRRRRRR")
        console.log(`Seleccionaste ${event.target.value}`);
        SetCombo(event.target.value);

        setTimeout(() => console.clear(), 1000);
    }

    const handleClickCloseFrom = () => {
       
        props.onClickEstado(false);
    };

    return (
        <div className="container-showr-documents-directivos">
            <div className="container-showr-documents-directivos-child">
                <div className="row  container-showr-documents-directivos-child-row">
                    <input id="cerrar-modal-reg-direct" name="modal" type="radio" />
                    <label for="cerrar-modal">
                        <CloseIcon onClick={handleClickCloseFrom} style={{ marginLeft: `96%`, margintop: `2%` }} className="icono-close-register-directivo-show-ins" /> </label>
                    <div className="col-md-4 container-show-documents-directivos-child-col " >

                        <div className="show-document-change-date">
                            Fecha de Actualizacion :
                        </div>
                        <div className="subtitle-paraf-consejo-direct">

                            {dataDocument?.fec_actualizacion && format(new Date(dataDocument?.fec_actualizacion), "dd-MM-yyyy")}
                        </div>
                        <div className="show-document-date">
                            Fecha del documento:
                        </div>
                        <div className="subtitle-paraf-consejo-direct">
                            {dataDocument?.fec_documento && format(new Date(dataDocument?.fec_documento), "dd-MM-yyyy")}
                        </div>
                        <div className="show-document-consejo-directivo">
                            Documento del consejo directivo actualizado:
                        </div>
                        <div  className="container-consejo-directivo-title-and-icon">
                    <div onClick={props.HandleDownloadExcel}className="title-consejo-directivo-exportar-formato-excel-show">
                      Consejo directivo 
                    </div>
                    <div className="icon-download-consejo-directivo">
                      <VerticalAlignBottomIcon />
                    </div>
                  </div>
                        <div className="show-document-consejo-directivo">
                            Periodo de vigencias del consejo directivo :
                        </div>
                        {
                            dataDocument?.fec_inicio_vigencia &&dataDocument?.fec_fin_vigencia &&
                            <div className="subtitle-paraf-consejo-direct">
                            {`Desde ${format(new Date(dataDocument?.fec_inicio_vigencia), "dd-MM-yyyy")} hasta ${format(new Date(dataDocument?.fec_fin_vigencia), "dd-MM-yyyy")} ` }
                        </div>
                        }
                        
                        <div className="show-document-consejo-directivo">
                            Observaciones:
                        </div>
                        <div className="subtitle-paraf-consejo-direct">
                            {dataDocument?.des_observaciones}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">

                        </div>
                        <div className="container-image-show-zoom">

                            <div>
                                <img onClick={() => setOpen(true)} src={dataDocument?.des_link_documento_inscrito} style={{
                                    width: '100%',
                                    height: '87vh',
                                    marginTop: '7%',
                                    border: '2px solid #797878',
                                    borderRadius: '10px',
                                    padding: '5px',
                                }} alt="" />
                            </div>

                            <Lightbox
                                plugins={[Zoom, Download, Captions]}
                                open={open}
                                close={() => setOpen(false)}
                                slides={[
                                    {
                                        src: dataDocument?.des_link_documento_inscrito,
                                        title: "Documento de la inscripcion del consejo directivo"
                                    }]}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default ShowRegistroDirectivo;