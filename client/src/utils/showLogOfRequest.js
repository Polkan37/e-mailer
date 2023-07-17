
export function showLogOfRequest(type, id, language, result, logContainer, crm = 'melissa') {
    const status = result?.code === 200 ? 'ok' : 'error'
    const messages = {
      email: {
        ok: `<p>${id} - <b>${type} ${language}</b> updated ✅ ${crm !== 'melissa' ? `- ${crm}` : ''}</p>`,
        error: `<p>${id} - <b>${type} ${language}</b><br/> error ${result?.code} - ${result?.message} ❌</p>`
      },
      news: {
        ok: `<p>${id} - <b>${language} news</b> updated ✅</p>`,
        error: `<p>${id} - <b>${language} news</b><br/> error ${result?.code} - ${result?.message} ❌</p>`
      }
    }
    
    logContainer.innerHTML += messages[type][status]
  
  }