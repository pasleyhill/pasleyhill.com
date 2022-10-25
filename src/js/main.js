'use strict';
const mCloseMenuBtn = document.getElementById('close-button');
const mOpenMenuBtn = document.getElementById('open-menu-button');
const mGetQuoteBtn = document.getElementById('get-a-quote');
const deskMenu = document.getElementById('desk-menu');
const mobileMenu = document.getElementById('mobile-menu');
const hiddenElements = document.querySelectorAll('section');
const mContactBtn = document.getElementById('contact-form-btn');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.add('show-it');
        }else{
            entry.target.classList.remove('show-it');
        }
    })
})

hiddenElements.forEach((el) => observer.observe(el));

mCloseMenuBtn.onclick = () => {
    mobileMenu.classList.add('invisible');
}
mOpenMenuBtn.onclick = () => {
    mobileMenu.classList.remove('invisible');
}

function scrollToClick(e){
    e.preventDefault();
    const elmString = e.target?.dataset?.elem;
    const element = document.getElementById(elmString);
    if(!element) return (console.warn('Element not scrollable'));
    element.scrollIntoView({behavior: "smooth"});
}

function onClick(e) {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute('6LeiJrEiAAAAALtR7oqmCB4k59UQlZarrsg0A1RI', {action: 'submit'}).then(function(token) {
          // Add your logic to submit to your backend server here.
          console.log(token);
      });
    });
}

mContactBtn.onclick = onClick;
deskMenu.onclick = scrollToClick;
mobileMenu.onclick = scrollToClick;
mGetQuoteBtn.onclick = scrollToClick;

console.log('hello world');