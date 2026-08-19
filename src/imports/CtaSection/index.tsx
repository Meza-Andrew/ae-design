import svgPaths from "./svg-j0vwho98us";

function UpcomingRacesCtaButton() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Upcoming Races CTA button">
      <div className="absolute h-[68.318px] left-0 top-0 w-[274.894px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="68.318" preserveAspectRatio="none" viewBox="0 0 274.894 68.318" width="274.894">
          <path d={svgPaths.pf5fa480} fill="#B0521F" id="Rectangle 16" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[#fcf3ed] text-[20px] top-0 whitespace-nowrap">Request Timing Services</p>
    </div>
  );
}

function Group() {
  return (
    <div className="-translate-x-1/2 absolute contents left-0 top-0">
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] h-[24.28px] leading-[20px] left-0 not-italic text-[#fcf3ed] text-[20px] top-0 w-[223.3px]">Request Timing Services</p>
      <UpcomingRacesCtaButton />
    </div>
  );
}

function UpcomingRacesCtaButton1() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Upcoming Races CTA button">
      <div className="absolute h-[68.318px] left-0 top-0 w-[274.894px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="68.318" preserveAspectRatio="none" viewBox="0 0 274.894 68.318" width="274.894">
          <path d={svgPaths.pf5fa480} fill="#B0521F" id="Rectangle 16" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[#fcf3ed] text-[20px] top-0 whitespace-nowrap">Request Timing Services</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="-translate-x-1/2 absolute contents left-0 top-0">
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] h-[24.28px] leading-[20px] left-0 not-italic text-[#fcf3ed] text-[20px] top-0 w-[223.3px]">Request Timing Services</p>
      <UpcomingRacesCtaButton1 />
    </div>
  );
}

function UpcomingRacesCtaButton2() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Upcoming Races CTA button">
      <div className="absolute h-[68.318px] left-0 top-0 w-[274.894px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="68.318" preserveAspectRatio="none" viewBox="0 0 274.894 68.318" width="274.894">
          <path d={svgPaths.pf5fa480} fill="#B0521F" id="Rectangle 16" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[#fcf3ed] text-[20px] top-0 whitespace-nowrap">Find A Race</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="-translate-x-1/2 absolute contents left-0 top-0">
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] h-[24.28px] leading-[20px] left-0 not-italic text-[#fcf3ed] text-[20px] top-0 w-[223.3px]">Request Timing Services</p>
      <UpcomingRacesCtaButton2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="-translate-x-1/2 absolute contents left-0 top-0">
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="-translate-x-1/2 absolute contents left-0 top-0">
      <Group />
      <Group2 />
      <Group3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group5 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Cooper_Hewitt:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#fcf3ed] text-[24px] text-center top-0 w-[686.152px]">Placeholder about copy — one or two sentences about Arsenal Events, its mission, and what differentiates the service for both race directors and runners.</p>
    </div>
  );
}

function CtaContent() {
  return (
    <div className="-translate-x-1/2 absolute contents left-0 top-0" data-name="CTA Content">
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Bold_Italic',sans-serif] leading-[52px] left-0 not-italic text-[#fcf3ed] text-[48px] top-0 whitespace-nowrap">Ready To Work With Us?</p>
      <Group1 />
    </div>
  );
}

export default function CtaSection() {
  return (
    <div className="contents relative size-full" data-name="CTA Section">
      <div className="-translate-x-1/2 absolute bg-[#232943] bottom-0 left-0 rounded-[10px] top-0 w-[998.914px]" data-name="CTA bg" />
      <CtaContent />
    </div>
  );
}