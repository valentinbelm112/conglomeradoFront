import { useState } from "react";
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

const SidebarMenu = () => {
    const [open, setOpen] = useState(true);

    // for collpsing sidebar
    const handleToggle = () => {
        setOpen(!open);
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
                  
                          // Agrega las propiedades de estilo para los anillos y el sombreado
                          border: '3px solid white', // Borde de anillos
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombreado negro claro
                        }}
                    >
                        <img
                            src="https://tramiteonline.unmsm.edu.pe/sgdfd/mat/resources/limitless/global_assets/images/avatar-set/man-2.png"
                            alt="profile_img"
                        />
                          

                    </motion.div>
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
                            <Link to="/register-directivos" className="no-style-link">
                                <Item icon={<FeedIcon />} style={{fontSize: '.8125rem'}} name="Información general de la asociacion" />
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