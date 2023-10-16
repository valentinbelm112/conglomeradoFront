import React, { useState } from 'react';
import './styles/SearchBar.scss'; // Importa tu archivo de estilos CSS
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

   const handleInputChange = (event) => {
    
     onSearch(event.target); // Pasar el evento target al componente padre
  };
  return (

   
   <div id="tablaBusqueda_filter" className="dataTables_filter">

  <input type="search" className="" placeholder="" aria-controls="tablaBusqueda" onFocus={(e) => {
    e.target.style.borderBottom = '2px solid #3498db'; // Cambia el grosor del borde inferior
  }} 
  
  onBlur={(e) => {
    e.target.style.borderBottom = '2px solid #ccc'; // Vuelve al borde por defecto cuando pierde el enfoque
  }}
  onChange={handleInputChange}/>
  <SearchIcon  className="search-icon" onClick={handleClick}/>
    </div>
  );
};


export default SearchBar;