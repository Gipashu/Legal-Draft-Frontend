import { Particles } from "./particles";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Background = ({ className }) => {
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center min-h-screen bg-[#030014] overflow-hidden",
        className,
      )}
    >
      <Particles
        className="absolute inset-0 z-0"
        color="#ffffff"
        quantity={100}
        size={0.8}
      />

      {/* Top-left gradient */}
      <div className="absolute -top-16 -left-16 z-10 pointer-events-none w-[40rem] h-[40rem] bg-[radial-gradient(ellipse_at_top_left,_rgba(144,172,255,0.2)_0%,_rgba(3,0,20,0.8)_70%,_transparent_100%)] blur-3xl"></div>

      {/* Top-right  gradient */}
      <div className="absolute -top-16 -right-16 z-10 pointer-events-none w-[40rem] h-[40rem] bg-[radial-gradient(ellipse_at_top_right,_rgba(144,172,255,0.2)_0%,_rgba(3,0,20,0.8)_70%,_transparent_100%)] blur-3xl"></div>
    </div>
  );
};
Background.propTypes = {
  className: PropTypes.string,
};

export default Background;