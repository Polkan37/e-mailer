import { home } from '../../constants/homeUrl'

export function getHtmlTemplates() {
    const url = `${home}/api/templates`;

    const data = fetch(url).then((response) => {
        return response.json();
    })

    return data
}