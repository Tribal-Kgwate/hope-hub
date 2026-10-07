'use strict';
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
const interest=document.querySelector('#interest');
document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{interest.value=a.dataset.interest;}));
const amount=document.querySelector('#amount');
const amountButtons=[...document.querySelectorAll('[data-amount]')];
function updateAmounts(){amountButtons.forEach(button=>{const selected=Number(button.dataset.amount)===Number(amount.value);button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});}
amountButtons.forEach(button=>button.addEventListener('click',()=>{amount.value=button.dataset.amount;updateAmounts();}));
amount.addEventListener('input',updateAmounts);
document.querySelector('#fund-button').addEventListener('click',()=>{if(!amount.value||!amount.checkValidity()){amount.reportValidity();return;}interest.value='Fund a Hub';const message=document.querySelector('#message');const contribution=`I’m interested in contributing R${Number(amount.value).toLocaleString('en-ZA')} towards Hope Hub. Please share the available funding options and next steps.`;message.value=message.value.trim()?message.value+'\n\n'+contribution:contribution;document.querySelector('#contact').scrollIntoView({behavior:document.documentElement.classList.contains('motion-paused')||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('#name').focus({preventScroll:true});});
let dispensing=false;
document.querySelector('.dispense-button').addEventListener('click',()=>{if(dispensing)return;dispensing=true;const unit=document.querySelector('.dispenser');unit.classList.add('dispensed');document.querySelector('#demo-status').textContent='A LITTLE SUPPORT. THEN ON WITH YOUR DAY. · ILLUSTRATION';setTimeout(()=>{unit.classList.remove('dispensed');dispensing=false;document.querySelector('#demo-status').textContent='CONCEPT ILLUSTRATION · TAP THE BUTTON TO TRY';},2400);});
const motionButton=document.querySelector('#motion-toggle');
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateMotion(){document.documentElement.classList.toggle('motion-paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'Animations paused':'Pause animations';}
updateMotion();motionButton.addEventListener('click',()=>{paused=!paused;updateMotion();if(!paused)motionButton.textContent='Pause animations';});
const form=document.querySelector('#contact-form');let enquiry='';
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.elements.name.value.trim();const email=form.elements.email.value.trim();const organisation=form.elements.organisation.value.trim();enquiry=`Hello Hope Hub,\n\n${form.elements.message.value.trim()}\n\nName: ${name}\nEmail: ${email}${organisation?'\nOrganisation: '+organisation:''}\nEnquiry: ${interest.value}`;const link=`mailto:info@hopehub.co.za?subject=${encodeURIComponent('Hope Hub enquiry: '+interest.value)}&body=${encodeURIComponent(enquiry)}`;document.querySelector('#form-status').textContent='Your draft is ready. Review and send it in your email app. If no app opened, copy your enquiry and email info@hopehub.co.za.';document.querySelector('#copy-enquiry').hidden=false;window.location.href=link;});
document.querySelector('#copy-enquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(enquiry);document.querySelector('#form-status').textContent='Enquiry copied. Paste it into an email to info@hopehub.co.za.';}catch{document.querySelector('#form-status').textContent='Copy is unavailable in this browser. You can select and copy your message from the form.';}});
document.querySelector('#year').textContent=new Date().getFullYear();
