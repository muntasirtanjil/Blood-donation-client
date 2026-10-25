
import { BiAddToQueue, BiDroplet,  BiHeart, BiHeartSquare,  } from "react-icons/bi";
import { BsArrowRight, BsArrowRightCircle, BsDroplet } from "react-icons/bs";
import { Link } from "react-router";
import bloodLogo from '../assets/Blood Donation Logo.png'



const Home = () => {
  return (
    <div className="overflow-hidden bg-white text-slate-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-rose-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              <BiHeart size={16} fill="currentColor" />
              Donate Blood, Save Lives
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Your Blood
              <br />
              Can <span className="text-red-600">Save Lives</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Be a hero. Donate blood, help those in need, and
              make a difference in someone's life.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/donors"
                className="btn min-h-12 border-none bg-red-600 px-6 text-white hover:bg-red-700"
              >
                <BiDroplet size={19} />
                Find Donors
              </Link>

              <Link
                to="/auth/register"
                className="btn min-h-12 border-red-200 bg-white px-6 text-red-600 hover:bg-red-50"
              >
                <BiAddToQueue size={19} />
                Become A Donor
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-3">
                {["A", "B", "O", "AB"].map((group, index) => (
                  <div
                    key={group}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${
                      ["bg-red-500", "bg-rose-700", "bg-red-400", "bg-slate-700"][index]
                    }`}
                  >
                    {group}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Every Donor Matters
                </p>
                <p className="text-xs text-slate-500">
                  Together, we can save lives.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-5">
            <div className="absolute h-64 w-64 rounded-full bg-red-100 sm:h-80 sm:w-80" />
            <div className="absolute h-52 w-52 rounded-full border border-red-200 sm:h-64 sm:w-64" />

            <div className="relative flex aspect-square w-full max-w-sm flex-col items-center justify-center rounded-[2.5rem] border border-red-100 bg-white/90 p-8 shadow-xl shadow-red-100/70 sm:rounded-[3rem]">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-200 sm:h-44 sm:w-44">
                <img className="rounded-full" src={bloodLogo} alt="" />
              </div>

              <p className="mt-6 text-center text-xl font-extrabold text-slate-800 sm:text-2xl">
                Give Blood,
                <span className="text-red-600"> Give Hope</span>
              </p>

              <p className="mt-2 text-center text-sm text-slate-500">
                A small act can save a life.
              </p>
            </div>

            <div className="absolute left-0 top-10 rounded-xl bg-white p-3 shadow-lg sm:left-2">
              <BsDroplet className="text-red-600" size={26} />
            </div>

            <div className="absolute bottom-8 right-0 rounded-xl bg-white p-3 shadow-lg sm:right-2">
              <BiHeart className="text-red-600" size={26} />
            </div>
          </div>
        </div>
      </section>

    
      {/* Become a Donor CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 to-red-500 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-red-100">
                <BiHeartSquare size={18} fill="currentColor" />
                Be a Hero
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Become a Blood Donor Today
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-red-50 sm:text-base">
                Your small effort can bring a big smile to someone's
                face. Join our community and help save lives.
              </p>
            </div>

            <Link
             to="/auth/register"
              className="btn min-h-12 shrink-0 border-none bg-white px-6 text-red-600 hover:bg-red-50"
            >
              Become a Donor
              <BsArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="border-t border-red-100 bg-red-50 px-5 py-12 text-center sm:px-8 sm:py-16">
        <BiHeart
          size={38}
          className="mx-auto text-red-600"
          fill="currentColor"
        />

        <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
          Someone Needs Your Blood
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          Your decision to donate could give someone another chance
          at life. Take the first step today.
        </p>

        <Link
         to="/auth/register"
          className="btn mt-6 border-none bg-red-600 px-7 text-white hover:bg-red-700"
        >
          Join as a Donor
          <BsArrowRightCircle size={18} />
        </Link>
      </section>
    </div>
  );
};

export default Home;
