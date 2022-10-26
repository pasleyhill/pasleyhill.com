'use strict';
import.meta.hot;
const mCloseMenuBtn = document.getElementById('close-button');
const mOpenMenuBtn = document.getElementById('open-menu-button');
const mGetQuoteBtn = document.getElementById('get-a-quote');
const deskMenu = document.getElementById('desk-menu');
const mobileMenu = document.getElementById('mobile-menu');
const hiddenElements = document.querySelectorAll('section');
const mContactBtn = document.getElementById('contact-form-btn');
const apiUrl = 'https://'+__SNOWPACK_ENV__?.SNOWPACK_PUBLIC_API_URL;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry);
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

function toggleElements(enabled=true,elements){
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = !enabled;
    }
}

const form = document.getElementById('contact-form');

function onClick(e) {
    e.preventDefault();
    if(!form.checkValidity()){
        for (let i = 0, len = form.elements.length; i < len; ++i) {
            console.log(form.elements[i].checkValidity());
            if(!form.elements[i].checkValidity()){
                form.elements[i].classList.add('border-red-500')
            }else{
                form.elements[i].classList.remove('border-red-500');
            }
        }
        return;
    }
    toggleElements(form.elements,false);
    e.target.children[0].classList.remove('hidden');
    const first_name = document.getElementById('first-name')?.value;
    const last_name = document.getElementById('last-name')?.value;
    const email = document.getElementById('email')?.value;
    const company = document.getElementById('company')?.value;
    const phone_number = document.getElementById('phone')?.value;
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value;
    const modal = document.getElementById('contact-modal');
    const successBtn = document.getElementById('close-success-modal');
    successBtn.onclick = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('invisible');
    }

    grecaptcha.ready(function() {
      grecaptcha.execute('6LeiJrEiAAAAALtR7oqmCB4k59UQlZarrsg0A1RI', {action: 'submit'}).then(function(token) {
          // Add your logic to submit to your backend server here.
          fetch(apiUrl+"/contact",{
            method: 'POST',
            body: JSON.stringify({
                first_name, last_name, response: token,
                email, company, phone_number, subject, message
            })
          }).then(r => r.json()).then(r => {
            console.log('RESPONSE:',r);
            modal.classList.remove('invisible');
            modal.classList.add('opacity-100');
          }).catch(e => {
            console.error(e);
          }).finally(()=>{
            e.target.children[0].classList.add('hidden');
            toggleElements(form.elements,true);
          } )
          
      });
    });
}

mContactBtn.onclick = onClick;
deskMenu.onclick = scrollToClick;
mobileMenu.onclick = scrollToClick;
mGetQuoteBtn.onclick = scrollToClick;

console.log('Variables', { var: __SNOWPACK_ENV__?.SNOWPACK_PUBLIC_API_URL});