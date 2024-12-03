
export async function fetchData(url) {
    try {
        const response = await fetch(url, { mode: 'no-cors' });
        if(!response.ok) {
            throw new Error(`HTTP ERROR status = ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
