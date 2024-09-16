import LoaderImg from "../../assets/images/output-onlinegiftools (1).gif";

function Loader() {
  return (
    <div className="loader fixed left-0 top-0 flex justify-center items-center w-screen h-screen z-10 ">
      <img src={LoaderImg} alt="" />
    </div>
  );
}
export default Loader;
