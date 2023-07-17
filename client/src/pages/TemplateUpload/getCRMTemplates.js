
import { getMelissaTemplate } from "../../api/melissa/getMelissaTemplate";
import { getLicaTemplate } from "../../api/lica/getLicaTemplate";

export function getCRMTemplates(uniqueTemplates, crm, token, setCurrentTemplatesStateInCrm) {
    const crmFunctions = {
        melissa: getMelissaTemplate,
        lica: getLicaTemplate
    }
    uniqueTemplates.map(async (element) => {
        const template = await crmFunctions[crm](element, token);
        setCurrentTemplatesStateInCrm(currentTemplatesStateInCrm => { return {
          ...currentTemplatesStateInCrm,
            [element]: template,
        }
    });
})

}