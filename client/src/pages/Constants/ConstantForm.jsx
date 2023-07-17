import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoneIcon from '@mui/icons-material/Done';

import '../../assets/basic.css'

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '600px',
    maxWidth: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function ConstantForm({ data, open, handleClose }) {
    const [constant, setConstant] = useState(data);
    const [newValueForm, setNewValueForm] = useState('')
    const [newKey, setNewKey] = useState('')
    const [newConstant, setNewConstant] = useState({})
    
    useEffect(() => {
        console.log('here')
        setConstant(data)
        setNewValueForm('')
        setNewConstant({})
    }, [data])

    const handleChange = (event) => {
        setConstant({ ...constant, [event.target.name]: event.target.value })
        console.log('constant', constant);
    };

    const handleChangeValue = (event) => {
        setConstant({ ...constant, value: { ...constant.value, [event.target.name]: event.target.value } })
        console.log('constant in edit', constant);
    };

    const createValue = (key, value) => {
        setConstant({ ...constant, value: { ...constant.value, [key]: value } })
        console.log('constant in edit', constant);
        setNewConstant('')
    }

    const handleInputNewConstant = (event) => {
        setNewConstant({ ...newConstant, [event.target.name]: event.target.value })
        console.log('[event.target.name]: event.target.value: ', {[event.target.name]: event.target.value});
        console.log('newConstant: ', newConstant);
    }
    
    const handleAddValue = () => {
        setNewValueForm(
            <Box sx={{mt:1}}>
                <TextField
                    label="Key"
                    name='newKey'
                    value={newConstant?.key ?? ''}
                    onChange={handleInputNewConstant}
                    size="small"
                    sx={{ ml: 1, width: '25%'}}
                />
                <TextField
                    label="Value"
                    name='newValue'
                    value={newConstant?.value ?? ''}
                    onChange={handleInputNewConstant}
                    size="small"
                    sx={{ ml: 2, mr: 1, width: '60%' }}
                />
                <IconButton onClick={ () => createValue(newConstant.newKey, newConstant.newValue)} title='add' sx={{ width: '6%', "&:hover": { background: 'none !important'} }}>
                    <DoneIcon sx={{ color: '#52c752'}} />
                </IconButton>
            </Box>)
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <FormControl fullWidth >
                    <TextField
                        label="Name"
                        name='name'
                        id="constant-name"
                        value={constant?.name ?? ''}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Alias"
                        name='alias'
                        id="constant-alias"
                        value={constant?.alias ?? ''}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <p>Values:</p>
                    {constant?.value ? Object.keys(constant.value).map((el, index) => {
                        return (
                            <div key={index}>
                                <TextField
                                    label="Key"
                                    id="constant-alias"
                                    value={el}
                                    size="small"
                                    sx={{ m: 1, width: '25%' }}
                                    disabled
                                />
                                <TextField
                                    label="Value"
                                    name={el}
                                    data-type="value"
                                    id="constant-alias"
                                    value={constant.value[el]}
                                    onChange={handleChangeValue}
                                    size="small"
                                    sx={{ m: 1, width: '60%' }}
                                />
                                <IconButton title='Delete key' sx={{mt: 1, width: '6%', "&:hover": { background: 'none !important'} }}>
                                    <CloseIcon sx={{color: '#d48181' }} />
                                </IconButton>
                            </div>
                        )
                    }) : ''}
                    {newValueForm}
                    <IconButton title='add value' onClick={handleAddValue} sx={{ width: 30, "&:hover": { background: 'none !important', opacity: 0.8 } }}>
                        <AddCircleIcon />
                    </IconButton>
                    <Box sx={{ textAlign: 'right', m: 1 }}>
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose} >Close</Button>
                        <Button variant="contained">Save</Button>
                    </Box>

                </FormControl>
            </Box>
        </Modal>
    )
}
