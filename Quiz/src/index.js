const container = document.querySelector('.container');
const result = document.querySelector('.result');
const qns = document.getElementById('qns');
const a = document.getElementById('a');
const b = document.getElementById('b');
const c = document.getElementById('c');
const d = document.getElementById('d');
const a_lbl = document.getElementById('a_lbl');
const b_lbl = document.getElementById('b_lbl');
const c_lbl = document.getElementById('c_lbl');
const d_lbl = document.getElementById('d_lbl');
const btn = document.getElementById('btn');
let qns_num = 0;
let score = 0;
let attempts = 0;
const qns_list = [
    {
        qns: 'what is color of sky ?',
        a: 'blue',
        b: 'red',
        c: 'green',
        d: 'yellow',
        cor: 'a'
    },
    {
        qns: 'One plus one is how much ?',
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        cor: 'b'
    },
    {
        qns: 'what is the color of water?',
        a: 'blue',
        b: 'green',
        c: 'red',
        d: 'none',
        cor: 'd'
    }
];

function loadqns() {
    qns.innerText = qns_list[qns_num].qns
    a_lbl.innerText = qns_list[qns_num].a
    b_lbl.innerText = qns_list[qns_num].b
    c_lbl.innerText = qns_list[qns_num].c
    d_lbl.innerText = qns_list[qns_num].d
}
function getans() {
    let answer = undefined
    document.querySelectorAll('input').forEach(input => {
        if (input.checked) {
            answer = input.id
        }
    });
    return answer
}

if (qns_num == 0) {
    loadqns();
}

btn.addEventListener('click', () => {
    if (getans() == qns_list[qns_num].cor) {
        if (qns_num + 1 < qns_list.length) {
            score += 1;
            qns_num = qns_num + 1;
            loadqns();
        }
        else {
            container.classList.add('hide');
            result.innerText = 'Score : ' + (score + 1)
                + ' , Attempts : ' + (attempts + 1);
            result.classList.add('active');
        }
    }
    else {
        alert('wrong ');
    }
    attempts += 1;
})