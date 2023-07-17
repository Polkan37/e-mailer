
import replaceInString from "./replaceInString";

export function assembleTemplate(dataFromFile, language, footerType, templateForMarkup) {
    const { variables, constants, html } = templateForMarkup;
    const constVariables = constants.map(el => el.alias)
    let constValues = {};
    constants.forEach(el => el.title === "footer" ? constValues[el.alias] = el.value[footerType] : constValues[el.alias] = el.value[language])

    const dataWithVariables =  replaceInString(variables, dataFromFile, html);
    const dataWithConstants =  replaceInString(constVariables, constValues, dataWithVariables);
    return dataWithConstants;
}