import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import Loader from "../components/Loader/Loader";

const Container_Nav_Sidb_Load=()=>{


    return(
        <>
        <NavbarConglomerado />
         <div className="container-Sidebar-view-directivo">            
            <SidebarMenu />
           <Loader />
        </div>
        </>

    );
}

export default Container_Nav_Sidb_Load;