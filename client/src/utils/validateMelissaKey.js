import { getMelissaTemplate } from '../api/melissa/getMelissaTemplate';


export async function validateMelissaKey(token) {
    const testTemplateNumber = 3888;
    const template = await getMelissaTemplate(testTemplateNumber, token);
    
    return template === '403 - Forbidden' ? false : true;
}