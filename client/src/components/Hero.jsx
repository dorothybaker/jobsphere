function Hero({ search, setSearch }) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl sm:py-14 py-7 lg:flex lg:items-center">
        <div className="mx-auto max-w-2xl w-full text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl sm:text-4xl">
            Job Sphere
            <strong className="font-extrabold text-primary block">
              Empowering your career journey.
            </strong>
          </h1>

          <p className="mt-4 sm:text-lg/relaxed text-sm">
            Where Ambition Meets Opportunity! Discover a world of exciting
            career paths and tailored job matches to empower your professional
            journey.
          </p>

          <div className="flex mt-6 h-12 w-full items-center max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search jobs by title"
              className="w-full flex-1 h-full bg-gray-100 px-4 text-base rounded-s-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-white h-full bg-primary px-4 rounded-e-lg">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
