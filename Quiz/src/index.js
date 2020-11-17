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
let wrong_ans = 0;
const qns_list = [
    {
        'qns':'what is color of sky ?',
        'a':'blue',
        'b':'red',
        'c':'green',
        'd':'yellow',
        'cor':'a'
    },
    {
        'qns':'One plus one is how much ?',
        'a':'1',
        'b':'2',
        'c':'3',
        'd':'y4low',
        'cor':'b'
    },
    {
        'qns':'hahshh pl;lam;lus one is how much ?',
        'a':'11',
        'b':'24',
        'c':'33',
        'd':'y4111low',
        'cor':'b'
    }
];

function loadqns() {
    qns.innerText = qns_list[qns_num].qns
    a_lbl.innerText = qns_list[qns_num].a
    b_lbl.innerText = qns_list[qns_num].b
    c_lbl.innerText = qns_list[qns_num].c
    d_lbl.innerText = qns_list[qns_num].d
    qns_num = qns_num + 1
}
function getans() {
    document.querySelectorAll('input').forEach( input => {
        if(input.checked){
            return input.id
        }
    });
}

function main() {
    //For 1st qns loading
    console.log(qns_num)
    if (qns_num = 0) {
        loadqns;
    } else {
        loadqns
    }
}


btn.addEventListener('click', main)

