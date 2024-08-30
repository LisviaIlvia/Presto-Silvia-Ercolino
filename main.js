let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logo = document.querySelector('.navbar-brand');
let menu = document.querySelector('#logo-menu');
let collapse = document.querySelector('.collapse');
let firstNumber = document.querySelector('#first-number');
let secondNumber = document.querySelector('#second-number');
let thirdNumber = document.querySelector('#third-number');
let logoText = document.querySelector('.logo-text');

let confirm = true;
let check = false;

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.classList.remove('bg-indaco');
        navbar.classList.add('bg-giallo');
        collapse.classList.remove('bg-indaco');
        collapse.classList.add('bg-giallo');
        links.forEach((link) => {
            link.style.color = 'var(--rosa)';
        });
        logo.innerHTML = `<img src="./media/logo-rosa.png" alt="logo" class="img-fluid logo"><p id="logo-text" class="h6 d-inline ps-1 text-rosa">presto.it</p>`;
        menu.src = './media/menu-rosa.png';

    } else {
        navbar.classList.add('bg-indaco');
        navbar.classList.remove('bg-giallo');
        collapse.classList.add('bg-indaco');
        collapse.classList.remove('bg-giallo');
        links.forEach((link) => {
            link.style.color = 'var(--pesca)';
        });
        logo.innerHTML = `<img src="./media/logo-pesca.png" alt="logo" class="img-fluid logo"><p id="logo-text" class="h6 d-inline ps-1 text-pesca">presto.it</p>`;
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
// Nella variabile creo un oggetto della classe IntersectionObserver.
// In questo Oggetto scatta una Callback che accetta qualsiasi numero di parametri e li salva nel parametro formale entries che è un array

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
// chiamo la funzione observe() e gli dico che deve scattare quando incontra l'elemento html 'firstNumber'
observer.observe(firstNumber);


// SWIPER

let reviews = [
    { user: 'Silvia', description: `Il più bel sito di annunci del mondo!`, rank: 5 },
    { user: 'Alin', description: `Gustavo dovrebbe tagliarsi la barba!`, rank: 2 },
    { user: 'Micheal', description: `Bello ma troppi fiori!`, rank: 3.5 },
    { user: 'Arina', description: `Gli annunci più belli dell'Universo!`, rank: 4.5 },
    { user: 'Giada', description: `Fantastico!`, rank: 5 },
    { user: 'Matteo', description: `Bello, colorato, interessante! Il top del top...`, rank: 5 },
];

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((recensione) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
        <div class="card-review">
            <p class="lead text-center">${recensione.description}</p>
            <p class="h4 text-center">${recensione.user}</p>
            <div class="d-flex justify-content-center star">
                
            </div>
        </div>
        `;
    swiperWrapper.appendChild(div);
});


let stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {

    star.innerHTML = '';

    // Parte intera del rank
    let fullStars = Math.floor(reviews[index].rank);

    // Verifica se c'è una mezza stella
    let hasHalfStar = reviews[index].rank % 1 !== 0;

    // Aggiunge le stelle piene
    for (let i = 1; i <= fullStars; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star', 'fa-2x');
        star.appendChild(icon);
    }

    // Aggiunge la mezza stella se necessario
    if (hasHalfStar) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star-half-alt', 'fa-2x');
        star.appendChild(icon);
    }

    // Aggiunge le stelle vuote
    let emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= emptyStars; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star', 'fa-2x');
        star.appendChild(icon);
    }

});




const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
    loop: true,


});