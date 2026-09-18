/* Replace the values below to make this invitation yours. */
const CONFIG = {
  partnerName: "Aditya",
  partnerNickname: "my Awwditya",
  yourName: "YOUR_NAME",
  date: "YOUR_DATE",
  time: "YOUR_TIME",
  location: "YOUR_LOCATION",
  dressCode: "YOUR_DRESS_CODE"
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];
const partnerName = CONFIG.partnerName === 'HER_NAME' ? 'you' : CONFIG.partnerName;
const yourName = CONFIG.yourName === 'YOUR_NAME' ? 'me' : CONFIG.yourName;
qsa('[data-partner]').forEach((element) => element.textContent = partnerName);
qsa('[data-your]').forEach((element) => element.textContent = yourName);
qsa('[data-nickname]').forEach((element) => element.textContent = CONFIG.partnerNickname);

const opening = qs('#opening');
const question = qs('#question');
const answer = qs('#answer');
const maybe = qs('#maybe');
const particleField = qs('#particleField');
let currentPhoto = 0;
const photos = qsa('.photo-card');
const loveMusic = qs('#loveMusic');

function createParticles() {
  const particleCount = prefersReducedMotion ? 8 : (window.innerWidth < 700 ? 14 : 24);
  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement('i');
    particle.textContent = index % 3 === 0 ? '♥' : '✦';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * -11}s`;
    particle.style.animationDuration = `${8 + Math.random() * 9}s`;
    particleField.appendChild(particle);
  }
}

function typewrite(element, text, speed = 35) {
  if (prefersReducedMotion) { element.textContent = text; return; }
  let index = 0;
  const write = () => { element.textContent = text.slice(0, index); index += 1; if (index <= text.length) window.setTimeout(write, speed); };
  write();
}

function startExperience() {
  opening.classList.add('opened');
  qs('#intro').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  window.setTimeout(() => typewrite(qs('#typewriterText'), 'There is someone who makes ordinary days feel a little more special.', 29), prefersReducedMotion ? 0 : 700);
}

function celebrate() {
  question.style.display = 'none';
  maybe.classList.remove('visible');
  answer.classList.add('visible');
  answer.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    qs('#confetti').appendChild(piece);
  }
  window.setTimeout(() => qs('#confetti').replaceChildren(), 4500);
}

function showMaybe() {
  question.style.display = 'none';
  answer.classList.remove('visible');
  maybe.classList.add('visible');
  maybe.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

function openPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const card = photos[currentPhoto];
  const lightboxImage = qs('#lightboxImage');
  lightboxImage.style.backgroundImage = `url("${card.dataset.image}"), linear-gradient(145deg, #ecc4c4, #be8290)`;
  qs('#lightboxCaption').textContent = card.querySelector('.photo-caption').textContent;
  qs('#lightbox').hidden = false;
  qs('#closeLightbox').focus();
}

function loadPhotos() {
  photos.forEach((photo) => {
    photo.style.backgroundImage = `url("${photo.dataset.image}"), linear-gradient(145deg, #ecc4c4, #be8290)`;
    photo.style.backgroundSize = 'cover';
    photo.style.backgroundPosition = 'center';
  });
}

function toggleMusic() {
  const button = qs('#musicToggle');
  if (loveMusic.paused) {
    loveMusic.play().catch(() => {
      qs('.music-label').textContent = 'tap to play';
    });
    button.setAttribute('aria-pressed', 'true');
    qs('.music-label').textContent = 'sound on';
    return;
  }
  loveMusic.pause();
  button.setAttribute('aria-pressed', 'false');
  qs('.music-label').textContent = 'sound off';
}

createParticles();
loadPhotos();
qs('#openHeart').addEventListener('click', startExperience);
qs('#musicToggle').addEventListener('click', toggleMusic);
qsa('.adore-card').forEach((card) => card.addEventListener('click', () => card.classList.toggle('active')));
photos.forEach((photo) => photo.addEventListener('click', () => openPhoto(Number(photo.dataset.index))));
qs('#closeLightbox').addEventListener('click', () => qs('#lightbox').hidden = true);
qs('#prevPhoto').addEventListener('click', () => openPhoto(currentPhoto - 1));
qs('#nextPhoto').addEventListener('click', () => openPhoto(currentPhoto + 1));
qs('#lightbox').addEventListener('click', (event) => { if (event.target === qs('#lightbox')) qs('#lightbox').hidden = true; });
qs('#revealQuestion').addEventListener('click', () => question.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
qs('#yesButton').addEventListener('click', celebrate);
qs('#maybeButton').addEventListener('click', showMaybe);
qs('#thinkButton').addEventListener('click', () => { maybe.classList.remove('visible'); question.style.display = 'grid'; question.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); });
qs('#dateField').value = CONFIG.date !== 'YOUR_DATE' ? CONFIG.date : '';
qs('#timeField').value = CONFIG.time !== 'YOUR_TIME' ? CONFIG.time : '';
qs('#locationField').value = CONFIG.location !== 'YOUR_LOCATION' ? CONFIG.location : '';
qs('#dressField').value = CONFIG.dressCode !== 'YOUR_DRESS_CODE' ? CONFIG.dressCode : '';
qs('#dateForm').addEventListener('submit', (event) => { event.preventDefault(); qs('#savedMessage').textContent = 'Can\'t wait to see you. ♥'; });

const surpriseModal = qs('#surpriseModal');
qs('#surpriseButton').addEventListener('click', () => { surpriseModal.hidden = false; qs('#closeSurprise').focus(); });
qs('#closeSurprise').addEventListener('click', () => surpriseModal.hidden = true);
qs('#surpriseQuestion').addEventListener('click', () => { surpriseModal.hidden = true; question.style.display = 'grid'; question.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); });
qs('#replayButton').addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { surpriseModal.hidden = true; qs('#lightbox').hidden = true; } if (!qs('#lightbox').hidden && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) openPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1)); });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .16 });
qsa('.reveal').forEach((element) => observer.observe(element));
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - window.innerHeight; qs('#progressBar').style.width = `${max ? (window.scrollY / max) * 100 : 0}%`; if (window.scrollY > window.innerHeight * 2.2) qs('#surpriseButton').classList.add('show'); });
