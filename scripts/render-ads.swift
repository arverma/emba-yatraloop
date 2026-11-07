import AppKit

// Offline, deterministic 1080px editorial ad exports. No remote assets.
let navy = NSColor(srgbRed: 20/255, green: 43/255, blue: 59/255, alpha: 1)
let cream = NSColor(srgbRed: 245/255, green: 241/255, blue: 231/255, alpha: 1)
let gold = NSColor(srgbRed: 196/255, green: 134/255, blue: 48/255, alpha: 1)
let muted = NSColor(srgbRed: 85/255, green: 103/255, blue: 110/255, alpha: 1)
let pale = NSColor(srgbRed: 232/255, green: 226/255, blue: 213/255, alpha: 1)

func rect(_ x: CGFloat,_ y: CGFloat,_ w: CGFloat,_ h: CGFloat,_ c: NSColor,_ r: CGFloat = 0) {
    c.setFill(); NSBezierPath(roundedRect: NSRect(x:x,y:y,width:w,height:h),xRadius:r,yRadius:r).fill()
}
func line(_ x:CGFloat,_ y:CGFloat,_ x2:CGFloat,_ y2:CGFloat,_ c:NSColor = pale,_ width:CGFloat = 1) {
    let p = NSBezierPath(); p.move(to:NSPoint(x:x,y:y)); p.line(to:NSPoint(x:x2,y:y2)); p.lineWidth=width; c.setStroke(); p.stroke()
}
@discardableResult func text(_ s:String,_ x:CGFloat,_ y:CGFloat,_ w:CGFloat,_ size:CGFloat,_ c:NSColor = navy,_ serif:Bool = false,_ bold:Bool = false) -> CGFloat {
    let name = serif ? (bold ? "Georgia-Bold" : "Georgia") : (bold ? "Arial-BoldMT" : "ArialMT")
    let f = NSFont(name:name,size:size) ?? NSFont.systemFont(ofSize:size)
    let p = NSMutableParagraphStyle(); p.lineSpacing=5; p.lineBreakMode = .byWordWrapping
    let a:[NSAttributedString.Key:Any] = [.font:f,.foregroundColor:c,.paragraphStyle:p]
    let st = NSAttributedString(string:s,attributes:a)
    let h = st.boundingRect(with:NSSize(width:w,height:2000),options:[.usesLineFragmentOrigin,.usesFontLeading]).height
    st.draw(with:NSRect(x:x,y:y,width:w,height:h+4),options:[.usesLineFragmentOrigin,.usesFontLeading])
    return h
}
func pill(_ s:String,_ x:CGFloat,_ y:CGFloat,_ w:CGFloat,_ color:NSColor = navy) {
    rect(x,y,w,46,color,23); text(s,x+20,y+10,w-40,22,cream,false,true)
}
func step(_ n:String,_ title:String,_ copy:String,_ y:CGFloat) {
    rect(88,y,48,48,gold,24); text(n,104,y+9,30,25,navy,false,true)
    text(title,158,y-2,760,29,cream,false,true); text(copy,158,y+37,750,25,cream)
}
func header(_ letter:String,_ audience:String) {
    rect(0,0,1080,1080,cream)
    rect(52,38,56,56,navy,28); text("YL",61,52,42,24,cream,false,true)
    text("YatraLoop",124,35,400,31,navy,false,true)
    text("Sponsored",124,74,400,21,muted)
    text("CREATIVE "+letter,820,51,212,20,muted,false,true)
    line(52,116,1028,116)
    text(audience.uppercased(),56,141,968,23,gold,false,true)
}
func footer(_ cta:String,_ dest:String) {
    rect(56,946,968,66,gold,9)
    text(cta,78,964,890,28,navy,false,true)
    text("↗",964,961,40,31,navy)
    text(dest,56,1032,968,21,muted)
}
func export(_ file:String,_ render:()->Void) {
    let rep = NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:1080,pixelsHigh:1080,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
    let ctx = NSGraphicsContext(bitmapImageRep:rep)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current=ctx
    ctx.cgContext.translateBy(x:0,y:1080); ctx.cgContext.scaleBy(x:1,y:-1)
    NSGraphicsContext.current=NSGraphicsContext(cgContext:ctx.cgContext,flipped:true)
    render(); NSGraphicsContext.restoreGraphicsState()
    let url=URL(fileURLWithPath:"dist/ads/"+file+".png")
    try! rep.representation(using:.png,properties:[:])!.write(to:url)
    print(url.path)
}

export("ad-a-safety") {
    header("A","First solo trip? Start with the safety process.")
    text("Go solo.\nDon’t go unsure.",56,190,968,67,navy,true)
    text("Join a hosted group trip with a named trip lead and a clear support process — not a stranger meetup with no plan.",56,374,968,32)
    rect(56,518,968,388,navy,14)
    text("THE ROLE. THE PLAN. THE SUPPORT.",88,545,904,23,gold,false,true)
    step("1","Know who leads the trip","Proposed proof: named lead + responsibilities",595)
    step("2","Know how to get help","Proposed proof: contact + escalation process",697)
    step("3","Read it before paying","Review the process on the trip detail page",799)
    footer("See the trip lead and process","Destination: Himachal example → Trip lead / safety")
}
export("ad-b-group") {
    header("B","Solo joiner / still deciding? Check the group fit.")
    text("A destination is\nonly half the trip.",56,190,968,64,navy,true)
    text("See who this trip is for, how the group is hosted, and what a day together actually looks like — before you pay.",56,374,968,32)
    rect(56,518,968,388,navy,14)
    text("IS THIS YOUR KIND OF GROUP?",88,548,904,32,cream,true)
    let rows:[(String,String)]=[("WHO IT’S FOR","Solo joiners open to a hosted group"),("A DAY TOGETHER","Shared itinerary + time to connect"),("SET EXPECTATIONS","Hosted days; not fully customised luxury")]
    for (i,row) in rows.enumerated() {
        let y:CGFloat=616+CGFloat(i)*89
        text(row.0,88,y,270,21,gold,false,true)
        text(row.1,366,y-3,600,26,cream)
        if i<2 {line(88,y+65,992,y+65,muted)}
    }
    footer("See group expectations","Destination: Himachal example → Group fit")
}
export("ad-c-costs") {
    header("C","For the planner who checks the total first.")
    text("Less guesswork.\nMore trip.",56,190,968,67,navy,true)
    text("Domestic group trips in the ₹7,000–₹25,000 range. Compare what is included and what you pay extra — then see the total before you book.",56,374,968,31)
    rect(56,532,968,374,navy,14)
    text("₹7,000–₹25,000",88,552,904,49,cream,true)
    text("CASE PRICE BAND · NOT A PACKAGE QUOTE",88,617,904,21,gold,false,true)
    line(88,661,992,661,muted)
    text("INCLUSIONS · SAMPLE",88,683,420,23,gold,false,true)
    text("EXTRAS · SAMPLE",565,683,427,23,gold,false,true)
    text("+ Listed stays\n+ Itinerary transfers\n+ Stated meals + captain",88,726,440,27,cream)
    text("+ Travel to start point*\n+ Personal spend\n+ Optional activities",565,726,425,27,cream)
    text("* Unless listed. Confirm final payable amount before booking.",88,867,904,20,cream)
    footer("Compare inclusions","Destination: Package listing → Detail inclusions")
}
export("ad-d-cancellation") {
    header("D","Still deciding? Understand refunds before booking.")
    text("Before you commit,\nknow your options.",56,190,968,62,navy,true)
    text("Read the refund rules in plain language on the package page. We are not promising free cancellation.",56,374,968,32)
    rect(56,504,968,402,navy,14)
    pill("SAMPLE",88,530,150,gold)
    text("Not approved YatraLoop policy",263,542,700,24,cream)
    let rules:[(String,String)]=[("BEFORE SUPPLIER CUTOFF","Refund less disclosed non-refundable costs"),("AFTER THE CUTOFF","Booking is non-refundable"),("IF THE OPERATOR CANCELS","Full refund")]
    for (i,r) in rules.enumerated() {
        let y:CGFloat=610+CGFloat(i)*94
        text(r.0,88,y,904,22,gold,false,true)
        text(r.1,88,y+32,904,29,cream)
        if i<2 {line(88,y+78,992,y+78,muted)}
    }
    footer("Read the sample policy","Destination: Himachal example → Cancellation (SAMPLE)")
}
