import { type ReactElement } from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function SearchBar(onSearch): ReactElement {

    return <div>
        <TextField id="standard-basic" label="Game" variant="standard" 
            sx={{
                // cor do texto digitado
                input: { color: 'white' },
                // cor do label
                '& .MuiInputLabel-root': { color: 'white' },
                // cor da borda padrão
                '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                // ao passar o mouse
                '&:hover fieldset': { borderColor: 'white' },
                // quando focado
                '&.Mui-focused fieldset': { borderColor: 'white' }
                }
            }}
        />
        <button  style={{marginLeft: '1rem'}}><SearchIcon /></button>
    </div>
}