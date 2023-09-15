let toogleMenu = document.querySelector('.toogle_menu');
let menu = document.querySelector('.menu');
let closeMenu = document.querySelector('.menu__close');
let overlay = document.querySelector('.overlay');

toogleMenu.addEventListener('click', function() {
    menu.classList.add('menu_active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', function() {
    menu.classList.remove('menu_active');
    document.body.style.overflow = '';
});

overlay.addEventListener('click', function() {
  menu.classList.remove('menu_active');
  document.body.style.overflow = '';
});

$(document).ready(function () {
  $('.promo__carousel').slick({
    // infinite: false,
    speed: 800,
    arrows: false,
    autoplay: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: $('.promo__slider-dots'),
    customPaging: function (t, e) {
      return "<span>" + ("0" + (e + 1)).slice(-2) + "</span>";
    },
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true
        }
      }

    ]
  });
});

$(document).ready(function () {
  $('.works__carousel').slick({
    // infinite: false,
     lazyLoad: 'ondemand',
    speed: 800,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/works/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/works/right.svg"></button>',
    autoplay: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    appendArrows: $('.works__nav'),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        //   adaptiveHeight: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        //   adaptiveHeight: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        //   adaptiveHeight: true
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        //   adaptiveHeight: true
        }
      }
     
    ]
  });
});

$(document).ready(function() {
  $('.carousel__item a').magnificPopup({type:'image'});
});

$(document).ready(function () {
  $('.partners__carousel').slick({
    // infinite: false,
     lazyLoad: 'ondemand',
    speed: 800,
    arrows: false,
    autoplay: true,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    appendArrows: $('.partners__nav'),
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        //   adaptiveHeight: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        //   adaptiveHeight: true
        }
      }

    ]
  });
});


$(document).ready(function () {
    /*** -=- Form  -=- ***/
    $('#form').submit(function(){
        var errors = false;
    
        $(this).find('input:not([id="submit"])').each(function(){
            if( $.trim( $(this).val() ) == '' ) {
                $(this).css('border-color', '#ff0000');
                errors = true;
            } else if($.trim( $(this).val() ) !== ''){
                $(this).css('border-color', 'green');
            }
        });
    
        if( !errors ){
            var data = $('#form').serialize();
            $.ajax({
                url: '/mail/order.php',
                type: 'POST',
                data: data,
                beforeSend: function(){
                    $('#submit').next().text('Отправляю...');
                },
                success: function(res){
                    if( res == 1 ){
                        $('#form').find('input:not([id="submit"])').val('');
                        window.location = '/thank-you.html';
                    }else{
                        /*alert('Ошибка отправки');*/
    					window.location = '/thank-you.html';
                    }
                },
                error: function(){
                    alert('Ошибка!');
                }
            });
        }
        return false;
    });
});





$(window).scroll(function (){
  if($(this).scrollTop() >500 ) {
    $('#scroll-top').fadeIn('slow');
  } else {
    $('#scroll-top').fadeOut('slow');
  }
})

$("#scroll-top").on('click', function () {
  scrollToTop();
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
/*
let link = document.querySelectorAll('.nav-link')
link.forEach((item, itemindex) =>
  item.addEventListener('click', () => {
    let section = document.querySelectorAll('.section')
    section.forEach((section, sectionindex) => {
      console.log(section.getBoundingClientRect().top)
      if (itemindex === sectionindex) {
        const height =
          section.getBoundingClientRect().top + window.pageYOffset - 78
        window.scrollTo({ top: height, behavior: 'smooth' })
      }
    })
  }));
 */
 
/* Пользуйся наздоровье! */
window.addEventListener('load', function(){
	let menu = document.querySelector('.navbar-nav');
	let mobileMenu = document.querySelector('.menu__list');

	delegate(menu, 'a', 'click', function(e){
		e.preventDefault();
		let target = document.querySelector(this.hash);			
		scrollToElem(target);		
	});
	
	delegate(mobileMenu, 'a', 'click', function(e){	
		e.preventDefault();	
		let target = document.querySelector(this.hash);	
		scrollToElem(target);		
	});

	let hash = window.location.hash;
	let autoTarget = hash.length > 0 ? document.querySelector(hash) : null;

	if(autoTarget !== null){
		scrollToElem(autoTarget);		
	}
});

function delegate(box, selector, eventName, handler){
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e);
		}
	});
}

function scrollToElem(el){	
	let top = el.offsetTop - 120;

	window.scrollTo({
		top,
		behavior: "smooth"
	});
}