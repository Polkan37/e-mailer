import React, { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tools } from "../../components/Tools/Tools";
import { showTools } from '../../utils/showTools';
import LicaTemplate from '../../components/Template/LicaTemplate'


export function Lica({ licaToken }) {
    const templateId = useRef(null);
    const [data, setData] = useState('type template id');
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const selected = localStorage.getItem('selectedLangs')?.split(',')
        selected?.length && selected[0].length ? setData(templates.map((templateId, index) => {
            return (<LicaTemplate key={templateId + index} templateId={templateId} activeLangs={selected} token={licaToken} />)
        })) : showTools()
    }, [templates])

    const handleClick = () => {
        const inputElement = templateId.current;
        if (inputElement.value?.length) {
            //cut redundant spaces spaces and split the string
            setTemplates(inputElement.value.replace(/\s+/g, ' ').trim().split(" "));
        } else {
            setData('Please, fill the input')
        }
    };


    return (
        <>
            <Typography variant="h5" align="center">
                <img src="https://app.licacrm.co/static/favicon.png" alt="crm logo" width={22} /> Lica templates preview
            </Typography>
            <Tools />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', m: 2 }}>
                <div>
                    <TextField
                        required
                        inputRef={templateId}
                        id="outlined-required"
                        label="template id"
                        helperText="Write ids divided by space"
                        variant="standard"
                    />
                </div>
                <Button variant="contained" sx={{ m: 2 }} onClick={() => handleClick()} >Get Templates</Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', m: 2 }}>
                {data}
            </Box>
        </>
    )
}
