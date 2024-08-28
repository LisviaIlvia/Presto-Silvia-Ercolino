let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logo = document.querySelector('.navbar-brand');
let menu = document.querySelector('#logo-menu');
let collapse = document.querySelector('.collapse');
let firstNumber = document.querySelector('#first-number');
let secondNumber = document.querySelector('#second-number');
let thirdNumber = document.querySelector('#third-number');

let confirm = true;
let check = false;

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.classList.remove('bg-indaco');
        navbar.classList.add('bg-giallo');
        collapse.classList.remove('bg-indaco');
        collapse.classList.add('bg-giallo');
        navbar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = 'var(--rosa)';
        });
        logo.innerHTML = `<img src="./media/logo-rosa.png" alt="logo" class="img-fluid logo">`;
        menu.src = './media/menu-rosa.png';

    } else {
        navbar.classList.add('bg-indaco');
        navbar.classList.remove('bg-giallo');
        collapse.classList.add('bg-indaco');
        collapse.classList.remove('bg-giallo');
        navbar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = 'var(--pesca)';
        });
        logo.innerHTML = `<img src="./media/logo-pesca.png" alt="logo" class="img-fluid logo">`
        menu.src = './media/menu-pesca.png';
    }
});

menu.addEventListener('click', () => {
    if (check == false) {
        menu.style.transform = `rotate(-90deg)`;
        check = true;
    } else {
        menu.style.transform = `rotate(0deg)`;
        check = false;
    }

});

// Chiamate Asincrone: 
// setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole iterazioni
// Il setInterval() è una funzione che vuole due parametri: il primo è la callback che contiene le istruzioni da eseguire. il secondo è l'intervallo di tempo che deve passare tra una iterazione e l'altra espresso in millisecondi.
// clearInterval(): pulisce un intervallo

// setTimeout(): Fa partire un blocco di istruzioni dopo tot millisecondi

function createInterval(n, element, time) {

    let counter = 0;

    let interval = setInterval(() => {
        if (counter < n) {
            counter++
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }

    }, time);

    setTimeout(() => {
        confirm = true;
    }, 8000);
}

// IntersectionObserver: è una Classe del browser che si occupa di far scattare una funzione nel momento in cui sul browser sono visibili gli elemnti html che noi gli indichiamo.
//  new: keyword che mi permette di generare u  oggetto partendo da una Classe.

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm) {
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
        }
    });
});

observer.observe(firstNumber);