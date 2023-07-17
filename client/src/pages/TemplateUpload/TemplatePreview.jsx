import React, { useState, useEffect } from "react";
import { assembleTemplate } from "./assembleTemplate";
import { Preview } from "../../components/Preview/Preview";
import LinearProgress from "@mui/material/LinearProgress";
import PreviewHeader from "./PreviewHeader";
import { getHTMLTemplates } from "./getHTMLTemplates";
import { getCRMTemplates } from "./getCRMTemplates";
import { langID } from '../../constants/langIDs'

export default function TemplatePreview({
  dataFromFile,
  melissaToken,
  licaToken,
  setCrmConnectError,
  setTemplatePrep
}) {
  const [currentTemplatesStateInCrm, setCurrentTemplatesStateInCrm] = useState(
    {}
  );
  const [htmlTemplates, setHtmlTemplates] = useState([]);
  const [templatesPreview, setTemplatesPreview] = useState([]);
  const [error, setError] = useState();
  const CRM = dataFromFile[0].crm;
  const uniqueTemplates = [
    ...new Set(dataFromFile.map((el) => el.template_id)),
  ];
  const uniqueHTMLTemplates = [
    ...new Set(dataFromFile.map((el) => el.template)),
  ];

  //get templates info from crm and markup template from server
  useEffect(() => {
    (async () => {
      switch (CRM) {
        case "melissa": {
          getCRMTemplates(
            uniqueTemplates,
            CRM,
            melissaToken,
            setCurrentTemplatesStateInCrm
          );
          getHTMLTemplates(uniqueHTMLTemplates, setHtmlTemplates, setCrmConnectError) ?? setError(true)

          break;
        }
        case "lica": {
          getCRMTemplates(
            uniqueTemplates,
            CRM,
            licaToken,
            setCurrentTemplatesStateInCrm
          );
          getHTMLTemplates(uniqueHTMLTemplates, setHtmlTemplates, setCrmConnectError) ?? setError(true)

          break;
        }
        default:
          break;
      }
    })();
  }, [dataFromFile]);

  // get templates data for preview
  useEffect(() => {
    if (currentTemplatesStateInCrm && htmlTemplates.length) {
      const templates = dataFromFile?.map((row) => {
        const { crm, template_id, template, language, subject } = row;
        const waysToTitleByCrm = {
          melissa: (currentTemplatesStateInCrm) =>
          currentTemplatesStateInCrm[template_id]?.main?.name,
          lica: (currentTemplatesStateInCrm) =>
          currentTemplatesStateInCrm[template_id]?.name,
        };

        const templateTitleInCrm = waysToTitleByCrm[crm](
          currentTemplatesStateInCrm
        ) ?? <span className="error">{"can't get title from crm"}</span>;
        const templateForMarkup = htmlTemplates.find(
          (el) => el.title === template
        );
        const footerType = row.footerType;

        const preparedHTML = assembleTemplate(
          row,
          language,
          footerType,
          templateForMarkup
        );
        return {
          crm,
          templateId: template_id,
          templateName: template,
          templateTitleInCrm: templateTitleInCrm,
          isNews: row?.news || row?.newsImage ? true : false,
          index: `${template_id}-${language}`,
          language,
          subject: subject.search(`'`) ? subject.replace(`'`, `′`) : subject,
          templateHTML: preparedHTML,
          news:
            row?.news || row?.newsImage
              ? { "lang_id": langID[language], "img": row?.newsImage, "text": row?.news }
              : "",
        };
      });
      setTemplatesPreview(templates);
      setTemplatePrep(templates)
    }
  }, [currentTemplatesStateInCrm, htmlTemplates]);

  return dataFromFile && templatesPreview.length ? (
    templatesPreview?.map((template, index) => (
      <React.Fragment key={index}>
        <PreviewHeader
          key={"header" + template.index + index}
          crm={template.crm}
          templateId={template.templateId}
          templateTitleInCrm={template.templateTitleInCrm}
          templateName={template.templateName}
          isNews={template.isNews}
        />
        <Preview
          key={template.index + index}
          index={template.index}
          language={template.language}
          subject={template.subject}
          news={template.news}
          templateHTML={template.templateHTML}
        />
      </React.Fragment>
    ))
  ) : error ? (
    <p className="error"> {error}</p>
  ) : (
    <LinearProgress />
  );
}
