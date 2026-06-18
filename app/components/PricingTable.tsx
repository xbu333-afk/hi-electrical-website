import { PRICING_ITEMS } from "@/lib/pricing-items";

function cardClass(highlighted?: boolean) {
  return highlighted
    ? "bg-emerald-50/50 border-emerald-100"
    : "bg-white border-gray-100";
}

function rowClass(highlighted?: boolean) {
  return highlighted
    ? "hover:bg-emerald-50/40 transition-colors bg-emerald-50/30"
    : "hover:bg-slate-50 transition-colors";
}

export default function PricingTable() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
      {/* מובייל — כרטיסים ללא גלילה אופקית */}
      <ul
        className="md:hidden list-none p-4 space-y-3"
        aria-label="מחירון שירותי חשמל של ח.י שירותי חשמל"
      >
        {PRICING_ITEMS.map((item) => (
          <li key={item.service}>
            <article
              className={`rounded-2xl border p-4 shadow-sm ${cardClass(item.highlighted)}`}
            >
              <h2 className="font-bold text-slate-900 text-base leading-snug mb-2">
                {item.service}
              </h2>
              <p className="text-emerald-600 font-black text-xl mb-2">{item.price}</p>
              <p className="text-sm text-slate-600 leading-relaxed m-0">{item.notes}</p>
            </article>
          </li>
        ))}
      </ul>

      {/* דסקטופ — טבלה */}
      <div className="hidden md:block">
        <table
          className="w-full text-right border-collapse"
          role="table"
          aria-label="מחירון שירותי חשמל של ח.י שירותי חשמל"
        >
          <thead>
            <tr className="bg-slate-900 text-white">
              <th scope="col" className="p-5 font-bold text-lg">
                🔌 סוג השירות
              </th>
              <th scope="col" className="p-5 font-bold text-lg whitespace-nowrap">
                💰 מחיר משוער
              </th>
              <th scope="col" className="p-5 font-bold text-lg">
                📋 הערות לביצוע
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-700 font-medium divide-y divide-gray-100">
            {PRICING_ITEMS.map((item) => (
              <tr key={item.service} className={rowClass(item.highlighted)}>
                <th scope="row" className="p-5 font-bold text-slate-900">
                  {item.service}
                </th>
                <td className="p-5 text-emerald-600 font-black whitespace-nowrap">
                  {item.price}
                </td>
                <td className="p-5 text-sm">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
