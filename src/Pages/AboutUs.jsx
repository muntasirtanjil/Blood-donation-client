
import { FaDroplet, FaMagnifyingGlass, FaHospital, FaClipboardCheck } from "react-icons/fa6";


const guidelines = [
  {
    icon: <FaHospital />,
    title: "১. চিকিৎসকের পরামর্শ নিন",
    description:
      "রোগীর রক্তের গ্রুপ, প্রয়োজনীয় রক্তের পরিমাণ ও সময় চিকিৎসকের কাছ থেকে নিশ্চিত করুন।",
  },
  {
    icon: <FaMagnifyingGlass />,
    title: "২. রক্তদাতার সঙ্গে যোগাযোগ",
    description:
      "LifeDrop থেকে রক্তদাতা খুঁজুন এবং তাঁর সম্মতি ও সুবিধাজনক সময় নিশ্চিত করুন।",
  },
  {
    icon: <FaClipboardCheck />,
    title: "৩. রক্তদাতার সঙ্গে ভালো ব্যবহার করুন",
    description:
      "দাতার সঙ্গে সম্মানজনক ও আন্তরিক আচরণ করুন। অপ্রয়োজনে বারবার ফোন বা মেসেজ দিয়ে বিরক্ত করবেন না।",
  },
  {
    icon: <FaDroplet />,
    title: "৪. রক্তদানের আগে ও পরে খোঁজ নিন",
    description:
      "রক্তদানের আগে দাতার সুবিধা সম্পর্কে জেনে নিন এবং রক্তদানের পরে তাঁর শারীরিক অবস্থার খোঁজ নিন।",
  },
  {
    icon: <FaDroplet />,
    title: "৫. নাশতা ও ডাবের পানি দিন",
    description:
      "সম্ভব হলে রক্তদানের পর দাতাকে নাশতা ও ডাবের পানি বা নিরাপদ পানীয় দিয়ে আপ্যায়ন করুন।",
  },
  {
    icon: <FaClipboardCheck />,
    title: "৬. যাতায়াত খরচের বিষয়ে সহযোগিতা করুন",
    description:
      "দাতার যাতায়াতে খরচ হলে আগে থেকেই আলোচনা করে প্রয়োজনীয় ভাড়া বা যাতায়াতের ব্যবস্থা করতে পারেন।",
  },
  {
    icon: <FaHospital />,
    title: "৭. নিরাপদে রক্ত সংগ্রহ করুন",
    description:
      "হাসপাতাল বা অনুমোদিত ব্লাড ব্যাংকে প্রয়োজনীয় পরীক্ষা ও ক্রসম্যাচের মাধ্যমে রক্ত গ্রহণ করুন।",
  },
];


const About = () => {
  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            LifeDrop Patient Guide
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            রোগীর পরিবারের জন্য নির্দেশিকা
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            রোগীর জন্য জরুরি রক্তের প্রয়োজন হলে সঠিকভাবে রক্তদাতা খুঁজতে
            এবং নিরাপদে রক্ত সংগ্রহ করতে নিচের নির্দেশনাগুলো অনুসরণ করুন।
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {guidelines.map((item, index) => (
            <article
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600">
                {item.icon}
              </div>

              <h2 className="text-lg font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 sm:p-6">
          <h2 className="font-bold text-red-700">
            গুরুত্বপূর্ণ সতর্কতা
          </h2>
          <p className="mt-2 text-sm leading-7 text-gray-700">
            শুধু রক্তের গ্রুপ মিলে গেলেই রক্ত গ্রহণ নিরাপদ হয় না।
            রক্ত নেওয়ার আগে হাসপাতালের মাধ্যমে প্রয়োজনীয় পরীক্ষা ও
            ক্রসম্যাচ করান। জরুরি অবস্থায় সরাসরি হাসপাতালের সহায়তা নিন।
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
