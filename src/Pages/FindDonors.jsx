
import { useEffect, useState } from "react";
import {
  BiSearch,
  BiMap,
  BiDroplet,
  BiPhone,
  BiHeart,
  BiFilterAlt,
  BiUser,
} from "react-icons/bi";

const FindDonors = () => {
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch donors from backend
  useEffect(() => {
    fetch("http://localhost:3000/donors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch donors");
        }
        return res.json();
      })
      .then((data) => setDonors(data))
      .catch((err) => {
        console.error(err);
        setError("Donor data load করা যায়নি।");
      })
      .finally(() => setLoading(false));
  }, []);

  // District options
  const districts = [
    ...new Set(
      donors.map((donor) => donor.district).filter(Boolean)
    ),
  ].sort();

  // Upazila options based on selected district
  const upazilas = [
    ...new Set(
      donors
        .filter(
          (donor) => !district || donor.district === district
        )
        .map((donor) => donor.upazila)
        .filter(Boolean)
    ),
  ].sort();

  // Filter donors
  const filteredDonors = donors.filter(
    (donor) =>
      (!bloodGroup || donor.bloodGroup === bloodGroup) &&
      (!district || donor.district === district) &&
      (!upazila || donor.upazila === upazila)
  );

  // Reset filters
  const resetFilters = () => {
    setBloodGroup("");
    setDistrict("");
    setUpazila("");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            <BiHeart className="text-lg" />
            Every Drop Matters
          </span>

          <h1 className="mt-5 text-3xl font-extrabold text-slate-800 sm:text-4xl lg:text-5xl">
            Find Blood Donors,
            <span className="text-red-600"> Save Lives</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Find blood donors near you. Your search could help save a life.
          </p>
        </div>
      </section>

      {/* Search Filters */}
      <section className="relative px-4">
        <div className="mx-auto -mt-7 max-w-6xl rounded-2xl border border-red-100 bg-white p-5 shadow-lg shadow-red-100/40 sm:-mt-10 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-600">
              <BiFilterAlt />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Search Donors
              </h2>
              <p className="text-sm text-gray-500">
                Choose your required blood group and location.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Blood Group */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Blood Group
              </label>

              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Blood Groups</option>

                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                District
              </label>

              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Districts</option>

                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Upazila
              </label>

              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Upazilas</option>

                {upazilas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Search and Reset */}
            <div className="flex items-end gap-2">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                <BiSearch className="text-xl" />
                Search
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Results */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Blood Donors
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse matching donor profiles.
            </p>
          </div>

          {!loading && !error && (
            <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
              {filteredDonors.length} donors found
            </span>
          )}
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-500">
            Loading donor data...
          </p>
        ) : error ? (
          <p className="rounded-xl bg-red-50 p-5 text-center text-red-600">
            {error}
          </p>
        ) : filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDonors.map((donor) => (
              <article
                key={donor._id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                {/* Donor Information */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
                      <BiUser />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-gray-900">
                        {donor.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Registered Donor
                      </p>
                    </div>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-red-600 text-white">
                    <BiDroplet className="text-lg" />

                    <span className="text-xs font-bold">
                      {donor.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* Donor Location */}
                <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <BiMap className="shrink-0 text-lg text-red-500" />

                  <span>
                    {donor.upazila}, {donor.district}
                  </span>
                </div>

                {/* Donor Phone Number - NEW */}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <BiPhone className="shrink-0 text-lg text-red-500" />

                  {donor.number ? (
                    <a
                      href={`tel:${donor.number} `}
                      className="break-all font-medium text-gray-700 transition hover:text-red-600"
                    >
                      {donor.number}
                    </a>
                  ) : (
                    <span className="text-gray-400">
                      Phone number unavailable
                    </span>
                  )}
                </div>

                {/* Contact Donor Button */}
                <a
                  href={donor.number ? `tel:${donor.number}` : undefined}
                  aria-disabled={!donor.number}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${donor.number
                      ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      : "pointer-events-none border-gray-200 text-gray-400"
                    }`}
                >
                  <BiPhone className="text-lg" />

                  {donor.number ? "Contact Donor" : "Phone Unavailable"}
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <BiSearch className="mx-auto text-5xl text-gray-300" />

            <h3 className="mt-4 text-lg font-bold text-gray-800">
              No donors found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing the blood group or location filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default FindDonors;
