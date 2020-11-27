const searchbar_element = document.querySelector('#search-bar');
const gobtn_element = document.querySelector('#go-btn');
const image = document.querySelector('.profile-container img');
const name_header = document.querySelector('.profile-details h1');
const repolis = document.querySelector('.repos ul');
const url = 'https://api.github.com/users/';
async function getuserdetails(url, name) {
    const user = await fetch(url + name)
        .then(res => res.json())
        .then(json_res => {
            return json_res;
        });
    if (user) {
        return user
    } else {
        alert('Nothing found for user ' + name)
    }
}
async function getrepos(url) {
    const repo_list = await fetch(url)
        .then(res => res.json())
        .then(json_res => {
            return json_res;
        });
    if (repo_list) {
        return repo_list;
    } else {
        alert('Nothing found for user ' + repo_list);
    }
}
async function renderpage(name) {
    const res = await getuserdetails(url, name);
    name_header.innerText = res.name;
    image.src = res.avatar_url;
    const repos = await getrepos(res.repos_url);
    repos.map((r) => {
        const li = document.createElement('li');
        li.innerText = r.name;
        repolis.appendChild(li);
    });
}
async function main() {
    renderpage('smpatra404');
    gobtn_element.addEventListener('click', () => {
        let userid = searchbar_element.value;
        repolis.querySelectorAll('li').forEach((li) => {
            li.remove();
        });
        renderpage(userid.replace(/\s/g, ''));
    });
}
main()
