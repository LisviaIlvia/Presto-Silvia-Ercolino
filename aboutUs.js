
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

let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');

let persons = [
    { name: 'Gustavo', role: 'CEO & Co-Founder', description: "è il visionario dietro il nostro sito di annunci, con una passione innata per la tecnologia e l'innovazione. Con oltre 15 anni di esperienza nel settore digitale, ha guidato il team sin dai primi giorni, trasformando un'idea in una piattaforma leader nel mercato.", url: './media/person-wearing-colorful-fashion.jpg' },
    { name: 'Carla', role: 'CTO & Co-Founder', description: "è il cervello tecnico del nostro sito. Con una solida esperienza in sviluppo software e architetture web, ha costruito l'infrastruttura tecnologica che alimenta la nostra piattaforma. Grazie alla sua competenza tecnica e alla sua capacità di risolvere problemi complessi, assicura che tutto funzioni senza intoppi e in modo sicuro.", url: './media/carla.jpg' },
    { name: 'Patrizio', role: 'Chief Marketing Officer', description: "è il mago del marketing del nostro team, con un occhio attento per le tendenze del mercato e una mente creativa sempre pronta a sviluppare nuove strategie. Grazie al suo background in marketing digitale e analisi dei dati, ha sviluppato campagne di successo che hanno portato traffico e visibilità al nostro sito. E' responsabile delle nostre campagne pubblicitarie e del posizionamento del brand.", url: './media/patrizio.jpg' },
    { name: 'Anastasia', role: 'Head of Customer Experience', description: "è la voce dei nostri utenti e la persona che assicura che ogni visitatore abbia un'esperienza positiva sul nostro sito. Con una vasta esperienza in gestione clienti e supporto, Anastasia è dedita a migliorare continuamente il nostro servizio clienti, ascoltando attentamente i feedback degli utenti e implementando soluzioni efficaci.", url: './media/anastasia.jpg' },
];

persons.forEach((person) => {
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${person.url})`
    circle.appendChild(div);

});

let moveds = document.querySelectorAll('.moved');
let cardWrapper = document.querySelector('#card-wrapper');

opener.addEventListener('click', () => {
    if (!check) {
        opener.style.transform = 'rotate(45deg)'
        moveds.forEach((moved, i) => {
            let angle = (360 * i) / moveds.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;
    } else {
        check = false;
        opener.style.transform = '';
        moveds.forEach((moved) => {
            moved.style.transform = '';
        });

        cardWrapper.innerHTML = '';
    }
});




let cardName = document.querySelector('#card-name');
let cardRole = document.querySelector('#card-role');
let cardDescription = document.querySelector('#card-description');


moveds.forEach((moved, i) => {
    moved.addEventListener('click', () => {
        let persona = persons[i];
        cardWrapper.innerHTML = '';
        let div = document.createElement('div');
        div.classList.add('flip-card');
        div.innerHTML = `
                        <div class="inner">
                            <div class="inner-face"></div>
                            <div class="inner-back">
                                <p id="card-name" class="h4">${persona.name}</p>
                                <p id="card-role" class="lead">${persona.role}</p>
                                <p id="card-description" class="lead">${persona.description}</p>
                            </div>
                        </div>
                        `;
        cardWrapper.appendChild(div);

        let innerFace = document.querySelector('.inner-face');

        innerFace.style.backgroundImage = `url(${persona.url})`

    });
});