export default function replaceInString(variables, values, template) {
    let string = template;

    for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        const regex = `{{${variable}}}`;
        const re = new RegExp(regex, "g");
        const result = string.replaceAll(re, values[variable]);
        string = result;
      }
      return string
}