import { getHtmlTemplateByName } from "../../api/server/getHtmlTemplateByName";

export function getHTMLTemplates(uniqueHTMLTemplates, setHtmlTemplates, setError) {
    uniqueHTMLTemplates.map(async (element) => {
        const template = await getHtmlTemplateByName(element);
        template ? setHtmlTemplates(htmlTemplates => [...htmlTemplates, template]) : setError('No such template: ' + element)
    })
}