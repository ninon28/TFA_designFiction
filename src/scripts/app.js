"use strict";

const accueil = document.querySelector('.accueil');

//SCROLL HORIZONTAL
//GSAP -> pour pouvoir utiliser le scrollTrigger pour que le start du scroll soit en top top 
import { gsap } from "gsap";  
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

if(accueil){
    const curseur = gsap.matchMedia();

    curseur.add("(hover: hover)", function(){
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
            markers:false
        });
    });


    //SECTIONS CONTENT
    //comme slide--X = contentContainer--X -> on peut faire une boucle pour pas devoir écrire la fonction pour chaque heure
    //puis on récupère avec des doc.querySelector
    //on vérifie que ça existe pour pas tout bugger et on écoute le click + on add la classe open
    for (let i = 1; i <= 13; i++){
        const slide = document.querySelector('.sliderContainer__slide--' + i);
        const section = document.querySelector('.contentContainer--' + i);
        const body = document.querySelector('body');

        if (slide && section){
            slide.addEventListener('click', function() {
                section.scrollTop = 0;

                section.classList.add('open');
                body.classList.add('no-scroll');
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
            elPrev.scrollTop = 0;
            elPrev.classList.add('open');
        }else{
            const elLast = sectionContainer.lastElementChild;
            elLast.scrollTop = 0;
            elLast.classList.add('open');
        }
    }

    function nextSection(){
        const elShow = document.querySelector('.open');
        const elNext = elShow.nextElementSibling;

        elShow.classList.remove('open');

        if(elNext){
            elNext.scrollTop = 0;
            elNext.classList.add('open');
        }else{
            const elFirst = sectionContainer.firstElementChild;
            elFirst.scrollTop = 0;
            elFirst.classList.add('open');
        }
    }

    //BOITE à OUTILS ANIMATION
    const boiteContainers = document.querySelectorAll('.boiteOutils__container');

    boiteContainers.forEach(function(boiteContainer){
        boiteContainer.addEventListener('click', boiteActive);
    });

    function boiteActive(event){
        const boiteClicked = event.currentTarget;

        if(window.innerWidth < 1248){
            const boiteOpen = document.querySelector('.boiteOutils__container.open2');

            if( boiteClicked === boiteOpen){
                boiteOpen.scrollTop = 0;
                boiteOpen.classList.remove('open2');
            }else{
                if(boiteOpen){
                    boiteOpen.scrollTop = 0;
                    boiteOpen.classList.remove('open2');
                }
                boiteClicked.scrollTop = 0;
                boiteClicked.classList.add('open2');

                setTimeout(function() {
                    boiteClicked.scrollIntoView({ behavior: 'smooth', block: 'start'});
                }, 350);
            }
        }else{    
            boiteClicked.scrollTop = 0;
            boiteClicked.classList.add('open2');
        }
    }

    //on ferme en recliquant sur les flèches
    const btnFerme = document.querySelector('.btn--ferme');

    btnFerme.addEventListener('click', function(){
        const boiteActive = document.querySelector('.open2');

        boiteActive.scrollTop = 0;
        boiteActive.classList.remove('open2');
    });

    //quand on clique sur les cartes elles se retournent comme en hover
    const cartes = document.querySelectorAll('.objet__carte');

    cartes.forEach(function(carte) {
        carte.addEventListener('click', function() {
            carte.classList.toggle('--flipped');
        });
    });
}

//CASE STUDY
const caseStudy = document.querySelector('.caseStudy');

if(caseStudy){
    //on place l'endroit de l'intersection
    const observerOptions = {
        root: document.querySelector('.menu'),
        rootMargin: '-45% 0% -45% 0%',
        threshold: 0
    };

    function affichageDates(entries){
        //pour chaque entrée on regarde si elle intersecte
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                const dates = document.querySelectorAll('.menu__el');

                dates.forEach(function(date){
                    //on enlève la classe active à tous
                    date.classList.remove('menu__el--active');
                });

                //on ajoute la classe active à celui qui vient d'intersecter
                entry.target.classList.add('menu__el--active');

                const lien = entry.target.querySelector('a');
                const lienId = lien.getAttribute('href');
                const caseStudyContents = document.querySelectorAll('.caseStudy__content');
                //on prend le 2e caractères dans le href car dans l'id pas de #
                const link = lienId.substring(1)

                caseStudyContents.forEach(function(caseStudyContent){
                    caseStudyContent.classList.remove('caseStudy__content--actif');
                });

                const caseStudyActif = document.getElementById(link);
                if(caseStudyActif){
                    caseStudyActif.classList.add('caseStudy__content--actif');
                } 
            }
        });
    }

    const observer = new IntersectionObserver(affichageDates, observerOptions);
    const dates = document.querySelectorAll('.menu__el');
    dates.forEach(function(date){
        observer.observe(date);
    });
}


//FOOTER
var currentYear = new Date().getFullYear();
var yearFooter = document.querySelector(".annee");
if (yearFooter) {
    yearFooter.textContent = currentYear;
}