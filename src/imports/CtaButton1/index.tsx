import svgPaths from "./svg-jpelezlo1o";

export default function CtaButton() {
  return (
    <div className="contents relative size-full" data-name="CTA Button 1">
      <div className="absolute h-[76.512px] left-0 top-0 w-[351.693px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="76.5117" preserveAspectRatio="none" viewBox="0 0 351.693 76.5117" width="351.693">
          <path d={svgPaths.p2be4a380} fill="#B0521F" id="Rectangle 16" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] h-[31.58px] leading-[40px] left-0 not-italic text-[#fcf3ed] text-[32px] top-0 w-[222.643px]">Plan Your Event</p>
    </div>
  );
}