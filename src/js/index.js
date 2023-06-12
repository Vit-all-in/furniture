/*=============== SHOW MENU ===============*/
import Swiper from 'swiper';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import ScrollReveal from 'scrollreveal';


document.addEventListener('lazyloaded', function (e) {
   e.target.parentNode.classList.add('is-loaded');
});
class Navigation {
   constructor() {
      this.navMenu = document.querySelector('.nav__menu');
      this.navToggle = document.querySelector('.nav__toggle');
      this.navClose = document.querySelector('.nav__close');
      this.navLink = document.querySelectorAll('.nav__link');

      if (this.navToggle) {
         this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.add('show-menu');
         });
      }

      if (this.navClose) {
         this.navClose.addEventListener('click', () => {
            this.navMenu.classList.remove('show-menu');
         });
      }

      this.navLink.forEach(n => n.addEventListener('click', () => {
         this.navMenu.classList.remove('show-menu');
      }));
   }
}

const navigation = new Navigation();

class ScrollHeader {
   constructor() {
      this.header = document.getElementById('header');
      window.addEventListener('scroll', this.scrollHeader);
   }

   scrollHeader() {
      this.scrollY >= 50 ? this.header.classList.add('bg-header') : this.header.classList.remove('bg-header');
   }
}

const scrollHeader = new ScrollHeader();

const popularSwiper = new Swiper('.popular__content', {
   slidesPerView: "auto",
   centeredSlides: true,
   loop: true,

   breakpoints: {
      768: {
         slidesPerView: 3,
         centeredSlides: true,
      },

      1028: {
         slidesPerView: 4,
         centeredSlides: true,
      },
   },

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

});

document.querySelector('.swiper-button-prev').addEventListener('click', function () {
      popularSwiper.slidePrev(); 
});

document.querySelector('.swiper-button-next').addEventListener('click', function () {
   popularSwiper.slideNext(); 
});

class FAQ {
   constructor() {
      this.faqItems = document.querySelectorAll('.choose__faq-item');
      this.initialize();
   }

   initialize() {
      this.faqItems.forEach(item => {
         const faqHeader = item.querySelector('.choose__faq-header');

         faqHeader.addEventListener('click', () => {
            const openItem = document.querySelector('.faq-open');
            this.toggleItem(item);
            if (openItem && openItem !== item) {
               this.toggleItem(openItem);
            }
         });
      });
   }

   toggleItem(item) {
      const faqContent = item.querySelector('.choose__faq-content');

      if (item.classList.contains('faq-open')) {
         faqContent.removeAttribute('style');
         item.classList.remove('faq-open');
      } else {
         faqContent.style.height = faqContent.scrollHeight + 'px';
         item.classList.add('faq-open');
      }
   }
}

const faq = new FAQ();

class ScrollUp {
   constructor() {
      this.scrollUp = document.getElementById('scroll-up');
      window.addEventListener('scroll', this.handleScroll.bind(this));
   }

   handleScroll() {
      window.scrollY >= 500 ? this.scrollUp.classList.add('show-scroll') : this.scrollUp.classList.remove('show-scroll');
   }
}

const scrollUp = new ScrollUp();

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
   const scrollY = window.pageYOffset;
   sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute('id');
      const sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         sectionClass.classList.add('active-link');
      } else {
         sectionClass.classList.remove('active-link');
      }
   })
}

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
   origin: 'top',
   distance: '30px',
   duration: 2000,
   delay: 400,
});

sr.reveal('.home__content, .popular__container, .products__container, .footer, .join__bg');
sr.reveal('.home__title', {
   origin: 'bottom'
});
sr.reveal('.chosse__image, .features__image', {
   origin: 'left'
});
sr.reveal('.choose__content, .features__content', {
   origin: 'right'
});