/* Illustrative mock data for an academic concept, not Google or customer data. */
(() => {
  const samples = [
    { destination: 'Goa', score: 4.7, count: 582 },
    { destination: 'Himachal', score: 4.8, count: 648 },
    { destination: 'Meghalaya', score: 4.6, count: 473 },
    { destination: 'Rajasthan', score: 4.5, count: 516 },
    { destination: 'North East', score: 4.9, count: 421 }
  ];
  const business = { score: 4.8, count: 642 };
  const starMarkup = score => `<span class="rating-stars" aria-hidden="true" style="--star-fill:${score * 20}%"><span>★★★★★</span></span>`;
  const badge = `<div class="google-rating" aria-label="Illustrative mock Google Business rating ${business.score} out of 5 from ${business.count} sample reviews"><span class="google-g" aria-hidden="true">G</span><div><span class="google-label">GOOGLE BUSINESS · DEMO</span><div><b>${business.score}</b> ${starMarkup(business.score)} <span class="google-count">(${business.count} sample reviews)</span></div></div></div>`;
  document.querySelectorAll('.hero-copy, .listing-intro > div, .detail-cover').forEach(container => container.insertAdjacentHTML('beforeend', badge));
  document.querySelectorAll('#destinations .destination').forEach((card, index) => {
    const sample = samples[index];
    if (!sample) return;
    const heading = card.querySelector('h4');
    heading.insertAdjacentHTML('afterend', `<div class="trip-rating" aria-label="Illustrative mock rating ${sample.score} out of 5, ${sample.count} sample reviews">${starMarkup(sample.score)} <b>${sample.score}</b> <span>(${sample.count})</span> <small>MOCK</small></div>`);
  });
  const mainStories = [
    ['The planning felt easy from the start. I knew what to expect before I packed.', 'Ananya S.', 'First-time solo traveller'],
    ['Naye log, beautiful views, and enough time to enjoy both. Such a memorable trip.', 'Rahul M.', 'Group trip traveller'],
    ['The inclusions were clear, so I could spend less time budgeting and more time exploring.', 'Meera K.', 'Budget-conscious planner']
  ];
  const himachalStories = [
    ['Mountain mornings and a group that made the journey even better. I would do it again.', 'Riya A.', 'Himachal concept traveller'],
    ['I came solo, but never felt like I had to figure everything out alone.', 'Aman K.', 'Himachal concept traveller'],
    ['The itinerary gave us a shared plan and still left room to enjoy the moment.', 'Neha P.', 'Himachal concept traveller']
  ];
  const stories = (items, title) => `<section class="testimonial-section"><div class="testimonial-heading"><div><p class="eyebrow">TRAVELLER STORIES · FICTIONAL EXAMPLES</p><h3>${title}</h3></div><p>Illustrative testimonials written for this academic mockup. These are not real customer reviews.</p></div><div class="testimonial-grid">${items.map(([quote, name, context]) => `<figure class="testimonial-card"><div class="testimonial-stars" aria-label="Illustrative five stars">★★★★★</div><blockquote>“${quote}”</blockquote><figcaption><b>${name}</b><span>${context} · Fictional</span></figcaption></figure>`).join('')}</div></section>`;
  const mainSection = document.querySelector('.campaign-intro');
  if (mainSection) mainSection.insertAdjacentHTML('afterend', stories(mainStories, 'The stories that stay with you.'));
  document.querySelectorAll('.experience-banner').forEach(section => section.insertAdjacentHTML('afterend', stories(himachalStories, 'A little more than a trip.')));
})();
