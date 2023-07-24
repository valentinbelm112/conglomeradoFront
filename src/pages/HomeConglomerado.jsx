import NavbarConglomerado from "../components/NavbarConglomerados";
import CardOptions from "../components/CardOptions";
import SidebarMenu from "../components/SidebarMenu";
import { ToastContainer, toast } from 'react-toastify';
const HomeConglomerado=()=>{


    return(
        <div>
         <NavbarConglomerado/>
         <SidebarMenu/>
          <ToastContainer />
        </div>
    );
}

export default HomeConglomerado;