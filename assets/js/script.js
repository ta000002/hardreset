// Sample data and UI initialization for Hard Reset demo site
document.getElementById('year').textContent = new Date().getFullYear();

const summaryData = { projects: 28, subscriptions: 142, clients: 37 };
document.querySelectorAll('#summary-cards .k')[0].textContent = summaryData.projects;
document.querySelectorAll('#summary-cards .k')[1].textContent = summaryData.subscriptions;
document.querySelectorAll('#summary-cards .k')[2].textContent = summaryData.clients;

const team = [
  {name: 'Ma Aubrey Ysabelle B. Balmes', role: 'CEO & Co-founder'},
  {name: 'Angela Q. Bulfane', role: 'CTO'},
  {name: 'Leona Jean F. Fernandez', role: 'COO'},
  {name: 'Reme C. Gadugdug', role: 'Head of Development'},
  {name: 'Ganelyn L. Gomez', role: 'Lead Frontend Engineer'},
  {name: 'Rheanna M. Gomez', role: 'Lead Backend Engineer'},
  {name: 'John Kenneth A. Melendez', role: 'DevOps Engineer'},
  {name: 'Gilena Mae R. Pelola', role: 'UX/UI Designer'},
  {name: 'Lynjun M. Recosana', role: 'QA Engineer'},
  {name: 'Lesther C. Serrano', role: 'Project Manager'},
  {name: 'Charlene Nicole C. Ybañez', role: 'Business Analyst & Growth Lead'}
];

const teamGrid = document.getElementById('team-grid');
team.forEach(m => {
  const el = document.createElement('div');
  el.className = 'member';
  el.innerHTML = `<div class="avatar">${getInitials(m.name)}</div><div class="m-info"><div class="name">${shortName(m.name)}</div><div class="role">${m.role}</div></div>`;
  teamGrid.appendChild(el);
});

function getInitials(name){
  return name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();
}
function shortName(full){
  const parts = full.split(' ');
  if(parts.length>2) return parts[0] + ' ' + parts[parts.length-1];
  return full;
}

// Tab navigation: highlight active tab and show only the target section
const sections = ['hero','about','services','subscriptions','performance','team','contact','login'];
function showSection(id){
  sections.forEach(s=>{
    const el = document.getElementById(s);
    if(el){
      if(id==='about'){
        // keep hero visible when about is selected
        if(s==='hero' || s==='about') el.style.display = 'block';
        else el.style.display = 'none';
      } else {
        el.style.display = (s===id ? 'block' : 'none');
      }
    }
  });
}
document.querySelectorAll('.nav-tabs .tab').forEach(el=>{
  el.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelectorAll('.nav-tabs .tab').forEach(t=>t.classList.remove('active'));
    el.classList.add('active');
    const targetId = el.dataset.target;
    showSection(targetId);
  });
});
// initially show only about section
showSection('about');

// Auth mode UI helper for login/register single view
const loginTab = document.querySelector('.nav-tabs .tab[data-target="login"]');
const authSection = document.getElementById('login');
const authNote = document.getElementById('auth-note');
const authSwitch = document.getElementById('auth-switch');
const authBoxes = document.querySelectorAll('.auth-box');

function setAuthMode(mode){
  authBoxes.forEach(box => {
    if(box.dataset.auth === mode){
      box.style.display = '';
      box.classList.add('auth-active');
    } else {
      box.style.display = 'none';
      box.classList.remove('auth-active');
    }
  });

  if(mode === 'login'){
    authNote.textContent = "Don't have an account?";
    authSwitch.textContent = "Register here";
    authSwitch.dataset.mode = 'register';
  } else {
    authNote.textContent = "Already have an account?";
    authSwitch.textContent = "Login now";
    authSwitch.dataset.mode = 'login';
  }
}

if(authSwitch){
  authSwitch.addEventListener('click', e=>{
    e.preventDefault();
    const nextMode = authSwitch.dataset.mode || 'register';
    setAuthMode(nextMode);
  });
}

if(loginTab){
  loginTab.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelectorAll('.nav-tabs .tab').forEach(t=>t.classList.remove('active'));
    loginTab.classList.add('active');
    showSection('login');
    setAuthMode('login');
    authSection.scrollIntoView({ behavior: 'smooth' });
  });
}

// initialize auth section default state
setAuthMode('login');

// Avail buttons: prefill contact section message
document.querySelectorAll('.btn.avail').forEach(b=>{
  b.addEventListener('click', ()=>{
    const plan = b.dataset.plan || 'Inquiry';
    // simple UX: update contact section with selected plan message
    const contact = document.querySelector('#contact .contact');
    // if contact area doesn't exist, just scroll to #contact
    const contactEl = document.getElementById('contact');
    if(contactEl){
      const msg = document.getElementById('selected-plan-msg');
      if(!msg){
        const p = document.createElement('p');
        p.id = 'selected-plan-msg';
        p.style.marginTop = '8px';
        p.style.color = 'var(--muted)';
        p.textContent = 'You selected: ' + plan + '. Please provide your contact details below so we can reach out.';
        contactEl.appendChild(p);
      } else {
        msg.textContent = 'You selected: ' + plan + '. Please provide your contact details below so we can reach out.';
      }
    }
  });
});

// make hero CTA point to login tab
const heroCta = document.querySelector('.hero .btn[href="#login"]');
if(heroCta){
  heroCta.addEventListener('click', e=>{
    e.preventDefault();
    const loginTab = document.querySelector('.nav-tabs .tab[data-target="login"]');
    if(loginTab) loginTab.click();
  });
}

// service card interaction and carousel behavior
const serviceDetails = {
  Development: {
    overview: 'We build bespoke applications across web, mobile, and desktop.',
    roadmap: [
      {step:1, title:'Requirements Gathering', desc:'Understand your vision and business goals'},
      {step:2, title:'Design & Prototyping', desc:'Validate the UX and visual direction'},
      {step:3, title:'Iterative Development', desc:'Build in sprints with regular feedback'},
      {step:4, title:'Testing & Deployment', desc:'Launch with confidence and support'}
    ],
    terms: `<div class="terms-section"><h5 class="terms-title">💼 Engagement Terms</h5><ul><li>Standard NDA and contract included</li><li>30-day payment milestones</li><li>15% upfront deposit required</li></ul></div><div class="terms-section"><h5 class="terms-title">⏱️ Timeline & Support</h5><ul><li>Typical project: 4–12 weeks</li><li>Dedicated project manager assigned</li><li>30-day post-launch support included</li></ul></div><div class="terms-section"><h5 class="terms-title">📋 What's Included</h5><ul><li>Unlimited revisions during development</li><li>Source code ownership transfer</li><li>Technical documentation provided</li></ul></div>`
  },
  Automation: {
    overview: 'Automate repetitive workflows to save time and reduce errors.',
    roadmap: [
      {step:1, title:'Identify Manual Tasks', desc:'Audit your current processes'},
      {step:2, title:'Develop Automation Scripts', desc:'Build custom automation solutions'},
      {step:3, title:'Integrate with Systems', desc:'Connect to your existing tools'},
      {step:4, title:'Monitor & Refine', desc:'Optimize performance over time'}
    ],
    terms: `<div class="terms-section"><h5 class="terms-title">💰 Pricing Model</h5><ul><li>Per-project fee or hourly rate</li><li>Quote provided after discovery phase</li><li>Optional: Maintenance contracts (20% off hourly rate)</li></ul></div><div class="terms-section"><h5 class="terms-title">📊 ROI Guarantee</h5><ul><li>ROI typically achieved within 3–6 months</li><li>Full support during migration phase</li><li>Performance monitoring for first 90 days</li></ul></div><div class="terms-section"><h5 class="terms-title">🔧 Maintenance</h5><ul><li>Scripts tested and validated</li><li>Training provided to your team</li><li>24-hour support on critical issues</li></ul></div>`
  },
  Maintenance: {
    overview: 'Ongoing support, updates, and troubleshooting for existing systems.',
    roadmap: [
      {step:1, title:'System Assessment', desc:'Audit your current system health'},
      {step:2, title:'Plan Updates', desc:'Define upgrade and patch roadmap'},
      {step:3, title:'Apply Patches & Upgrades', desc:'Keep systems secure and current'},
      {step:4, title:'24/7 Ongoing Support', desc:'We have your back anytime'}
    ],
    terms: `<div class="terms-section"><h5 class="terms-title">📺 Support Levels</h5><ul><li><strong>Retainer-based:</strong> Monthly flat fee</li><li>Priority response: 2-hour SLA</li><li>Minimum 3-month commitment</li></ul></div><div class="terms-section"><h5 class="terms-title">🛡️ Coverage</h5><ul><li>Security patches applied immediately</li><li>Regular backups and disaster recovery</li><li>Performance optimization included</li></ul></div><div class="terms-section"><h5 class="terms-title">📞 Availability</h5><ul><li>24/7 monitoring and emergency support</li><li>Quarterly business reviews included</li><li>Unlimited support incidents</li></ul></div>`
  },
  Security: {
    overview: 'Comprehensive security audits and hardening services.',
    roadmap: [
      {step:1, title:'Vulnerability Scanning', desc:'Automated and manual assessments'},
      {step:2, title:'Penetration Testing', desc:'Real-world attack simulations'},
      {step:3, title:'Patch Recommendations', desc:'Prioritized by risk severity'},
      {step:4, title:'Follow-up Review', desc:'Validate all improvements and fixes'}
    ],
    terms: `<div class="terms-section"><h5 class="terms-title">🔐 Assessment Scope</h5><ul><li>OWASP Top 10 coverage</li><li>Custom vulnerability scanning</li><li>Full penetration testing included</li></ul></div><div class="terms-section"><h5 class="terms-title">📄 Deliverables</h5><ul><li>Detailed audit report with findings</li><li>Risk prioritization matrix</li><li>Remediation roadmap provided</li></ul></div><div class="terms-section"><h5 class="terms-title">🔄 Optional Follow-ups</h5><ul><li>Quarterly security reviews available</li><li>Patch validation and compliance monitoring</li><li>Annual reassessment recommended</li></ul></div>`
  },
  Cloud: {
    overview: 'Design and manage cloud infrastructure with DevOps practices.',
    roadmap: [
      {step:1, title:'Architecture Planning', desc:'Right-size infrastructure for your needs'},
      {step:2, title:'Environment Setup', desc:'AWS, Azure, GCP or multi-cloud'},
      {step:3, title:'CI/CD Pipelines', desc:'Automate builds and deployments'},
      {step:4, title:'Monitoring & Scaling', desc:'Optimize costs and performance'}
    ],
    terms: `<div class="terms-section"><h5 class="terms-title">☁️ Platform Support</h5><ul><li>AWS, Azure, GCP, and hybrid clouds</li><li>Kubernetes and container orchestration</li><li>Serverless architecture available</li></ul></div><div class="terms-section"><h5 class="terms-title">💵 Cost Structure</h5><ul><li>Hourly engineering rates + infrastructure pass-through</li><li>Long-term engagements: 15% discount available</li><li>Reserved instance optimization included</li></ul></div><div class="terms-section"><h5 class="terms-title">📈 Operations</h5><ul><li>24/7 monitoring and alerting</li><li>Auto-scaling policies configured</li><li>Cost optimization reviews quarterly</li></ul></div>`
  },
  Consulting: {
    overview: 'Strategic advice and analytics to drive digital transformation.',
    roadmap: [
      {step:1, title:'Discovery Workshops', desc:'Align stakeholders on goals'},
      {step:2, title:'Create Roadmap', desc:'Strategic planning and prioritization'},
      {step:3, title:'Implementation Support', desc:'Hands-on guidance and execution'},
      {step:4, title:'Team Training', desc:'Empower your team for success'}
    ],
    terms: `<div class="terms-section"><h5 class="terms-title">📋 Engagement Model</h5><ul><li>Day-rate or project-based pricing</li><li>Deliverables-based milestones</li><li>Flexible: 1 week to 12+ months</li></ul></div><div class="terms-section"><h5 class="terms-title">🎯 What You Get</h5><ul><li>Strategic roadmap document</li><li>Implementation playbook</li><li>Team training and transition plan</li></ul></div><div class="terms-section"><h5 class="terms-title">🤝 Partnership Approach</h5><ul><li>Bi-weekly sync meetings included</li><li>Executive summary reports provided</li><li>Post-engagement follow-up support</li></ul></div>`
  }
};

function generateRoadmapHTML(steps){
  let html = '<div class="roadmap-timeline">';
  steps.forEach((item, idx)=>{
    html += `<div class="timeline-item">
      <div class="timeline-number">${item.step}</div>
      <div class="timeline-content">
        <h5>${item.title}</h5>
        <p>${item.desc}</p>
      </div>
    </div>`;
    if(idx < steps.length-1) html += '<div class="timeline-connector"></div>';
  });
  html += '</div>';
  return html;
}

let carouselState = { service: null, step: 0 };

function openCarousel(name){
  carouselState.service = name;
  carouselState.step = 0;
  const modal = document.getElementById('carousel-modal');
  const title = document.getElementById('carousel-title');
  title.textContent = name;
  // load step content
  showCarouselStep(0);
  modal.style.display = 'flex';
}

function showCarouselStep(step){
  carouselState.step = step;
  const service = carouselState.service;
  const steps = document.querySelectorAll('.carousel-step');
  steps.forEach(s=>s.classList.remove('active'));
  steps[step].classList.add('active');
  document.getElementById('step-num').textContent = step + 1;
  
  // populate step content
  if(step===0){
    const roadmapHTML = generateRoadmapHTML(serviceDetails[service].roadmap);
    document.getElementById('step-roadmap').innerHTML = roadmapHTML;
  } else if(step===1){
    document.getElementById('step-terms').innerHTML = serviceDetails[service].terms;
  } else if(step===2){
    document.getElementById('service-name-field').value = service;
  }
  
  // update button states
  document.getElementById('carousel-prev').disabled = step===0;
  document.getElementById('carousel-next').disabled = step===2;
}

// attach click to service card buttons
document.querySelectorAll('.service-card .btn.start').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const service = btn.closest('.service-card').dataset.service;
    openCarousel(service);
  });
});

// carousel navigation
document.getElementById('carousel-next').addEventListener('click', ()=>{
  if(carouselState.step < 2) showCarouselStep(carouselState.step + 1);
});

document.getElementById('carousel-prev').addEventListener('click', ()=>{
  if(carouselState.step > 0) showCarouselStep(carouselState.step - 1);
});

document.getElementById('carousel-close').addEventListener('click', ()=>{
  document.getElementById('carousel-modal').style.display = 'none';
});

// form submission
document.getElementById('step-form').addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Request submitted! We will contact you shortly.');
  document.getElementById('carousel-modal').style.display = 'none';
  document.getElementById('step-form').reset();
});

// Avail buttons: prefill contact section message
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const growthCtx = document.getElementById('growthChart').getContext('2d');
const subsCtx = document.getElementById('subsChart').getContext('2d');

new Chart(revenueCtx, {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{label:'Revenue (USD)',data:[1200,1800,2500,3200,4100,5600,6000,7200,8100,9400,10400,11800],borderColor:'#00d1b2',backgroundColor:'rgba(0,209,178,0.06)',tension:0.3}]
  },
  options:{responsive:true,plugins:{legend:{display:false}}}
});

new Chart(growthCtx, {
  type: 'bar',
  data: {labels:['Q1','Q2','Q3','Q4'],datasets:[{label:'New Users',data:[120,300,520,820],backgroundColor:['#00d1b2','#3fe7c3','#6ff0d3','#9ff7e8']}]},
  options:{responsive:true,plugins:{legend:{display:false}}}
});

new Chart(subsCtx, {
  type: 'doughnut',
  data: {labels:['Starter','Professional','Enterprise'],datasets:[{data:[52,70,20],backgroundColor:['#7af2d9','#00d1b2','#008a6b']}]},
  options:{responsive:true,plugins:{legend:{position:'bottom'}}}
});
