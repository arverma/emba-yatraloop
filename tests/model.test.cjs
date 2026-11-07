const {test}=require('node:test');const assert=require('node:assert/strict');require('../dist/data.js');require('../dist/model.js');
const near=(a,b)=>assert.ok(Math.abs(a-b)<0.00001,`${a} != ${b}`);
test('annual and capacity-aware reconcile with presentation',()=>{let a=calculate({view:'annual'}),q=calculate({view:'quarterly'});near(a.bookings,1236.60845);near(q.bookings,1142.52845);near(a.bookings-q.bookings,94.08);near(q.spend/q.bookings,q.cac);q.quarters.forEach((x,i)=>near(x,[303.76969,319.9169575,204.3072675,314.534535][i]));});
test('test uplift applies only to ring-fenced tranche',()=>{for(const view of ['annual','quarterly']){let b=calculate({view}),t=calculate({view,testRate:.12});near(t.bookings-b.bookings,300000/1190*.06);assert.ok(t.bookings-b.bookings<16);}});
test('third Q3 promotion exposes overflow',()=>{let r=calculate({view:'quarterly',q3:3});assert.ok(r.quarters[2]>250);near(r.bookings,1236.60845);});
test('trip value changes ROAS without changing travellers',()=>{let a=calculate({aov:7000}),b=calculate({aov:25000});near(a.bookings,b.bookings);near(b.roas/a.roas,25000/7000);near(b.targetRoas,15);});
