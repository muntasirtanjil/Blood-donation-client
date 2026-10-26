
import { useEffect, useMemo, useState } from "react";
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

  const [appliedFilters, setAppliedFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Reusable field styles
  const selectClass =
    "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-800";

  const buttonClass =
    "flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2";

  // Fetch donors from backend
  useEffect(() => {
    const controller = new AbortController();

    const fetchDonors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://blood-donation-server-silk.vercel.app/donors",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid donor data");
        }

        setDonors(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Donor fetch error:", err);
        setError("Donor data load করা যায়নি। আবার চেষ্টা করো।");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDonors();

    return () => controller.abort();
  }, []);

  // District options from donor data
  const districts = useMemo(
    () =>
      [
        ...new Set(
          donors.map((donor) => donor.district).filter(Boolean)
        ),
      ].sort(),
    [donors]
  );

  // Upazila options based on selected district
  const upazilas = useMemo(
    () =>
      [
        ...new Set(
          donors
            .filter(
              (donor) =>
                !district || donor.district === district
            )
            .map((donor) => donor.upazila)
            .filter(Boolean)
        ),
      ].sort(),
    [donors, district]
  );

  // Apply filters when Search is clicked
  const handleSearch = () => {
    setAppliedFilters({
      bloodGroup,
      district,
      upazila,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setBloodGroup("");
    setDistrict("");
    setUpazila("");

    setAppliedFilters({
      bloodGroup: "",
      district: "",
      upazila: "",
    });
  };

  // Filter donors using applied filters
  const filteredDonors = useMemo(
    () =>
      donors.filter(
        (donor) =>
          (!appliedFilters.bloodGroup ||
            donor.bloodGroup === appliedFilters.bloodGroup) &&
          (!appliedFilters.district ||
            donor.district === appliedFilters.district) &&
          (!appliedFilters.upazila ||
            donor.upazila === appliedFilters.upazila)
      ),
    [donors, appliedFilters]
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            <BiHeart className="text-lg" />
            Every Drop Matters
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Find Blood Donors,
            <span className="text-red-600"> Save Lives</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
            Find blood donors near you. Your search could help save a life.
          </p>
        </div>
      </section>

      {/* Search Filters */}
      <section className="relative px-3 sm:px-4">
        <div className="mx-auto -mt-7 max-w-6xl rounded-2xl border border-red-100 bg-white p-4 shadow-lg shadow-red-100/40 sm:-mt-10 sm:p-8">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-600">
              <BiFilterAlt />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Search Donors
              </h2>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                Choose your required blood group and location.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Blood Group */}
            <div>
              <label className={labelClass}>
                Blood Group
              </label>

              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className={selectClass}
              >
                <option value="">All Blood Groups</option>

                {[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className={labelClass}>
                District
              </label>

              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className={selectClass}
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
              <label className={labelClass}>
                Upazila
              </label>

              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className={selectClass}
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
                onClick={handleSearch}
                className={`${buttonClass} flex-1 bg-red-600 text-white hover:bg-red-700`}
              >
                <BiSearch className="text-xl" />
                Search
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className={`${buttonClass} border border-gray-300 bg-white text-gray-800 hover:bg-gray-100`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Results */}
      <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-12 lg:px-8">

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Blood Donors
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Browse matching donor profiles.
            </p>
          </div>

          {!loading && !error && (
            <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              {filteredDonors.length} donors found
            </span>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <span className="loading loading-spinner loading-lg text-red-600"></span>

            <p className="text-sm font-medium text-gray-700">
              Loading donor data...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
            <p className="text-sm font-medium text-red-800">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filteredDonors.map((donor) => (
              <article
                key={donor._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                {/* Donor Information */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
                      <BiUser />
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words font-bold text-gray-900">
                        {donor.name || "LifeDrop Donor"}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-gray-600">
                        Registered Donor
                      </p>
                    </div>
                  </div>

                  <div className="flex h-12 min-w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-red-600 px-1 text-white">
                    <BiDroplet className="text-lg" />

                    <span className="text-xs font-bold">
                      {donor.bloodGroup || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="mt-5 flex items-start gap-2 border-t border-gray-100 pt-4 text-sm text-gray-700">
                  <BiMap className="mt-0.5 shrink-0 text-lg text-red-600" />

                  <span className="break-words">
                    {[donor.upazila, donor.district]
                      .filter(Boolean)
                      .join(", ") || "Location unavailable"}
                  </span>
                </div>

                {/* Phone Number */}
                <div className="mt-3 flex items-start gap-2 text-sm text-gray-700">
                  <BiPhone className="mt-0.5 shrink-0 text-lg text-red-600" />

                  {donor.number ? (
                    <a
                      href={`tel:${String(donor.number).trim()}`}
                      className="break-all font-medium text-gray-800 transition hover:text-red-700"
                    >
                      {donor.number}
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      Phone number unavailable
                    </span>
                  )}
                </div>

                {/* Contact Button */}
                {donor.number ? (
                  <a
                    href={`tel:${String(donor.number).trim()}`}
                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-red-600 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                  >
                    <BiPhone className="text-lg" />
                    Contact Donor
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-5 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-500"
                  >
                    <BiPhone className="text-lg" />
                    Phone Unavailable
                  </button>
                )}
              </article>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <BiSearch className="mx-auto text-5xl text-gray-400" />

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No donors found
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Try changing the blood group or location filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
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
