import React, { useState } from 'react';
import './styles/SearchBar.scss'; // Importa tu archivo de estilos CSS
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
     

      <SearchIcon  onClick={handleClick}/>
      
        <input type="text" className="search-input" placeholder="Buscar los socios ..." />
      
      {/* Otros elementos relacionados con el buscador */}
    </div>
  );
};

export default SearchBar;