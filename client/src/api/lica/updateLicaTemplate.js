
export async function updateLicaTemplate(id, token, request) {
  const header = { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  const url = `https://trigger.pleione.co/api/v1/translation/update?id=${id}`;
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