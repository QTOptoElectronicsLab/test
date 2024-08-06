(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    //new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        animateOut: 'fadeOutLeft',
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    
})(jQuery);

function fn_getLanguage() {
    const _lang = localStorage.getItem("lang");
    //const userLang = navigator.language || navigator.userLanguage;
    //const lang = _lang || (userLang.startsWith('zh') ? 'zh' : 'en');
    const lang = _lang || 'en';
    return lang;
}

function fn_setLanguage(lang) {
    localStorage.setItem("lang", lang);
    location.reload();
}

function fn_switchLanguage(transMap, lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (transMap[lang] && transMap[lang].hasOwnProperty(key)) {
            element.textContent = transMap[lang][key];
        }
    });
    document.querySelectorAll('.lang-drop').forEach(item => {
        if (item.onclick.toString().includes(`fn_setLanguage('${lang}')`)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function fn_getTheme() {
    const _theme = localStorage.getItem("theme");
    const theme = _theme || "sun";
    return theme;
}

function fn_switchTheme() {
    const _theme = fn_getTheme();
    if(_theme ==="sun"){
        localStorage.setItem("theme", "moon");
    }

    if(_theme ==="moon"){
        localStorage.setItem("theme", "sun");
        _theme==="sun"
    }

    location.reload();
}

function fn_loadTheme() {
    const _theme = fn_getTheme();

    if(_theme==="sun") {
        document.getElementById("i_theme").className = "fa-regular fa-sun";
    }
    
    if(_theme==="moon") {
        const style = document.createElement('style');
        style.textContent = `
          html {
            filter: invert(85%) !important;
            background-color: #eaf0f7 !important;
          }
        
          img {
            filter: invert(100%) !important;
          }

          iframe {
            filter: invert(90%) !important;
          }
        `;
        document.head.appendChild(style);
        document.getElementById("i_theme").className = "fa-solid fa-moon";
    }
}

function fn_loadNavbar(lang) {
    fetch('components/navbar.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('div_Navbar');
        container.innerHTML = data;

        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.text = script.innerHTML;
            }
            document.head.appendChild(newScript).parentNode.removeChild(newScript);
        });

        var currentPath = window.location.pathname;
        
        var tabs = document.querySelectorAll('.nav-item.nav-link[data-key]');

        tabs.forEach(function(tab) {
            var tabPath = new URL(tab.href).pathname;

            if (tabPath === currentPath) {
                tab.classList.add('active');
            }
        });

        fn_loadTheme();
        fn_switchLanguage(transNavbar, lang);
    });
}

function fn_loadFooter(lang) {
    fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('div_footer');
        container.innerHTML = data;

        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.text = script.innerHTML;
            }
            document.head.appendChild(newScript).parentNode.removeChild(newScript);
        });

        fn_switchLanguage(transFooter, lang);
    });
}