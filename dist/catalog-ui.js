(() => {
  const trip=nextTrip();
  document.querySelectorAll('.listing-intro').forEach(intro=>{
    if(!trip)return;
    const days=daysUntil(trip.departure);
    const date=new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(trip.departure+'T00:00:00Z'));
    const remaining=days===0?'Leaves today':days===1?'Leaves tomorrow':`${days} days to go`;
    intro.insertAdjacentHTML('afterend',`<aside class="next-trip"><div class="next-trip-copy"><span class="next-trip-label">NEXT DEPARTURE</span><strong>${trip.name} is calling.</strong><span>${date} · From ${tripPrice(trip.name)} / traveller</span></div><div class="next-trip-action"><span class="next-countdown">${remaining}</span><a class="button" href="${trip.name==='Himachal'?'himachal.html':'trips.html#destinations'}">Explore the trip <span>↗</span></a></div></aside>`);
  });
})();
