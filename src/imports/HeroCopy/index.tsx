import svgPaths from "./svg-gigjz62irh";

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[78.03px] left-0 top-0 w-[358.488px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="78.0301" preserveAspectRatio="none" viewBox="0 0 358.488 78.0301" width="358.488">
          <path d={svgPaths.p29153df0} fill="#FCF3ED" id="Rectangle 15" />
        </svg>
      </div>
      <div className="absolute h-[78.03px] left-0 top-0 w-[358.488px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="78.0301" preserveAspectRatio="none" viewBox="0 0 358.488 78.0301" width="358.488">
          <path d={svgPaths.p29153df0} fill="#B0521F" id="Rectangle 16" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] h-[31.58px] leading-[40px] left-0 not-italic text-[#fcf3ed] text-[32px] top-0 w-[222.643px]">Plan Your Event</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[78.03px] left-0 top-0 w-[412.82px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="78.0301" preserveAspectRatio="none" viewBox="0 0 412.82 78.0301" width="412.82">
          <path d={svgPaths.p38415f00} fill="#B0521F" id="Rectangle 15" />
        </svg>
      </div>
      <div className="absolute h-[78.03px] left-0 top-0 w-[412.82px]">
        <div className="absolute inset-[-2.56%_-0.71%]">
          <svg className="block size-full" fill="none" height="82.0301" preserveAspectRatio="none" viewBox="0 0 418.65 82.0301" width="418.65">
            <path d={svgPaths.p93ddb00} id="Rectangle 16" stroke="#FCF3ED" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] h-[31.58px] leading-[40px] left-0 not-italic text-[#fcf3ed] text-[32px] top-0 w-[287.216px]">Find Your Next Race</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Semibold',sans-serif] leading-[40px] left-0 not-italic text-[#fcf3ed] text-[30px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] top-0 w-[901.394px]">Placeholder supporting headline copy — one or two sentences describing both race director and runner-facing value propositions.</p>
      <p className="[word-break:break-word] absolute font-['Cooper_Hewitt:Bold_Italic',sans-serif] leading-[96px] left-0 not-italic text-[#fcf3ed] text-[96px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] top-0 whitespace-nowrap">Run Your Next Race</p>
      <Group1 />
      <Group />
    </div>
  );
}

export default function HeroCopy() {
  return (
    <div className="contents relative size-full" data-name="Hero Copy">
      <Group2 />
    </div>
  );
}