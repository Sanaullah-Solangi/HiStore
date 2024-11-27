import HeroImg from "../../assets/images/sample-3.jpg";
function Hero() {
  return (
    <section className="heroContainer w-screen text-gray-600 body-font">
      <img src={HeroImg} className="h-full object-contain" alt="" />
    </section>
  );
}
export default Hero;
