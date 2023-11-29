import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import Loader from "../components/Loader/Loader";

const ContainerNavSidbLoad=()=>{


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

export default ContainerNavSidbLoad;