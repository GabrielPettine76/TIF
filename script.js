const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if(toggle && nav){
  toggle.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Validación simple de formulario de contacto
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const success = document.getElementById('formSuccess');

    let valid = true;
    // Nombre
    if(!name.value.trim()){
      nameError.textContent = 'Ingresá tu nombre';
      valid = false;
    } else { nameError.textContent = ''; }

    // Email muy simple
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email.value)){
      emailError.textContent = 'Email inválido';
      valid = false;
    } else { emailError.textContent = ''; }

    // Mensaje
    if(message.value.trim().length < 5){
      messageError.textContent = 'Escribí un mensaje más detallado';
      valid = false;
    } else { messageError.textContent = ''; }

    if(valid){
      success.hidden = false;
      contactForm.reset();
    }
  });
}

// Chatbot básico (simulado)
const openBtn = document.getElementById('openChatbot');
const openLink = document.getElementById('openChatbotLink');
const modal = document.getElementById('chatbotModal');
const closeBtn = document.getElementById('closeChatbot');
const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

function openModal(){ if(modal){ modal.setAttribute('aria-hidden','false'); chatInput && chatInput.focus(); seedChat(); } }
function closeModal(){ if(modal){ modal.setAttribute('aria-hidden','true'); } }

function seedChat(){
  if(!chatLog) return;
  chatLog.innerHTML = '';
  addMsg('bot','¡Hola! Soy el asistente del sitio. Probá preguntar: "¿Qué recursos hay?" o "¿Cómo empiezo?"');
}
function addMsg(who, text){
  if(!chatLog) return;
  const p = document.createElement('p');
  p.className = `chat-msg ${who}`;
  p.textContent = text;
  chatLog.appendChild(p);
  chatLog.scrollTop = chatLog.scrollHeight;
}

openBtn && openBtn.addEventListener('click', openModal);
openLink && openLink.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); });
closeBtn && closeBtn.addEventListener('click', closeModal);

chatForm && chatForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = chatInput.value.trim();
  if(!q) return;
  addMsg('user', q);

  // Respuestas de ejemplo (simples)
  let a = 'No entendí, ¿podés reformular?';
  const low = q.toLowerCase();
  if(low.includes('recursos')){
    a = 'Tenés: texto IA, podcast, video, animación, chatbot, juegos, actividades, material teórico y tutoriales.';
  } else if(low.includes('empiezo') || low.includes('inicio')){
    a = 'Comenzá por la sección "Recursos" y elegí el material para tu clase. Luego mirá "Nuestra propuesta".';
  } else if(low.includes('contact')){
    a = 'Podés escribirnos desde la sección de Contacto. ¡Te leemos!';
  }
  setTimeout(()=> addMsg('bot', a), 400);
  chatInput.value = '';
});
