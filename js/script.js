// নেভিগেশন মেনু টগল
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');

  // Google Analytics ইভেন্ট
  gtag('event', 'click', {
    event_category: 'navigation',
    event_label: 'menu_toggle',
  });
});

// স্ক্রলে নেভিগেশন ব্যাকগ্রাউন্ড চেঞ্জ
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255,255,255,0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'var(--white)';
    navbar.style.backdropFilter = 'none';
  }
});

// স্মুথ স্ক্রলিং
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // মোবাইল মেনু বন্ধ করা
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// স্ট্যাটিস্টিক্স কাউন্টার অ্যানিমেশন
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.about');

function startCounting() {
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let count = 0;
    const increment = target / 50; // ৫০ ধাপে পৌঁছাবে

    const updateCount = () => {
      if (count < target) {
        count += increment;
        stat.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        stat.innerText = target;
      }
    };

    updateCount();
  });
}

// স্ক্রলে কাউন্টার শুরু করা
let countingStarted = false;
window.addEventListener('scroll', () => {
  const sectionPos = statsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos && !countingStarted) {
    startCounting();
    countingStarted = true;

    // Google Analytics ইভেন্ট
    gtag('event', 'view', {
      event_category: 'engagement',
      event_label: 'stats_viewed',
    });
  }
});

// কন্টাক্ট ফর্ম হ্যান্ডলিং
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // ফর্ম ডাটা সংগ্রহ
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
    timestamp: new Date().toISOString(),
  };

  // Google Analytics ইভেন্ট
  gtag('event', 'form_submission', {
    event_category: 'contact',
    event_label: formData.email,
  });

  // কনসোলে লগ (প্রোডাকশনে API কল করবেন)
  console.log('ফর্ম ডাটা:', formData);

  // ইউজারকে জানানো
  alert('ধন্যবাদ! আপনার মেসেজ পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।');

  // ফর্ম রিসেট
  contactForm.reset();
});

// পেজ ভিউ ট্র্যাকিং
gtag('event', 'page_view', {
  event_category: 'engagement',
  event_label: 'landing_page',
  value: 1,
});

// স্ক্রোল ডেপথ ট্র্যাকিং
let maxScroll = 0;
window.addEventListener('scroll', () => {
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;

  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent;

    // ২৫%, ৫০%, ৭৫%, ১০০% স্ক্রোলে ইভেন্ট ট্রিগার
    if (maxScroll > 25 && maxScroll < 26) {
      gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: '25%',
      });
    } else if (maxScroll > 50 && maxScroll < 51) {
      gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: '50%',
      });
    } else if (maxScroll > 75 && maxScroll < 76) {
      gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: '75%',
      });
    } else if (maxScroll > 99) {
      gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: '100%',
      });
    }
  }
});

// টাইমার ট্র্যাকিং - পৃষ্ঠায় কত সময় কাটিয়েছে
const startTime = Date.now();
window.addEventListener('beforeunload', () => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000); // সেকেন্ডে

  gtag('event', 'time_spent', {
    event_category: 'engagement',
    event_label: 'seconds',
    value: timeSpent,
  });
});

// লেজি লোডিং ইমেজ
const images = document.querySelectorAll('img');
const imageOptions = {
  threshold: 0,
  rootMargin: '0px 0px 50px 0px',
};

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      imageObserver.unobserve(img);
    }
  });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));
