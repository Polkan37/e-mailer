import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getHtmlTemplates } from "../../api/server/getHtmlTemplates"
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'crm', label: 'Crm', minWidth: 100 },
    { id: 'lastUpdate', label: 'last date update', minWidth: 170 },

];

export function Templates() {
    const [data, setData] = useState()
    const navigate = useNavigate();

    const handleRowClick = (url) => {
        navigate(`/templates/${url}`);
    };

    useEffect(() => {
        async function fetchData() {
            const templates = await getHtmlTemplates();
            setData(templates)
        }
        fetchData();
    }, [])


    return (
        <Box
            sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper', border: '1px solid #efefef', p: 3 }}
            aria-label="contacts"
        >
            <Typography variant="h5" align="center" sx={{ pb: 3 }}>
                HTML email templates
            </Typography>

            <Table stickyHeader aria-label="sticky table" sx={{ maxHeight: '90vh', border: 'none' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, backgroundColor: '#e3e3e3', fontWeight: 'bold', fontSize: 17 }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleRowClick(row.title)} sx={{ cursor: 'pointer' }}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
}
