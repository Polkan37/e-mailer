export async function getLicaTemplateTranslationIds(id, token) {
    const url = `https://trigger.pleione.co/api/v1/template/get/translation?id=${id}`;
    const result = {
      brand: "",
      name: "",
      trigger_id: "",
      translations: [],
    };
  
    const data = await fetch(url, {
      method: "GET",
      headers: {
        mode: "no-cors",
        Authorization: `Bearer ${token}`,
      },
    });
  
    const template = await data.json();
    if (template.code === 200) {
      result.brand = template.data.brand_id;
      result.name = template.data.name;
      result.trigger_id = template.data.trigger_id;
      template.data.translation.forEach((element) => {
        result.translations.push({
          id: element.id,
          template_id: element.template_id,
          code: element.code,
        });
      });
  
      return result;
    } else {
      return template.status + " - " + template.message;
    }
  }