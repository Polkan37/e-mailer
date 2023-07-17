import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { getMelissaTemplate } from '../../api/melissa/getMelissaTemplate';
import { Preview } from "../Preview/Preview";

import { Accordion, AccordionSummary, AccordionDetails } from './setAccordionStyles'
import './template.css'

export default function MelissaTemplate({ templateId, activeLangs, token }) {
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [templateData, setTemplateData] = useState({});

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const urlOfTemplateInCRM = `https://thiscrm.co/admin/crm/email/edit/${templateId}`;

  useEffect(() => {
    async function fetchTemplateData() {
      const template = await getMelissaTemplate(templateId, token);
      setTemplateData(template);
      setIsLoading(false)
    }
    fetchTemplateData();
  }, [templateId,token]);


  if (isLoading) {
    return <CircularProgress color="inherit" />
  } else return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange(!expanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ width: '98%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <span>
              <b>&nbsp;
                Template <a href={urlOfTemplateInCRM} target="_blank" rel="noreferrer">{templateId}</a>:&nbsp;
              </b>
              {templateData?.main?.name}

            </span>
            <span>

              {activeLangs?.map((lang, index) => <a key={index} href={`https://thiscrm.co/admin/crm/email/preview/${templateId}?lang=${lang}`} className="preview-button" title="preview with blocks" target="_blank" rel="noreferrer">{lang}</a>)}
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {templateData?.main?.content ? activeLangs.map((lang, index) => <Preview key={index} index={index} language={lang} templateId={templateId} subject={templateData?.main?.content[lang][lang === 'ru' ? 'subject' : `subject_${lang}`]} templateHTML={templateData.main.content[lang][lang === 'ru' ? 'html' : `html_${lang}`]} />) : ''}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
