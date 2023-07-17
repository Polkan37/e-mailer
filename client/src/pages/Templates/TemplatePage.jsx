import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { home } from '../../constants/homeUrl';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import MultipleSelect from './MultiSelect';
import { getConstants } from '../../api/server/getConstants'
import { Preview } from "../../components/Preview/Preview";

import '../../assets/basic.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const templateName = location.pathname.split('/').pop();
  const [data, setData] = useState({
    variablesList: '',
    constants: '',
    allConstants: [],
    html: ''
  });
  const url = `${home}/api/templates/${templateName}`;

  useEffect(() => {
    async function fetchData() {
      const info = await fetch(url).then((response) => {
        return response.json();
      }).catch(err => setError(err.message))

      const variablesList = info?.variables.join('\t');
      const constantsList = await getConstants();
      const constants = [];
      info?.constants.forEach(el => constants.push(el.title))
      setData({ ...info, "variablesList": variablesList, "constants": constants, 'allConstants': constantsList.map(el => el.title) })
    }
    fetchData();

  }, [url])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 5 }} >Back</Button>

      <Paper elevation={2} sx={{ maxWidth: '90vw', width: '100%', m: '0 auto', p: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 1 }}>
          {templateName}
          <IconButton className='show-preview-button' title='Preview' onClick={handleOpen}>
            <PreviewIcon />
          </IconButton>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
            <Preview key={1} index={1} language={''} templateId={'--'} subject={'---'} templateHTML={data.html} markUpOnly={true} />
            </Box>
          </Modal>
        </Typography>
        <Box>
          {error ? error : (
            <>
              <TextField
                id="variablesList"
                label="Variables"
                value={data.variablesList}
                helperText="All variables that will be loaded in file"
                variant="standard"
                sx={{ width: '100%', mb: 1 }} onChange={e => handleChange(e)}
              />
              {data.constants ? <MultipleSelect selected={data.constants} data={data.allConstants} /> : ''}
              <CodeEditor value={data.html} id="html" language="html" onChange={handleChange}
                padding={10}
                style={{
                  fontSize: 12,
                  backgroundColor: "#fefefe",
                  border: "1px solid #e4e4e4",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                }} />
              <Button variant="contained" sx={{ mt: 2 }} disabled>
                Save
              </Button>
            </>
          )}
        </Box>

      </Paper>
    </Box>
  );
};

export default TemplatePage;