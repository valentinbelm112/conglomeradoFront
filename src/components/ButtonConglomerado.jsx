import React, { useState } from 'react';
import './styles/SearchBar.scss'; // Importa tu archivo de estilos CSS
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

   const handleInputChange = (event) => {
    console.log("Ingreso")
    onSearch(event.target); // Pasar el evento target al componente padre
  };
  return (
    <div className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
     

      <SearchIcon  onClick={handleClick}/>
      
        <input type="text" className="search-input" placeholder="Buscar los socios ..."  onChange={handleInputChange}/>
      
      {/* Otros elementos relacionados con el buscador */}
    </div>
  );
};

export default SearchBar;