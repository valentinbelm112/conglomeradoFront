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
                        whileHover={{
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                            backdropFilter: "blur(5.5px)",
                            WebkitBackdropFilter: "blur(5.5px)",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="https://ae01.alicdn.com/kf/H5be6a0fa5f584a8sa8420da2a7d4bc809r/RBRARE-Polaroid-Men-s-Goggle-Driving-Sunglasses-Men-Classic-Low-Profile-Sun-Glasses-For-Men-High.jpg"
                            alt="profile_img"
                        />
                    </motion.div>
                    {/* groups */}
                    <div className="groups">
                        {/* group 1 */}
                        <div className="group">

                            <Item icon={<HomeIcon />} name="Inicio" />
                            <Link to="/register-directivos" className="no-style-link">
                                <Item icon={<FeedIcon />} name="Información general de la asociacion" />
                            </Link>
                            <Link to="/register-padron-propietarios" className="no-style-link">
                                <Item icon={<FeedIcon />} name="Padron propietarios" />
                            </Link>

                            <Item icon={<HandshakeIcon />} name="Padron socios" />
                            <Item icon={<AssignmentTurnedInRounded />} name="Padron Inquilinos" />
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