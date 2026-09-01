import { HOME_FAQS } from "../seo/site";

function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 bg-orange-50 px-6 md:px-20"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="text-4xl font-bold text-center text-orange-600 mb-4"
        >
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-700 mb-10">
          Quick answers about Tunji Paul&apos;s work, stack, and how to get in
          touch.
        </p>

        <div className="space-y-4">
          {HOME_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white rounded-xl shadow-sm border border-orange-100 p-5 open:shadow-md"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-gray-900 min-h-11">
                <h3 className="text-lg">{faq.question}</h3>
                <span
                  className="text-orange-600 text-2xl leading-none group-open:rotate-45 transition-transform"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
