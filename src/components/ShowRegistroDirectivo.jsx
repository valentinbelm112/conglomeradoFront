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
const ShowRegistroDirectivo = (props) => {
    const [open, setOpen] = useState(false);
    console.log(props);
    const images = [
        "https://imgv2-2-f.scribdassets.com/img/document/52029008/original/21021e4237/1684374832?v=1"
      ]
    const [combo,SetCombo]=useState(1)
    const fechaHoraString = "2023-07-26T05:00:00.000+00:00";
 

    const handleChange = (event) => {
        console.log("RRRRRRRRRRRRR")
        console.log(`Seleccionaste ${event.target.value}`);
        SetCombo(event.target.value);
     
        setTimeout(() => console.clear(), 1000);
    }

    return (
        <div className="container-showr-documents-directivos">
            <div className="container-showr-documents-directivos-child">
                <div className="row  container-showr-documents-directivos-child-row">
                <input id="cerrar-modal" name="modal" type="radio" />
            <label for="cerrar-modal">
              <CloseIcon  style={{ position: `absolute`,marginLeft:`41%`,margintop:`2%` }} className="icono-close-register-directivo-show-ins" /> </label>
                    <div className="col-4 container-show-documents-directivos-child-col ">
                        <div className="show-documents-version">
                            Version :1
                        </div>
                        <div className="show-document-change-date">
                            Fecha de Actualizacion :
                        </div>
                        <div>
                       
                        { format(new Date(props?.Detalledocumento.data?.des_fecha_actualizacion), "dd-MM-yyyy HH:mm:ss")}
                        </div>
                        <div className="show-document-date">
                            Fecha del documento
                        </div>
                        <div>
                        { format(new Date(props?.Detalledocumento.data.des_fecha_documento), "dd-MM-yyyy HH:mm:ss")}
                        </div>
                        <div className="show-document-consejo-directivo">
                            Documento del consejo directivo actualizado
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            
                        </div>
                        <div className="container-image-show-zoom">
                     
                       <div>
                        <img onClick={() => setOpen(true)} src={props?.Detalledocumento.data.des_link_documento_inscrito} style={{width:`100%`,height:`87vh`}} alt="" />
                        </div> 

                      <Lightbox
                       plugins={[Zoom,Download,Captions]}
                            open={open}
                            close={() => setOpen(false)}
                            slides={[
                            { src: "https://imgv2-2-f.scribdassets.com/img/document/52029008/original/21021e4237/1684374832?v=1" ,
                            title: "Documento de la inscripcion del consejo directivo"
                            }  ]}
                        />
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default ShowRegistroDirectivo;