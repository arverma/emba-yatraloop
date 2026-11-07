/* Offline demonstration: this interface does not transmit messages or connect to an agent. */
(() => {
  const root = document.createElement('div');
  root.className = 'support-widget';
  root.innerHTML = `<section class="support-panel" id="support-panel" aria-labelledby="support-title" hidden><div class="support-header"><div><span class="support-kicker">YATRALOOP SUPPORT</span><h2 id="support-title">Let’s talk travel.</h2></div><button type="button" class="support-close" aria-label="Close chat">×</button></div><div class="support-messages" role="log" aria-live="polite" aria-relevant="additions"><div class="support-message support-reply">Hi! Ask us about the Himachal trip, your captain or the daily photos.</div><p class="support-note">Preview chat: no live captain or support agent is connected.</p></div><div class="support-suggestions" aria-label="Suggested questions"><button type="button" data-question="captain">Meet the captain</button><button type="button" data-question="photos">Daily photos</button><button type="button" data-question="trip">Trip details</button></div><form class="support-form"><label class="sr-only" for="support-input">Your message</label><input id="support-input" type="text" maxlength="500" placeholder="Write a message…" autocomplete="off"><button type="submit" aria-label="Send message">Send ↗</button></form></section><button type="button" class="support-launcher" aria-expanded="false" aria-controls="support-panel"><span aria-hidden="true">◌</span> Chat with us</button>`;
  document.body.appendChild(root);
  const panel = root.querySelector('.support-panel'), launcher = root.querySelector('.support-launcher'), input = root.querySelector('#support-input'), messages = root.querySelector('.support-messages');
  const replies = {captain:'Your trip captain is available 24×7 during the trip and doubles as your personal photographer. This is an offline preview; no captain is connected.',photos:'Your captain shares the day’s trip photos by the end of each day.',trip:'The Himachal itinerary is 5 days and 4 nights, starting from ₹12,999 per traveller. Dates, availability and final costs are illustrative.'};
  function add(text, type) { const node=document.createElement('div'); node.className=`support-message support-${type}`; node.textContent=text; messages.appendChild(node); node.scrollIntoView({block:'nearest'}); }
  function open(topic) { panel.hidden=false; launcher.setAttribute('aria-expanded','true'); if(topic==='captain') add(replies.captain,'reply'); input.focus({preventScroll:true}); }
  function close() { panel.hidden=true; launcher.setAttribute('aria-expanded','false'); launcher.focus({preventScroll:true}); }
  launcher.addEventListener('click',()=>panel.hidden?open():close());
  root.querySelector('.support-close').addEventListener('click',close);
  root.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{ add(button.textContent,'user'); add(replies[button.dataset.question],'reply'); }));
  root.querySelector('.support-form').addEventListener('submit',event=>{event.preventDefault();const value=input.value.trim();if(!value)return;add(value,'user');input.value='';add('Thanks for your message. This is a preview, so it has not been sent to a live support team. Try the suggested questions above.','reply');});
  const captainButtons=document.querySelectorAll('[data-talk-captain]');
  if(captainButtons.length){
    const captainDialog=document.createElement('dialog');
    captainDialog.className='captain-instagram';
    captainDialog.setAttribute('aria-labelledby','captain-instagram-title');
    captainDialog.innerHTML=`<button class="captain-instagram-close" type="button" aria-label="Close">×</button><span class="instagram-mark" aria-hidden="true">◎</span><p class="captain-instagram-kicker">MEET YOUR CAPTAIN</p><h2 id="captain-instagram-title">Get to know the vibe.</h2><p>Say hi on Instagram, ask about the trip and get to know your captain before you go.</p><p class="captain-instagram-note">The captain’s Instagram profile isn’t connected yet.</p><button class="captain-instagram-unavailable" type="button" disabled>Instagram chat coming soon</button>`;
    document.body.appendChild(captainDialog);
    captainButtons.forEach(button=>button.addEventListener('click',()=>captainDialog.showModal()));
    captainDialog.querySelector('.captain-instagram-close').addEventListener('click',()=>captainDialog.close());
  }
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)close();});
})();
