import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getConstants } from '../../api/server/getConstants'
import { ConstantForm } from './ConstantForm';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'alias', label: 'Usage in template', minWidth: 150 },
    { id: 'value', label: 'value', minWidth: 200 },
];

export function Constants() {
    const emptyConstant = { name: '', alias: '', value: {} }
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState()

    function handleOpen(data) {
        setModalContent(data)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function fetchData() {
            const constants = await getConstants();
            setRows(constants.map(el => { return { name: el.title, alias: `{{${el.alias}}}`, value: el.value } }))
        }
        fetchData();
    }, []);


    return (
        <>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                Constants
            </Typography>
            <Button title='add new constant ' onClick={() => handleOpen(emptyConstant)} sx={{ position: 'absolute', top: 70 , right: 20, m: 1, background: '#f1f1f1', border: '1px solid #e1e1e1' }}>
                <AddIcon />
            </Button>
                <ConstantForm data={modalContent} open={open} handleClose={handleClose} />
            <Paper sx={{ width: '100%', overflow: 'hidden', pb: 8 }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table" sx={{ border: 'none' }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: '700' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{ whiteSpace: 'pre-wrap', verticalAlign: 'top' }}>
                                                    {column.id === 'value' ? Object.entries(value)
                                                        .map(([key, value]) => `${key} — ${value}`)
                                                        .join('\n') : value}

                                                </TableCell>
                                            );
                                        })}
                                        <TableCell sx={{ minWidth: 70, m: 0, p: 0, verticalAlign: 'top' }}>
                                            <IconButton title='Edit' onClick={() => handleOpen(row)} sx={{ width: 30, "&:hover": { background: 'none !important', opacity: 0.8 } }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton title='Delete' sx={{ width: 30, "&:hover": { background: 'none !important', opacity: 0.8 } }} disabled={true}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}


