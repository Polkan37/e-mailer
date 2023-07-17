import { home } from '../../constants/homeUrl';

export async function getHtmlTemplateByName(templateName) {
    const url = `${home}/api/templates/${templateName}`;

    const info = await fetch(url).then((response) => {
    if(response.status === 200) {
        return response.json()
    } if(response.status === 404) {
        return 0
    } else {
        return response
    }
    }).catch(err => {
        return err.message
    })
    return info
}