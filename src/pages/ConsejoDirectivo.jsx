import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import "./styles/ConsejoDirectivo.scss"
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import PostAddIcon from '@mui/icons-material/PostAdd';
const ConsejoDirectivo=()=>{


    return (
        <>
        <div className="navbar-sidebar-directivos">
        <NavbarConglomerado/>
        <div className="container-Sidebar-view-directivo">
        <SidebarMenu/>
         <div className="row">
            <div className="col-md-6">
              <div className="title-consejo-directivo">
                Consejo Directivo Vigente
              </div>
              <div className="row">
                <div className="col-md-7">
                    
                        
                          <div className="title-consejo-directivo-periodo-vigente">
                          Periodo vigente :16/07/2023 al 16/07/2023
                          </div>
                            
                       
                  

                </div>
                <div className="col-md-5">
                 
                    <div className="container-consejo-directivo-title-and-icon">
                        <div className="title-consejo-directivo-exportar-formato-excel">
                      Exportar en formato excel 
                      </div>
                      <div className="icon-download-consejo-directivo">
                      <VerticalAlignBottomIcon />
                      </div>
                   
                   
                  </div>
                 
                   
                    </div>
              </div>
              <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Nombres </th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Cargo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>Mark</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>Mark</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
            
            <div className="col-md-6">
              <div className="consejo-directivo-seccion2-title">
                Documento de la asociacion
              </div>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis mauris ut interdum molestie. Pellentesque ornare justo et ex sagittis aliquam. Phasellus ultrices ultrices ligula, non varius orci rhoncus eget. Aenean in nunc felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia sapien sit amet nulla faucibus rutrum. Aliquam lectus ipsum, scelerisque quis ultrices quis, mattis at quam. Integer ut purus vel mauris fermentum blandit. Praesent semper gravida augue, in consequat mi fringilla in. Proin ultricies rhoncus est, a sollicitudin lacus. Ut quis nulla non purus mollis fermentum. Praesent eget arcu risus. Phasellus vel erat augue. Nulla a elit at diam congue varius.
              </p>
              <div className="row">
              <div className="col-md-6">
                <button>
                Inscripcion de asociaciones
                </button>
              </div>
              <div className="col-md-6">
                <button>
                  <PostAddIcon/>
                Añadir 
                </button>
              
              </div>
              </div>
              
            </div>
          
        </div>
        </div>
            </div>
        
       
        </>
       
    );
}

export default ConsejoDirectivo;