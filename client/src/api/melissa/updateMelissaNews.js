import { home } from '../../constants/homeUrl'


export async function updateMelissaNews(id, token, request) {
    const header = { mode: "no-cors",  "CRM-Token": token }
    const url = `${home}/thiscrm-proxy/api/mail/news/${id}`;
    let result;
    console.log('JSON.stringify(request): ', JSON.stringify(request));
    await fetch(url, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(request)
    }).then(async (data) => {
        result = await data.json();
    }).catch( error => error)
    return result
}