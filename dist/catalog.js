/* Prices and departure dates are illustrative for the travel concept. */
globalThis.TRIP_CATALOG=[{name:'Goa',price:8999},{name:'Himachal',price:12999,departure:'2026-11-21'},{name:'Meghalaya',price:18999},{name:'Rajasthan',price:9999},{name:'North East',price:22999}];
globalThis.daysUntil=function(date,now=new Date()){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(x=>[x.type,x.value]));const today=Date.UTC(+p.year,+p.month-1,+p.day);const [y,m,d]=date.split('-').map(Number);return Math.round((Date.UTC(y,m-1,d)-today)/86400000);};
globalThis.tripPrice=function(name){return '₹'+TRIP_CATALOG.find(t=>t.name===name).price.toLocaleString('en-IN');};
