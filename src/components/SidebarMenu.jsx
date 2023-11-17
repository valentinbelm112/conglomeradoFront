import React, { useContext, useEffect ,useState} from "react";
import "./styles/SidebarMenu.scss"
import { motion } from "framer-motion";
import Item from "./ItemSidebar";
import { Link } from 'react-router-dom';
import {

    AssignmentTurnedInRounded,
    TocRounded,

} from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonIcon from '@mui/icons-material/Person';
import { removeFromLocalStorage } from "../hooks/useLocalStorage";
import AuthContext from "../context/AuthContext";
const SidebarMenu = ({setTogle}) => {
    const [open, setOpen] = useState(true);
    const { auth } = useContext(AuthContext);
    // for collpsing sidebar
    const handleToggle = () => {
        setOpen(!open);
         setTogle(!open)
    };

    const sideContainerVariants = {
        true: {
            width: "15rem",
        },
        false: {
            transition: {
                delay: 0.6,
            },
        },
    };

    const sidebarVariants = {
        true: {},
        false: {
            width: "5rem",
            transition: {
                delay: 0.4,
            },
        },
    };

    const profileVariants = {
        true: {
            alignSelf: "center",
            width: "4rem",
        },
        false: {
            alignSelf: "flex-start",
            marginTop: "2rem",
            width: "3rem",
        },
    };

    return (
        <div className={open ? "App" : "Appfalse"}>
            
            <motion.div
                data-open={open}
                variants={sideContainerVariants}
                initial={`${open}`}
                animate={`${open}`}
                className="sidebar_container"
            >
                {/* sidebar div */}
                <motion.div
                    className="sidebar"
                    initial={`${open}`}
                    animate={`${open}`}
                    variants={sidebarVariants}
                >
                
                     
                    {/* lines_icon */}
                    <motion.div
                        whileHover={{
                            scale: 1.2,
                            rotate: 180,
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(3.5px)",
                            WebkitBackdropFilter: "blur(3.5px)",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            transition: {
                                delay: 0.2,
                                duration: 0.4,
                            },
                        }}
                        onClick={handleToggle}
                        className="lines_icon"
                    >
                        <TocRounded />
                    </motion.div>
                    {/* profile */}
                    <Link to="/cgm/perfil" className="no-style-link" style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    <motion.div
                        layout
                        initial={`${open}`}
                        animate={`${open}`}
                        variants={profileVariants}
                        className="profile"
                        transition={{ duration: 0.4 }}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                          backdropFilter: 'blur(5.5px)',
                          WebkitBackdropFilter: 'blur(5.5px)',
                          border: '1px solid rgba(200, 200, 200, 0.5)', // Borde blanco con un toque de gris
                          cursor: 'pointer',
                          border: '3px solid white', // Borde de anillos
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombreado negro claro
                       
                        }}
                    >
                        
                        <img
                             src={auth.des_link_perf}
                            alt="profile_img"
                        />
                          
                    </motion.div>
                    </Link>
                    {/* groups */}
                    <div className="groups">
                        {/* group 1 */}
                        <div className="group">
                        <div className="online-indicator">
                            <div className="online-indicator-circle"/>
                            <div className="online-indicator-title">En línea</div>
                            </div>
                            <Link to="/home-conglomerado" className="no-style-link">
                            <Item icon={<HomeIcon />} name="Inicio"  style={{fontSize: '.8125rem'}}/>
                            </Link>
                            <Link to="/cgm/perfil" className="no-style-link">
                            <Item icon={<PersonIcon />}  style={{fontSize: '.8125rem'}} name="Mi Perfil" />
                            </Link>
                            <Link to="/register-directivos" className="no-style-link">
                                <Item icon={<FeedIcon />} style={{fontSize: '.8125rem'}} name="Consejo directivo" />
                            </Link>
                            <Link to="/register-padron-propietarios" className="no-style-link">
                                <Item icon={<FeedIcon />} style={{fontSize: '.8125rem'}} name="Padron propietarios" />
                            </Link>
                            <Link to="/register-padron-socios" className="no-style-link">
                            <Item icon={<HandshakeIcon />}  style={{fontSize: '.8125rem'}} name="Padron socios" />
                            </Link>
                            <Link to="/register-padron-inquilino" className="no-style-link">
                            <Item icon={<AssignmentTurnedInRounded />}  style={{fontSize: '.8125rem'}} name="Padron Inquilinos" />
                            </Link>
                            <Link onClick={removeFromLocalStorage} className="no-style-link">
                            <Item icon={<PowerSettingsNewIcon />}  style={{fontSize: '.8125rem'}} name="Cerrar Sesión" />
                            </Link>
                        
                        </div>
                    </div>

                </motion.div>
            </motion.div>

            <div className="body_container">

                
                {/* <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr />i am body
          <hr /> */}
            </div>
        </div>
    );
}

export default SidebarMenu;