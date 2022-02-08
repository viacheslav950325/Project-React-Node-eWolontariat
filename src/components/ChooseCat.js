import { MenuItem, FormControl, Select, InputLabel, Box } from '@material-ui/core';
import { useState } from 'react';
import Categories from '../../src/assets/data/Categories';

const ChooseCat = (data) => {
    const [category, setCategory] = useState('');
    const handleChange = (event) => {
      setCategory(event.target.value);
    }
    
  return (
      
        <FormControl variant="standard" style={{bottom: "10px"}}>
            <InputLabel id="demo-simple-select-standard-label">Wybierz kategorię</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={category}
            onChange={handleChange}
            label="Wybierz kategorię"
            style={{width: "260px", fontSize: "1rem" }}
            >
                <MenuItem value="" style={{fontSize: "1rem"}}>
                    <em>Wszystkie kategorie</em>
                </MenuItem>
                {Categories.map (cat =>(
                <MenuItem  
                    key={cat.label} 
                    value={cat.value} 
                    style={{fontSize: "1rem"}}>
                    {cat.label} 
                </MenuItem>
        ))}
            </Select>
        </FormControl>
    )
}

export default ChooseCat;