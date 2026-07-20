import Image from 'next/image';

const commitments = [
  'Atendimento individualizado e humanizado',
  'Técnica e experiência consolidada na área previdenciária',
  'Foco na resolução do problema do cliente',
];

export function MissionSection() {
  return (
    <section className="reveal-section bg-[#fffdf9] px-5.5 py-20 md:px-[max(6vw,40px)] md:py-30">
      <div className="mx-auto grid max-w-350 gap-12 md:grid-cols-[.78fr_1.22fr] md:gap-[clamp(70px,10vw,160px)]">
        <div className="reveal-item">
          <p className="mb-7 text-[11px] font-semibold tracking-[1.5px] text-[#D1AD7D]">PROPÓSITO</p>
          <h2 className="max-w-120 font-['Playfair_Display'] text-[38px] leading-[1.1] tracking-[-1.5px] text-[#0A2723] md:text-[clamp(42px,4vw,61px)]">
            Cada história merece uma orientação <em className="font-medium text-[#D1AD7D]">cuidadosa.</em>
          </h2>
        </div>

        <div className="reveal-item reveal-delay-2 border-l border-[#D1AD7D80] pl-5.5 md:pl-10">
          <p className="max-w-190 font-['Playfair_Display'] text-[19px] leading-[1.6] text-[#0A2723] md:text-[23px]">
            A minha missão é fazer a diferença na vida das pessoas e de suas famílias. Para isso, faço questão de proporcionar um atendimento individualizado e humanizado, para que cada processo seja instruído com os melhores documentos e o benefício previdenciário seja alcançado.
          </p>

          <div className="my-9 grid divide-y divide-[#D1AD7D66] border-y border-[#D1AD7D66] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {commitments.map((commitment, index) => (
              <div key={commitment} className="py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0">
                <span className="mb-3 block text-[10px] font-semibold tracking-[1px] text-[#D1AD7D]">0{index + 1}</span>
                <strong className="block text-[13px] leading-[1.45] text-[#0A2723]">{commitment}</strong>
              </div>
            ))}
          </div>

          <footer className="flex items-center gap-3.5">
            <Image
              src="/assets/dra_geanne.jpeg"
              alt="Dra. Geanne Lopes"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border-2 border-[#D1AD7D] bg-[#F3F3F3] object-cover object-top"
            />
            <span className="font-['Playfair_Display'] text-[21px] text-[#0A2723]">— Geanne Lopes</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
