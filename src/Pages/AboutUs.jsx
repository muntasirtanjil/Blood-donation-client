
import { Link } from "react-router";
import {
  BiDroplet,
  BiHeart,
  BiShield,
  BiGroup,
  BiRightArrowAlt,
} from "react-icons/bi";

const About = () => {
  const features = [
    {
      icon: <BiGroup />,
      title: "Find Blood Donors",
      description:
        "Find suitable blood donors by blood group and location when someone needs help.",
    },
    {
      icon: <BiHeart />,
      title: "Become a Donor",
      description:
        "Register as a donor and help people in need through your voluntary contribution.",
    },
    {
      icon: <BiShield />,
      title: "A Caring Community",
      description:
        "Connect donors and people seeking blood through a simple and accessible platform.",
    },
  ];

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-red-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
              <BiDroplet className="text-xl" />
              About LifeDrop
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Every Drop Can
              <span className="block text-red-600">
                Make a Difference
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              We aim to connect blood donors with people in need and make
              finding blood easier, faster, and more accessible.
            </p>

            <Link
              to="/find-donors"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Find Blood Donors
              <BiRightArrowAlt className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Our Mission
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Connecting Hearts,
            <span className="text-red-600"> Saving Lives</span>
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            In emergencies, finding the right blood donor can be difficult.
            Roktiva aims to make this process easier by bringing donors and
            people seeking blood together on one platform.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Our goal is to encourage voluntary blood donation, build a helpful
            community, and make it easier for people to connect when every
            moment matters.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-3 rounded-3xl bg-red-100" />

          <div className="relative flex min-h-72 flex-col items-center justify-center rounded-2xl bg-red-600 p-8 text-center text-white sm:min-h-80">
            <BiHeart className="text-7xl sm:text-8xl" />

            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
              Give Blood, Give Hope
            </h3>

            <p className="mt-3 max-w-sm leading-7 text-red-50">
              A small act of kindness can bring hope to someone and their
              family.
            </p>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="bg-gray-50 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-widest text-red-600">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Making Blood Donation Easier
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We provide simple ways for donors and people in need to connect.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-3xl text-red-600">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-red-600 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Be Someone's Hope Today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-red-50">
            Join our community, register as a blood donor, and help make a
            difference when someone needs you.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-red-600 transition hover:bg-red-50"
          >
            Become a Donor
            <BiRightArrowAlt className="text-xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
