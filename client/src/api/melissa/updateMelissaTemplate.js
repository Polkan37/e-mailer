import { home } from '../../constants/homeUrl'

export async function updateMelissaTemplate(id, token, request) {
  const header = { mode: "no-cors",  "CRM-Token": token }
  const url = `${home}/thiscrm-proxy/api/mail/template/${id}`;
  let result;
  await fetch(url, {
    method: "PUT",
    headers: header,
    body: JSON.stringify(request),
  }).then(async (data) => {
    result = await data.json();
  });
  return result;
}