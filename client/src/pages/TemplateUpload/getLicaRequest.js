import { getLicaTemplateTranslationIds } from "../../api/lica/getLicaTemplateTranslationIds";


export default async function getLicaRequest(templateId, language, subject, html, licaToken, setError) {
  
  const templateInfo = await getLicaTemplateTranslationIds(templateId, licaToken);
    
    if(templateInfo === '500 - HTTP_INTERNAL_SERVER_ERROR') return setError('Update LICA API Key') 
    const id = templateInfo.translations.find( id => id.code === language)?.id

    if(!id) {
        setError(`translation_id not found for ${templateId} ${language} translation`);    
      }

      
    return {
        "id": id,
        "template_id": templateId,
        "code": language,
        "subject": subject,
        "text": html
      }

}