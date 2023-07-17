import { home } from '../../constants/homeUrl'

export async function getConstants() {
    const url = `${home}/api/constants`;

    const data = await fetch(url).then((response) => {
        return response.json();
    })

    return data
}