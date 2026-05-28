"use strict";

//SCROLL HORIZONTAL
//GSAP -> pour pouvoir utiliser le scrollTrigger pour que le start du scroll soit en top top 
import { gsap } from "gsap";  
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//on calcule la longueur du slider pour connaitre la hauteur du scroll (moins la moitié de l'écran)
function getScrollAmount() {
    const sliderContainer = document.querySelector('.sliderContainer');
    const widthSlider = sliderContainer.scrollWidth; 
    const widthEcran = window.innerWidth
    
    return widthSlider - (widthEcran / 2);
}

const tween = gsap.to(".sliderContainer", {
    x:function(){ return -1 * getScrollAmount();},
    ease: "none",
});

ScrollTrigger.create({
    trigger:".scrollContainer",
    start:"top top",
    end: function() { return "+=" + getScrollAmount(); },
    pin:true,
    animation:tween,
    scrub:1,
    markers:true
})


//SECTIONS CONTENT
//comme slide--X = contentContainer--X -> on peut faire une boucle pour pas devoir écrire la fonction pour chaque heure
//puis on récupère avec des doc.querySelector
//on vérifie que ça existe pour pas tout bugger et on écoute le click + on add la classe open
for (let i = 1; i <= 9; i++){
    const slide = document.querySelector('.sliderContainer__slide--' + i);
    const section = document.querySelector('.contentContainer--' + i);
    const body = document.querySelector('body');

    if (slide && section){
        slide.addEventListener('click', function() {
            section.classList.add('open');
            body.classList.add('no-scroll');
            console.log("c'est booon");
        });

        //section et pas document.querySelector pour chercher juste la croix qui est dans la section
        const closeBtn = section.querySelector('.btn--close');

        if (closeBtn){
            closeBtn.addEventListener('click', function() {
                section.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        }
    }
}

//HOUR CHANGE
//code du slider dans codeKit + boucle forEach pour tous les boutons sinon le queryselector prend que les btn de la première section
const allBtnPrev = document.querySelectorAll('.hourChange__btn--prev');
const allBtnNext = document.querySelectorAll('.hourChange__btn--next');
const sectionContainer = document.querySelector('.sectionContainer');

allBtnPrev.forEach(function(btnPrev){
    btnPrev.addEventListener('click', prevSection);
});

allBtnNext.forEach(function(btnNext){
    btnNext.addEventListener('click', nextSection);
});

function prevSection(){
    const elShow = document.querySelector('.open');
    const elPrev = elShow.previousElementSibling;

    elShow.classList.remove('open');

    if(elPrev){
        elPrev.classList.add('open');
    }else{
        const elLast = sectionContainer.lastElementChild;
        elLast.classList.add('open');
    }
}

function nextSection(){
    const elShow = document.querySelector('.open');
    const elNext = elShow.nextElementSibling;

    elShow.classList.remove('open');

    if(elNext){
        elNext.classList.add('open');
    }else{
        const elFirst = sectionContainer.firstElementChild;
        elFirst.classList.add('open');
    }
}

//BOITE à OUTILS ANIMATION
const boiteContainer = document.querySelectorAll('.boiteOutils__container');

boiteContainer.forEach(function(boiteOpen){
    boiteOpen.addEventListener('click', boiteActive);
});

function boiteActive(){
    const boiteClicked = event.currentTarget;
    const boiteContent = boiteClicked.querySelector('.boiteOutils__content');
    const btnNot = document.querySelector('.btn--ferme');

    boiteClicked.classList.add('open2');
}

const btnFerme = document.querySelector('.btn--ferme');

btnFerme.addEventListener('click', function(){
    const boiteActive = document.querySelector('.open2');

    boiteActive.classList.remove('open2');
});


//FOOTER
var currentYear = new Date().getFullYear();
var yearFooter = document.querySelector(".annee");
yearFooter.textContent = currentYear