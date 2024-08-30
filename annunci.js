//  json: Javascript Object Notification

// Se il json a cui mi devo collegare è onlin la chiamata tramite il .fetch() la farò ad una API.
// API: chiavi che ci permettono di raggiungere un json online (link ad un json esterno)

// .fetch(): chiamata asincrona che ci permette di collegarci ad un json e da esso estrarne il dato sotto forma di promise.
// .then(): questo metodo permette di converteire la promise nel dato strutturale e di poterlo utilizzare come tale su JS

// Se il json è nel mio progetto
// 1. fetch() = mi collego al json e ne ottengo una promise
// 2. .then() = converto la promise in un dato strutturale js
// 3. .thenh() = utilizzo il dato ottenuto

// .json(): metodo delle promise che mi permette di convertire una promise in un dato javaScript

let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logo = document.querySelector('.navbar-brand');
let menu = document.querySelector('#logo-menu');
let collapse = document.querySelector('.collapse');

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


fetch('./annunci.json').then((response) => response.json()).then((data) => {

    data.sort((a, b) => a.price - b.price);

    let radioWrapper = document.querySelector('#radio-wrapper');
    let cardWrapper = document.querySelector('#card-wrapper');

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);


        // let categoriesNoRepeat = [];

        // categories.forEach((category)=> {
        //     if(!categoriesNoRepeat.includes(category)) {
        //         categoriesNoRepeat.push(category)
        //     }
        // });

        // Set(): classe che mi restituisce , partendo da un array, un nuovo oggetto di tipo set il quale contiene solo valori univoci e non replicabili.
        // Array.from(): mi permette di convertire un array-like in un array
        let categoriesNoRepeat = Array.from(new Set(categories));

        categoriesNoRepeat.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
                            <input class="form-check-input" type="radio" name="categories" id="${category}">
                            <label class="form-check-label" for="${category}">
                                ${category}
                            </label>
            `;
            radioWrapper.appendChild(div);
        });
    }

    radioCreate();

    function truncateWord(string) {
        if (string.length > 10) {
            return string.split(' ')[0] + '...';
        } else {
            return string;
        }
    }

    // function getRandomImage(width = 300) {

    //     return `https://picsum.photos/${width}?random=${Math.random()}`;
    // }

    function showCards(array) {
        cardWrapper.innerHTML = '';
        array.forEach((annuncio, i) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');

            // // Crea un elemento immagine e imposta la sorgente
            // let img = document.createElement('img');
            // img.src = getRandomImage(); // Imposta l'immagine casuale
            // img.classList.add('img-fluid', 'img-card');
            // ${img.outerHTML}

            div.innerHTML = `
                            <img src="https://picsum.photos/${300 + i}" alt="immagine casuale" class="img-fluid img-card">
                            <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                            <p class="h4">${annuncio.category}</p>
                            <p class="lead">${annuncio.price} €</p>
            `;
            cardWrapper.appendChild(div);
        });
    }

    showCards(data);

    function filterByCategory(categoria) {
        // In questa funzione ho bisogno di ottenere un nuovo array, partendo da data e gli elementi del nuovo array dovranno soddisfare la condizione per la quale la loro category sia uguale alla categoria che passo alla funzione
        if (categoria != 'all') {
            let filtered = data.filter((annuncio) => annuncio.category == categoria);
            showCards(filtered);
        } else {
            showCards(data);
        }

    }

    let radioButtons = document.querySelectorAll('.form-check-input');

    radioButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterByCategory(button.id);
        })
    });

    let priceInput = document.querySelector('#price-input');
    let priceValue = document.querySelector('#price-value');

    function setPriceInput() {
        // Dopo aver catturato l'imput voglio settare come proprietà max dello stasso il valore piu alto tra i price di ogni annuncio. Per farlo avro bisogno di un array che contenga solo i prezzi, poi lo ordino in maniera decrescente e prendo lelemento con il valore piu alto
        let prices = data.map((annuncio) => +annuncio.price);
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        console.log(maxPrice);
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = `${maxPrice} €`;
    }
    setPriceInput();

    function filterByPrice() {

        let filterPrice = data.filter((annuncio) => +annuncio.price <= priceInput.value);
        showCards(filterPrice);
    }

    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = `${priceInput.value} €`;
        filterByPrice();
    });

    let wordInput = document.querySelector('#word-input');

    function filterByWord(word) {
        let filtered = data.filter((annuncio) => annuncio.name.toLowerCase().includes(word.toLowerCase()));
        showCards(filtered);
    }

    wordInput.addEventListener('input', () => {
        filterByWord(wordInput.value);
    })


});