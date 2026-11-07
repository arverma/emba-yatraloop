globalThis.calculate=function({view='quarterly',q3=2,testRate=PLAN.metaTestTranche.baseRate,aov=PLAN.roas.defaultTripValue}={}){const d=PLAN,c=d.channelInputs,s=c.search,m=c.meta,y=c.youtube,r=c.crm;
const search=s.searches*s.impressionShare*s.ctr*s.lp*s.lead*s.booking;
const impressions=m.spend/m.cpm*1000,clicks=impressions*m.ctr,lp=clicks*m.lp,leads=lp*m.lead;
const uplift=d.metaTestTranche.spend/d.metaTestTranche.cpl*(testRate-d.metaTestTranche.baseRate);
const meta=leads*m.booking+uplift,youtube=y.spend/y.cpm*1000*y.click*y.lead*y.booking;
const perPromo=r.waitlist*r.delivery*r.click*r.booking,paid=search+meta+youtube;
const quarters=d.seasonality.map((share,i)=>paid*share+perPromo*(i===2?(view==='annual'?3:q3):3));
const crm=perPromo*(view==='annual'?r.annualPromotions:9+q3),bookings=paid+crm;
return {view,bookings,cac:d.budget/bookings,spend:d.budget,roas:bookings*aov/d.budget,targetRoas:d.target*aov/d.budget,gap:d.target-bookings,quarters,uplift,metaFunnel:[impressions,clicks,lp,leads,meta],channels:[{name:'Search',spend:s.spend,bookings:search},{name:'Meta media',spend:m.spend,bookings:meta},{name:'YouTube',spend:y.spend,bookings:youtube},{name:'Creators',spend:c.creators.spend,bookings:null},{name:'CRM',spend:null,bookings:crm}]};};
