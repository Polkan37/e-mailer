import { home } from '../../constants/homeUrl'

export async function getMelissaTemplate(id, token) {
  const header = { mode: "no-cors",  "CRM-Token": token }
  const url = `${home}/thiscrm-proxy/api/mail/template/${id}`;
  const data = await fetch(url, {
    method: "GET",
    headers: header,
  }).catch( err => console.error(err))

  if (data.status === 200) {
    const result = await data.json();

    return result.data;
  } else {
    return data.status + " - " + data.statusText;
  }
}