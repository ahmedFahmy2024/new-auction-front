import group from "@/assets/Group.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundImage: `url(${group.src})` }}
      className="bg-[#101011] h-[170px] bg-contain bg-right bg-no-repeat"
    >
      <div className="container mx-auto pt-10 px-4 md:px-0">
        <h2 className="flex items-center justify-end text-white font-bold text-xl">
          جميع الحقوق محفوظة {currentYear} ©
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
