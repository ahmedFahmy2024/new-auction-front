const VideoHome = () => {
  return (
    <section className="relative w-full h-[500px]">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/awesome.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDBC5D54] to-[#352D2354]"></div>
    </section>
  );
};

export default VideoHome;
