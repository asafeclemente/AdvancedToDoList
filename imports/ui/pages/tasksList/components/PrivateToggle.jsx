import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function PrivateToggle({checked, onChange}) {

    const handleChange = (event) => {
				onChange(event.target.checked)
    };

    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    control={<Switch
                        checked={checked}
                        onChange={handleChange}
                        color="primary" />}
                    label={checked ? "Privada" : "Visivel a todos os usuários"}
                    labelPlacement="end"
                />
            </FormGroup>
        </FormControl>
    );
}