import fs from 'fs';

export async function getTemplateByName(name) {
    const strData = await fs.promises.readFile(`./data/templatesBook.json`, { encoding: 'utf-8' });
    const jsonData = JSON.parse(strData);
    const templateObj = jsonData.find(data => data.title == name);

    if (templateObj) {
        const staticTranslations = [];
        const strData = await fs.promises.readFile(`./data/constants.json`, { encoding: 'utf-8' });
        const jsonData = JSON.parse(strData);

        templateObj.constants.forEach(element => {
            const findValue = jsonData.find(data => data.title === element)
            if (findValue) staticTranslations.push({
                ...findValue
            });
        });

        try {
            const html = await fs.promises.readFile(`./data/htmltemplates/${name}.html`, 'utf8');
            return {
                title: templateObj.title,
                constants: staticTranslations,
                variables: templateObj.variables,
                html
            }

        } catch (error) {
            console.error(error);
        }
    }

    return false;
}

        // new Date().toLocaleString('uk-UA')

export async function getAllTemplatesList() {
    const strData = await fs.promises.readFile(`./data/templatesBook.json`, { encoding: 'utf-8' });
    const jsonData = JSON.parse(strData);
    return jsonData || [];
}

export async function getAllConstants() {
    const strData = await fs.promises.readFile(`./data/constants.json`, { encoding: 'utf-8' });
    const jsonData = JSON.parse(strData);
    return jsonData
}

export async function updateConstant(name, newValue) {
    const strData = await fs.promises.readFile(`./data/constants.json`, { encoding: 'utf-8' });
    const fileData = JSON.parse(strData);
    
    const constantIndex = fileData.findIndex(constant => constant.title === name );
    if (constantIndex === -1) {
        return null;
    }

    fileData[constantIndex] = newValue;
    await fs.promises.writeFile(`./data/constants.json`, JSON.stringify(fileData), { encoding: 'utf-8' });
    return newValue
}
