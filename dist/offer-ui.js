(() => {
  const money = value => '₹' + value.toLocaleString('en-IN');
  const formatDate = date => new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'));
  const offerHTML = trip => {
    const offer=tripOffer(trip.name);
    if(!offer)return '';
    const earlyLastDate = new Date(offer.closing+'T00:00:00Z'); earlyLastDate.setUTCDate(earlyLastDate.getUTCDate()-14);
    const earlyEnds = earlyLastDate.toISOString().slice(0,10);
    const when=offer.code==='EARLYBIRD'?`Offer ends ${formatDate(earlyEnds)} · Booking closes ${formatDate(offer.closing)}`:(offer.remaining===0?'Booking closes today':`Book by ${formatDate(offer.closing)}`);
    return `<div class="trip-offer"><span class="offer-type">${offer.label} · ${offer.percent}% off</span><strong>${money(discountTotal(trip.price,offer.percent))} <small>/ traveller</small></strong><span>Use code <b>${offer.code}</b> · ${when}</span><span class="offer-terms">${offer.code==='EARLYBIRD'?'Available while closing is at least 14 days away.':'Available within 7 days of closing.'} One code per traveller; cannot be combined.</span></div>`;
  };
  document.querySelectorAll('#destinations .destination').forEach(card=>{const name=card.querySelector('h4')?.textContent;const trip=TRIP_CATALOG.find(item=>item.name===name);const facts=card.querySelector('.trip-facts');if(trip&&facts)facts.insertAdjacentHTML('afterend',offerHTML(trip));});
  const himachal=TRIP_CATALOG.find(t=>t.name==='Himachal');
  const departure=daysUntil(himachal.departure)>=0 ? `Next departure: ${formatDate(himachal.departure)} · ${himachal.days} days / ${himachal.nights} nights` : 'Next departure: dates to be announced';
  document.querySelectorAll('#group-fit, #cancellation').forEach(section=>{const info=document.createElement('p');info.className='departure-proof';info.textContent=departure;section.querySelector('h4').insertAdjacentElement('afterend',info);});
  document.querySelectorAll('.price-summary').forEach(summary=>summary.insertAdjacentHTML('afterend',`<div class="detail-offer">${offerHTML(himachal)}</div>`));
  const dialog=document.getElementById('review');
  if(!dialog)return;
  const section=document.createElement('div');section.className='coupon-preview';section.innerHTML='<label for="coupon-code">Discount code</label><div class="coupon-row"><input id="coupon-code" type="text" autocomplete="off" placeholder="Enter code"><button type="button" id="apply-coupon">Apply</button></div><p id="coupon-message" role="status"></p><p class="coupon-total">Total per traveller <strong id="coupon-total">₹12,999</strong></p>';
  dialog.querySelector('h2').insertAdjacentElement('afterend',section);
  const input=section.querySelector('#coupon-code'), message=section.querySelector('#coupon-message'), total=section.querySelector('#coupon-total');
  function reset(){input.value='';message.textContent='';total.textContent=money(himachal.price);}
  document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',reset));
  section.querySelector('#apply-coupon').addEventListener('click',()=>{const offer=tripOffer('Himachal');const code=input.value.trim().toUpperCase();if(!offer||code!==offer.code){total.textContent=money(himachal.price);message.textContent='This code is not available for the current booking window.';return;}const final=discountTotal(himachal.price,offer.percent);total.textContent=money(final);message.textContent=`${offer.code} applied: ${offer.percent}% off (you save ${money(himachal.price-final)}). One code per traveller.`;});
})();
