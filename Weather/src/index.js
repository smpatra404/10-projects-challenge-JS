const woid_url = 'https://www.metaweather.com/api/location/search/?query=';
async function fetchid() {
    const res = await fetch('https://www.metaweather.com/api/location/search/?query=pune')
        .then(res => res.json());

    return res;
}
async function main() {
    const d = await fetchid();
    console.log(d)
}
main()