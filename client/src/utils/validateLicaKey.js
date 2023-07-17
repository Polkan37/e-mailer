import { getLicaTemplate } from '../api/lica/getLicaTemplate';


export async function validateLicaKey(token) {
    const testTemplateNumber = 10;
    const template = await getLicaTemplate(testTemplateNumber, token);
    
    return template === '500 - HTTP_INTERNAL_SERVER_ERROR' ? false : true;
}