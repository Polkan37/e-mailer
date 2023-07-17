export async function getLicaTemplate(id, token) {
    const url = `https://trigger.pleione.co/api/v1/template/get/translation?id=${id}`;
  
    const data = await fetch(url, {
      method: "GET",
      headers: {
        mode: "no-cors",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('data', data)
  
    const result = await data.json();
    if (result.code === 200) {
      return result.data;
    } else {
      return result.status + " - " + result.message;
    }
  }