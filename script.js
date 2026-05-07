/* Felipe Montenegro — interações */
(function(){
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  // Year
  const y = $('#year'); if(y) y.textContent = new Date().getFullYear();

  // Navbar scroll
  const nav = $('#navbar');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Mobile nav
  const toggle = $('#navToggle');
  const links = $('#navLinks');
  if(toggle){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  $$('.reveal').forEach(el => io.observe(el));

  // Counter animation
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        animateCount(e.target);
        counterIO.unobserve(e.target);
      }
    });
  }, {threshold:0.4});
  $$('[data-target]').forEach(el => counterIO.observe(el));

  // Form
  const form = $('#contactForm');
  const status = $('#formStatus');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();
      if(!nome || !email || !mensagem){
        status.style.color = '#ff8585';
        status.textContent = 'Por favor, preencha nome, email e mensagem.';
        return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        status.style.color = '#ff8585';
        status.textContent = 'Informe um email válido.';
        return;
      }
      status.style.color = '';
      status.textContent = 'Enviando...';
      setTimeout(() => {
        status.textContent = '✓ Mensagem enviada. Felipe entrará em contato em breve.';
        form.reset();
      }, 900);
    });
  }
})();
