import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { updateMelissaTemplate } from '../../api/melissa/updateMelissaTemplate'
import { updateLicaTemplate } from '../../api/lica/updateLicaTemplate'

import UpdateForm from './UpdateForm.jsx';
import { updateMelissaNews } from '../../api/melissa/updateMelissaNews';

export function Upload({ melissaToken, licaToken }) {
  const [loadButtonIsDisabled, setLoadButtonIsDisabled] = useState(true)
  const [templates, setTemplates] = useState([]);
  const [logMessages, setLogMessages] = useState([]);

  function addLogMessage(responce, crm, templateId, language, templateName) {

    if(templateName === 'news') {
      const logMessage = responce.code === 200 ? `${templateName} ${templateId} ${language}  updated` : `❌${templateName} ${templateId} ${language} - ${responce?.code} - ${responce?.message}`
      setLogMessages(prev => [...prev, logMessage])
      return;
    }
    const logMessage = responce.code === 200 ? `✅ ${crm} ${templateId} ${language} - ${templateName} updated` : `❌ ${templateId} ${language} - ${templateName} error ${responce?.code} - ${responce?.message}`

    setLogMessages(prev => [...prev, logMessage])
  }


  const handleUpdate = async (templates) => {
    for (let i = 0; i < templates.length; i++) {
      const { crm, templateId, templateName, language, request, isNews, news } = templates[i]
      console.log('request: ', request);
      switch (crm) {
        case "melissa": {
          const result = await updateMelissaTemplate(templateId, melissaToken, request)
          addLogMessage(result, crm, templateId, language, templateName)

          if(isNews) {
            const result = await updateMelissaNews(templateId, melissaToken, [news])
            addLogMessage(result, crm, templateId, language, 'news')
          }
          break;
        }
        case "lica": {
          console.log('lica templates: ', templates);
          const result = await updateLicaTemplate(templateId, licaToken, request)
          addLogMessage(result, crm, templateId, language, templateName)

          break;
        }
        default:
          break;
      }

    }



    setLoadButtonIsDisabled(true)
  };

  return (
    <div>
      <h1>Update emails</h1>
      <div className="content" align="center">
        <div className="template-data">
          <Table sx={{ minWidth: 700, border: 'none' }} aria-label="customized table">
            <TableBody>
              <TableRow sx={{ border: 'none' }}>
                <TableCell component="th" scope="row">
                  <UpdateForm melissaToken={melissaToken} licaToken={licaToken} setLoadButtonIsDisabled={setLoadButtonIsDisabled} setTemplates={setTemplates} />
                </TableCell>
                <TableCell align="right" sx={{ minWidth: "280px", width: '20%', textAlign: 'center', verticalAlign: 'top' }}>
                  <Button variant="contained" onClick={() => handleUpdate(templates)} disabled={loadButtonIsDisabled}>
                    Update in crm
                  </Button>
                  <ol className="update__log-content">
                    {logMessages.map((logLine, index) => <li key={index} className='update__log-string'>{logLine}</li>)}
                  </ol>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

