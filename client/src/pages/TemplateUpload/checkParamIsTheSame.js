export default function checkParamIsTheSame(param, data) {
    const first = data[0][param];
    return data.every(el => el[param] === first)
}