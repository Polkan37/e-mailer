import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { getLicaTemplate } from '../../api/lica/getLicaTemplate';
import { Preview } from "../Preview/Preview";

import { Accordion, AccordionSummary, AccordionDetails } from './setAccordionStyles'
import './template.css'

export default function LicaTemplate({ templateId, activeLangs, token }) {
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const urlOfTemplateInCRM = `https://app.licacrm.co/triggers/#/templateList/templateItem/${templateId}`;
  const [error, setError] = useState('');
  const [templateData, setTemplateData] = useState({});

  useEffect(() => {

    async function fetchTemplateData() {
      const template = await getLicaTemplate(templateId, token);
      if (template === '500 - HTTP_INTERNAL_SERVER_ERROR') {
        setError('LICA API Key should be updated');
        localStorage.removeItem('LicaToken')
        setTimeout(() => {
          navigate("login");
          window.location.reload();
        }, 2000)
      }
      setTemplateData(template);
      setIsLoading(false)

    }
    fetchTemplateData();
  }, [templateId, navigate, token]);


  if (isLoading) {
    return <CircularProgress color="inherit" />
  } else return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange(!expanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {error ? (<div style={{ margin: "1rem", color: '#ed5454', fontWeight: '500', fontSize: '20px' }} id="error">
            {error}
          </div>) : (
            <Typography>
              <b>&nbsp;
                Template <a href={urlOfTemplateInCRM} target="_blank" rel="noreferrer">{templateId}</a>:&nbsp;
              </b>
              {templateData?.name}
            </Typography>)}
        </AccordionSummary>
        <AccordionDetails>
          {templateData?.translation?.length ? activeLangs.map((lang, index) => <Preview key={index} index={index} language={lang} templateId={templateId} subject={templateData?.translation?.find(el => el.code === lang)?.subject} templateHTML={templateData?.translation?.find(el => el.code === lang)?.text} lica={true} />) : ''}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
