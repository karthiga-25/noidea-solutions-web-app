const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    sections.forEach(sec => {
      const pos = sec.getBoundingClientRect().top;
      if (pos < window.innerHeight - 100) {
        sec.classList.add("show");
      }
    });
  });
  
   //bubble
 
  function createBubble(x, y) {
    const bubble = document.createElement("span");
    bubble.classList.add("bubble");
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";

    const size = Math.random() * 15 + 10; // random bubble size
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    // Random bubble color  
    const colors = ["#88daed", "#90CAF9","#42A5F5", "#1E88E5", "#1565C0", "#0D47A1"];
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 800);
  }

  // For desktop mouse move
  document.addEventListener("mousemove", function(e) {
    createBubble(e.pageX, e.pageY);
  });

  // For mobile touch move
  document.addEventListener("touchmove", function(e) {
    const touch = e.touches[0];
    createBubble(touch.pageX, touch.pageY);
  });


/* Project Titles */
const PT_PROJECTS = [
  /* PHP */
  {category:'PHP', title:'Transport Management System', desc:'A web platform to manage and track transportation services efficiently.'},
  {category:'PHP', title:'Library Management System', desc:'Manage book records, lending, and user details for libraries.'},
  {category:'PHP', title:'Two-Wheeler Rental System', desc:'Online solution for booking and managing two-wheeler rentals.'},
  {category:'PHP', title:'Complaint Management System', desc:'Register, track and resolve customer or student complaints.'},
  {category:'PHP', title:'Vehicle Breakdown Assistance (On Road)', desc:'Request emergency roadside vehicle support quickly.'},
  {category:'PHP', title:'Gym Management System', desc:'Handle memberships, attendance and payments in gyms.'},
  {category:'PHP', title:'School Security System', desc:'Monitor student entry/exit and enhance school security.'},
  {category:'PHP', title:'Student Management System', desc:'Complete solution for student records, grades and administration.'},
  {category:'PHP', title:'Billing System', desc:'Generate, track and manage invoices and payments.'},
  {category:'PHP', title:'Hospital Management System', desc:'Manage patients, doctors, appointments and billing.'},

  /* Web Application */
  {category:'Web App', title:'Fake Review Identification', desc:'Detect and filter fake or spam product reviews.'},
  {category:'Web App', title:'Chatbot System for Students', desc:'AI chatbot designed to answer students’ academic queries.'},
  {category:'Web App', title:'Job Posting - Social Networking', desc:'Post jobs and connect recruiters with job seekers.'},
  {category:'Web App', title:'Real Time Chat Application', desc:'Live chat enabling instant messaging between users.'},
  {category:'Web App', title:'Social Media Dashboard', desc:'Dashboard to track and analyze social media metrics.'},

  /* Python */
  {category:'Python', title:'Countdown Timer', desc:'Simple utility to set and track countdowns.'},
  {category:'Python', title:'QR Code Generator', desc:'Create custom QR codes for text, URLs or data.'},
  {category:'Python', title:'Currency Converter', desc:'Convert values between multiple currencies.'},
  {category:'Python', title:'Speech-to-Text & Text-to-Speech', desc:'Convert voice to text and text to voice.'},
  {category:'Python', title:'Image Format Converter', desc:'Convert images between formats (JPEG, PNG, etc.).'},

  /* Data Analysis & Visualization */
  {category:'Data', title:'Calories Prediction Dataset Analysis', desc:'Predict calories burned with visualization.'},
  {category:'Data', title:'Autism Prediction Dataset Analysis', desc:'Analyze data to identify autism-related patterns.'},
  {category:'Data', title:'Cyber Security Intrusion Dataset Analysis', desc:'Analyze intrusion detection metrics.'},
  {category:'Data', title:'Kidney Disease Dataset Analysis', desc:'Predict and analyze kidney disease risks.'},
  {category:'Data', title:'Iris Flower Dataset Analysis', desc:'Visualization & analysis of the iris dataset.'},

  /* Machine Learning */
  {category:'Machine Learning', title:'Calories Prediction using ML', desc:'ML model to predict calories burned.'},
  {category:'Machine Learning', title:'Autism Prediction using ML', desc:'ML model to predict possibility of autism.'},
  {category:'Machine Learning', title:'Cyber Security Intrusion Detection using ML', desc:'Detect and classify cyber intrusions.'},
  {category:'Machine Learning', title:'Kidney Disease Prediction using ML', desc:'Predict kidney disease from health parameters.'},
  {category:'Machine Learning', title:'Iris Flower Prediction using ML', desc:'Predict iris species from features.'},
  {category:'Machine Learning', title:'Stock Market Price Analysis using ML', desc:'Analyze stock market trends and predictions.'},
  {category:'Machine Learning', title:'Gold Price Prediction', desc:'Forecast gold prices from historical data.'},

  /* Deep Learning */
  {category:'Deep Learning', title:'Fake Currency Detection using PCA & CNN', desc:'Deep learning model to identify counterfeit notes.'},
  {category:'Deep Learning', title:'Dynamic Corner Detection (OpenCV)', desc:'Real-time vision system for detecting object corners.'},
  {category:'Deep Learning', title:'Real-Time Object Detection using YOLO', desc:'Use YOLO for object detection in video streams.'},
  {category:'Deep Learning', title:'Amazon Music Clustering', desc:'Feature extraction techniques for audio classification.'},
  {category:'Deep Learning', title:'Facial Emotion Recognition using CNN', desc:'Recognize human emotions from facial expressions.'},

  /* Others */
  {category:'Others', title:'Power-BI and Tableau Projects', desc:'Data visualization projects in Power BI and Tableau.'},
  {category:'Others', title:'Custom Projects (Easy -> Advanced)', desc:'All types and levels of projects available.'}
];

const ptList = document.getElementById('ptList');
const ptFilters = document.getElementById('ptFilters');
const ptSearch = document.getElementById('ptSearch');
const ptReset = document.getElementById('ptReset');
const ptFavBar = document.getElementById('ptFavBar');
const ptFavList = document.getElementById('ptFavList');
const ptDownload = document.getElementById('ptDownload');

let ptFavs = JSON.parse(localStorage.getItem('ni_pt_favs') || '[]');
let activeCategory = 'All';
let searchTerm = '';

/* build filters */
function ptBuildFilters(){
  const cats = ['All', ...Array.from(new Set(PT_PROJECTS.map(p => p.category)))];
  ptFilters.innerHTML = '';
  cats.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'pt-filter' + (c === 'All' ? ' active' : '');
    btn.innerText = c;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pt-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = c;
      ptRender();
    });
    ptFilters.appendChild(btn);
  });
}

/* render list */
function ptRender(){
  const term = searchTerm.trim().toLowerCase();
  ptList.innerHTML = '';
  const filtered = PT_PROJECTS.filter(p => {
    if(activeCategory !== 'All' && p.category !== activeCategory) return false;
    if(term && !p.title.toLowerCase().includes(term) && !p.desc.toLowerCase().includes(term)) return false;
    return true;
  });

  if(filtered.length === 0){
    ptList.innerHTML = '<div style="padding:18px;color:var(--muted,#A3A3A3)">No matching titles.</div>';
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div'); card.className = 'pt-card';
    card.innerHTML = `
      <div class="pt-title">${p.title}</div>
      <div class="pt-cat">${p.category}</div>
      <div class="pt-desc">${p.desc}</div>
    `;
    // actions
    const actions = document.createElement('div'); actions.className = 'pt-actions';
    const details = document.createElement('button'); details.className = 'pt-btn'; details.innerHTML = '<i class="fa-solid fa-eye"></i> Details';
    details.addEventListener('click', () => ptOpenModal(p));
    const copy = document.createElement('button'); copy.className = 'pt-btn'; copy.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
    copy.addEventListener('click', () => {
      navigator.clipboard?.writeText(p.title).then(()=> {
        copy.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        setTimeout(()=> copy.innerHTML = '<i class="fa-regular fa-copy"></i> Copy',900);
      }).catch(()=> alert('Copy failed'));
    });
    const fav = document.createElement('button'); fav.className = 'pt-btn'; fav.innerHTML = ptFavs.includes(p.title) ? '<i class="fa-solid fa-star"></i> Fav' : '<i class="fa-regular fa-star"></i> Fav';
    fav.addEventListener('click', () => { toggleFav(p.title); fav.innerHTML = ptFavs.includes(p.title) ? '<i class="fa-solid fa-star"></i> Fav' : '<i class="fa-regular fa-star"></i> Fav'; });

    actions.appendChild(details); actions.appendChild(copy); actions.appendChild(fav);
    card.appendChild(actions);
    ptList.appendChild(card);
  });

  ptRefreshFavBar();
}

/* modal */
const ptModal = document.getElementById('ptModal');
const ptModalTitle = document.getElementById('ptModalTitle');
const ptModalCat = document.getElementById('ptModalCat');
const ptModalDesc = document.getElementById('ptModalDesc');
const ptModalClose = document.getElementById('ptModalClose');
const ptCopy = document.getElementById('ptCopy');
const ptFavToggle = document.getElementById('ptFavToggle');
let ptCurrent = null;

function ptOpenModal(p){
  ptCurrent = p;
  ptModalTitle.innerText = p.title;
  ptModalCat.innerText = p.category;
  ptModalDesc.innerText = p.desc;
  ptFavToggle.innerText = ptFavs.includes(p.title) ? 'Remove Favorite' : 'Add to Favorites';
  ptModal.classList.add('open');
  ptModal.setAttribute('aria-hidden','false');
}
function ptCloseModal(){
  ptModal.classList.remove('open');
  ptModal.setAttribute('aria-hidden','true');
  ptCurrent = null;
}
ptModalClose.addEventListener('click', ptCloseModal);
ptModal.addEventListener('click', (e)=> { if(e.target === ptModal) ptCloseModal(); });

ptCopy.addEventListener('click', ()=> {
  if(!ptCurrent) return;
  navigator.clipboard?.writeText(ptCurrent.title).then(()=> {
    ptCopy.innerText = 'Copied';
    setTimeout(()=> ptCopy.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Title',900);
  }).catch(()=> alert('Copy failed'));
});
ptFavToggle.addEventListener('click', ()=> {
  if(!ptCurrent) return;
  toggleFav(ptCurrent.title);
  ptFavToggle.innerText = ptFavs.includes(ptCurrent.title) ? 'Remove Favorite' : 'Add to Favorites';
  ptRender();
});

/* favorites */
function toggleFav(title){
  const idx = ptFavs.indexOf(title);
  if(idx === -1) ptFavs.push(title);
  else ptFavs.splice(idx,1);
  localStorage.setItem('ni_pt_favs', JSON.stringify(ptFavs));
  ptRefreshFavBar();
}

function ptRefreshFavBar(){
  if(ptFavs.length === 0){ ptFavBar.style.display = 'none'; ptFavBar.setAttribute('aria-hidden','true'); return; }
  ptFavBar.style.display = 'flex'; ptFavBar.setAttribute('aria-hidden','false');
  ptFavList.innerHTML = '';
  ptFavs.forEach(t => {
    const pill = document.createElement('div'); pill.className = 'pt-pill';
    const removeBtn = document.createElement('button'); removeBtn.className = 'pt-btn'; removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    removeBtn.addEventListener('click', ()=> { removeFav(t); });
    pill.innerHTML = `<span style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t}</span>`;
    pill.appendChild(removeBtn);
    ptFavList.appendChild(pill);
  });
  const blob = new Blob([ptFavs.join('\n')], {type:'text/plain'});
  ptDownload.href = URL.createObjectURL(blob);
  ptDownload.download = 'noidea_favorites.txt';
}

function removeFav(t){
  const idx = ptFavs.indexOf(t); if(idx !== -1) ptFavs.splice(idx,1);
  localStorage.setItem('ni_pt_favs', JSON.stringify(ptFavs));
  ptRender();
}

/* events */
ptSearch.addEventListener('input', (e)=> { searchTerm = e.target.value; ptRender(); });
ptReset.addEventListener('click', ()=> {
  activeCategory = 'All';
  document.querySelectorAll('.pt-filter').forEach(b=>b.classList.remove('active'));
  const first = document.querySelector('.pt-filter'); if(first) first.classList.add('active');
  ptSearch.value = ''; searchTerm = ''; ptRender();
});

/* init */
ptBuildFilters();
ptRender();

// Performance Tip: Reduce bubble count during heavy movement
let bubbleTimeout;
document.addEventListener("mousemove", function(e) {
  clearTimeout(bubbleTimeout);
  bubbleTimeout = setTimeout(() => {
    createBubble(e.pageX, e.pageY);
  }, 30); // Adjust time (ms) — higher value = fewer bubbles
});

document.addEventListener("touchmove", function(e) {
  clearTimeout(bubbleTimeout);
  const touch = e.touches[0];
  bubbleTimeout = setTimeout(() => {
    createBubble(touch.pageX, touch.pageY);
  }, 30);
});
