
import { useState } from "react";
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
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [availableOnly, setAvailableOnly] = useState(true);

  // Demo data: পরে backend থেকে data আসবে
  const donors = [
    {
      id: 1,
      name: "Rahim Ahmed",
      bloodGroup: "A+",
      district: "Cumilla",
      upazila: "Chouddagram",
      available: true,
    },
    {
      id: 2,
      name: "Karim Hasan",
      bloodGroup: "O+",
      district: "Feni",
      upazila: "Feni Sadar",
      available: true,
    },
    {
      id: 3,
      name: "Sadia Akter",
      bloodGroup: "B+",
      district: "Cumilla",
      upazila: "Cumilla Sadar",
      available: false,
    },
    {
      id: 4,
      name: "Nayeem Islam",
      bloodGroup: "A+",
      district: "Feni",
      upazila: "Daganbhuiyan",
      available: true,
    },
    {
      id: 5,
      name: "Tanvir Hossain",
      bloodGroup: "AB+",
      district: "Cumilla",
      upazila: "Chouddagram",
      available: true,
    },
    {
      id: 6,
      name: "Nusrat Jahan",
      bloodGroup: "O-",
      district: "Feni",
      upazila: "Feni Sadar",
      available: true,
    },
  ];

  const filteredDonors = donors.filter((donor) => {
    return (
      (!bloodGroup || donor.bloodGroup === bloodGroup) &&
      (!district || donor.district === district) &&
      (!upazila || donor.upazila === upazila) &&
      (!availableOnly || donor.available)
    );
  });

  const upazilas = [
    ...new Set(
      donors
        .filter((donor) => !district || donor.district === district)
        .map((donor) => donor.upazila)
    ),
  ];

  const resetFilters = () => {
    setBloodGroup("");
    setDistrict("");
    setUpazila("");
    setAvailableOnly(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-red-600 px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            <BiHeart className="text-lg" />
            Every Drop Matters
          </span>

          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Find Blood Donors
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-red-50 sm:text-base">
            Find blood donors near you. Your search could help save a life.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative px-4">
        <div className="mx-auto -mt-7 max-w-6xl rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:-mt-10 sm:p-8">
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
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
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
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Districts</option>
                {["Cumilla", "Feni"].map((item) => (
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
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Upazilas</option>
                {upazilas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                <BiSearch className="text-xl" />
                Search Donors
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="h-4 w-4 accent-red-600"
              />
              Show available donors only
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-red-600 transition hover:text-red-700"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Donor Results */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Donors
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse matching donor profiles.
            </p>
          </div>

          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            {filteredDonors.length} donors found
          </span>
        </div>

        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDonors.map((donor) => (
              <article
                key={donor.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
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

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BiMap className="shrink-0 text-lg text-red-500" />
                    <span>
                      {donor.upazila}, {donor.district}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        donor.available ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={
                        donor.available ? "text-green-600" : "text-gray-500"
                      }
                    >
                      {donor.available
                        ? "Available to donate"
                        : "Currently unavailable"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!donor.available}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white"
                  onClick={() =>
                    alert("Donor contact feature will be added later.")
                  }
                >
                  <BiPhone className="text-lg" />
                  {donor.available ? "Contact Donor" : "Unavailable"}
                </button>
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
