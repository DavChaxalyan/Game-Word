let word = document.querySelector('.word');
let inp = document.querySelector('.inp');
let btn = document.querySelector('.btn');
let btn1 = document.querySelector('.btn1');
let score = document.querySelector('.score');
let scoree = document.querySelector('.scoree');
let icons = document.querySelectorAll('.fa-solid');
let start = document.querySelector('.start');
let taim = document.querySelector('.chess');
let wordDesc = document.querySelector('.word-description');
let id;
let num = taim.innerText.split(':')
let seconds = num[1];
let minuts = num[0];
let wordsArr = ['hello', 'book', 'table'];



function getInfo(elem) {
    fetch( `https://api.dictionaryapi.dev/api/v2/entries/en/${elem} `)
        .then(res => {
            return res.json();
        }).then(val => {
            wordDesc.innerText = val[0].meanings[0].definitions[0].definition;
        })
}



function xarnel(str) {
    let arr = str.split('');
    for(let i = 0; i < arr.length; i++){
        let random = Math.floor(Math.random() * str.length);
        let random2 = Math.floor(Math.random() * str.length);
        [arr[random], arr[random2]] = [arr[random2], arr[random]]
    };

    return arr.join('') 
}



if(sessionStorage.getItem('record')){
    score.innerText = sessionStorage.getItem('record')
}else {
    score.innerText = 0
}

if(sessionStorage.getItem('bar')){
    word.innerText = sessionStorage.getItem('bar')
}else {
    word.innerText = xarnel(wordsArr[0])
}

sessionStorage.setItem('heart', 0)
sessionStorage.setItem('ind', 0)
scoree.innerText = 0
word.innerText = '?'
wordDesc.innerText = '?'
btn.style.opacity = 0
inp.value = '';



function validation() {

        if (!sessionStorage.getItem('heart')) {
            sessionStorage.setItem('heart', 0);
        }
        
        if(!sessionStorage.getItem('record')){
            sessionStorage.setItem('record', 0);
        }

        if(!sessionStorage.getItem('ind') || sessionStorage.getItem('ind') >= wordsArr.length){
            sessionStorage.setItem('ind', 0);
        }

        
        if (inp.value == wordsArr[sessionStorage.getItem('ind')]) {
            seconds = Number(seconds) + 20;
            if (seconds < 60) {
                taim.innerText = minuts + ':' + seconds;
            } else {
                minuts = Number(minuts) + 1;
                seconds = Number(seconds) - 60;
            }
            if (seconds < 10) {
                taim.innerText = minuts + ':0' + seconds;
            }else {
                taim.innerText = minuts + ':' + seconds;
            }

            let res = sessionStorage.getItem('ind');
            let achoq = scoree.innerText;
            scoree.innerText = ++achoq;
            let record = sessionStorage.getItem('record');
            if (sessionStorage.getItem('ind') < wordsArr.length - 1) {
                sessionStorage.setItem('ind', ++res); 
            } else {
                sessionStorage.setItem('ind', 0);
                res = 0;
            }
            sessionStorage.setItem('bar', xarnel(wordsArr[res]))

            if (achoq > record) {
                sessionStorage.setItem('record', ++record);
                score.innerText = sessionStorage.getItem('record');
            }
            
            word.innerText = sessionStorage.getItem('bar');
            getInfo(wordsArr[sessionStorage.getItem('ind')])
            inp.value = '';
            if(sessionStorage.getItem('ind') != wordsArr.length){
                word.innerText = sessionStorage.getItem('bar');
            } else {
                word.innerText = xarnel(wordsArr[0]);
            }
        } else if(inp.value != '' && inp.value != wordsArr[sessionStorage.getItem('ind')]){
            let heartt = sessionStorage.getItem('heart');
            if (sessionStorage.getItem('heart') != 2) {
                icons[sessionStorage.getItem('heart')].className = 'fa-regular fa-heart';
                sessionStorage.setItem('heart', ++heartt);
                if(sessionStorage.getItem('heart') == icons.length){
                    scoree.innerText = 0;
                }
            } else{
                icons[sessionStorage.getItem('heart')].className = 'fa-regular fa-heart';
                word.innerText = '?';
                inp.value = '';
                wordDesc.innerText = '?'
                btn1.style.opacity = 1;
                btn.style.opacity = 0;
                clearInterval(id)
                sessionStorage.setItem('heart', 0);
            }
        }
        inp.value = '';
}



function starting() {
    taim.innerText = '00:30';
    start.style.opacity = 0;
    btn.style.opacity = 1; 
    word.innerText = xarnel(wordsArr[0])
    inp.value = '';
    scoree.innerText = 0;
    getInfo(wordsArr[0])
    taimer()
};



function tryAgain() {
    taim.innerText = '00:30'
    btn1.style.opacity = 0;
    btn.style.opacity = 1;
    scoree.innerText = 0;
    getInfo(wordsArr[0])
    word.innerText = xarnel(wordsArr[0]);
    icons.forEach((elem) => {
        elem.className = 'fa-solid fa-heart'
    })
    taimer()
}




function taimer() {

    seconds = num[1];
    minuts = num[0];
    
    id = setInterval(() => {

        if (seconds > 0) {
            seconds -= 1;
        }
        if (seconds == 0 && minuts == 0) {
            btn.style.opacity = 0;
            btn1.style.opacity = 1;
            inp.value = '';
            clearInterval(id)
        }
        if (seconds == 0 && minuts != 0) {
            seconds = 60;
            minuts = Number(minuts) - 1;
        }
    
        if (seconds < 10) {
            taim.innerText = minuts + ':0' + seconds
        }else {
            taim.innerText = minuts + ':' + seconds
        }
    }, 1000)
}
