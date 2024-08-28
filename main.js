let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logo = document.querySelector('.navbar-brand');

window.addEventListener('scroll', ()=> {
    let scrolled = window.scrollY;

    if(scrolled > 0) {
        navbar.classList.remove('bg-indaco');
        navbar.classList.add('bg-giallo');
        navbar.style.height = '140px';
        links.forEach((link)=> {
            link.style.color = 'var(--rosa)';
        });
         logo.innerHTML = `<img src="./media/logo-rosa.png" alt="logo" class="img-fluid logo">`;
        
    } else {
        navbar.classList.add('bg-indaco');
        navbar.classList.remove('bg-giallo');
        navbar.style.height = '70px';
        links.forEach((link)=> { 
            link.style.color = 'var(--pesca)'; 
        });
        logo.innerHTML = `<img src="./media/logo-pesca.png" alt="logo" class="img-fluid logo">`
    }
});