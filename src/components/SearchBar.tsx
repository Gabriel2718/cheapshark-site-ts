import { type ReactElement, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export function SearchBar({ onSearch }): ReactElement {
    const [value, setValue] = useState('');

    return <div className='search-bar'>
        <input type="text" className='search-bar' value={value} onChange={(e) => setValue(e.target.value)}/>
        <button  style={{marginLeft: '1rem'}} onClick={onSearch(value)}><SearchIcon /></button>
    </div>
}