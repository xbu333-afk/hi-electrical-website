import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import YatzaTzadikVideo from "@/app/components/YatzaTzadikVideo";
import ReviewsCarousel from "@/app/components/ReviewsCarousel";
import PressSection from "@/app/components/PressSection";
import ContactSection from "@/app/components/ContactSection";
import { WHATSAPP_HREF } from "@/lib/site";
import { serviceAreas } from "@/lib/cities";
import type { GoogleReview } from "@/lib/google-reviews";

const RU_CITY_NAMES: Record<string, string> = {
  "petah-tikva": "Петах-Тиква",
  "ramat-gan": "Рамат-Ган",
  herzliya: "Герцлия",
  "kfar-saba": "Кфар-Саба",
  raanana: "Раанана",
  "ramat-hasharon": "Рамат а-Шарон",
  "hod-hasharon": "Ход а-Шарон",
  nahalim: "Нахалим",
  magshimim: "Магшимим",
  "givat-hashlosha": "Гиват а-Шлоша",
  "givat-shmuel": "Гиват-Шмуэль",
  "kfar-sirkin": "Кфар-Сиркин",
  mazor: "Мазор",
  rinatia: "Ринатия",
  "beerot-yitzhak": "Беерот Яцхак",
  "ganei-tikva": "Ганей-Тиква",
  savyon: "Савьон",
  "neve-yamin": "Неве-Ямин",
  elishama: "Элишама",
  "neve-yarak": "Неве-Ярак",
  adanim: "Аданим",
  nirit: "Нирит",
  matan: "Матан",
  hemed: "Хемед",
  "rosh-haayin": "Рош а-Аин",
  elad: "Эльад",
};

export const metadata: Metadata = {
  title: "Электрик в Центре Израиля | Х.И. Электросервис — Профессиональный инженер-электрик",
  description:
    "Иехуда Хахамов — практический инженер-электрик с главной лицензией. Аварийный вызов 24/7, устранение коротких замыканий, замена щитков. Петах-Тиква, Рамат-Ган, Герцлия и весь Центральный округ.",
};

/* ─── Сведения об инженере ────────────────────────────────── */
const CREDENTIALS_RU = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "Главная лицензия электрика",
    sub: "Лицензия Министерства труда Израиля",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "Практический инженер-электрик",
    sub: "Полное инженерное образование",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Круглосуточно в экстренных случаях",
    sub: "Аварийный вызов 24/7",
  },
];

/* ─── Особые компетенции ─────────────────────────────────── */
const AUTHORITY_HIGHLIGHTS_RU = [
  {
    icon: "🎓",
    title: "Преподаватель и наставник инженеров-электриков",
    body: "Иехуда Хахамов ведёт занятия и готовит инженеров-электриков в колледже ОРТ Тааsiya Авиатит — передаёт профессиональные знания следующему поколению специалистов Израиля.",
  },
  {
    icon: "⚖️",
    title: "Экспертные заключения для суда",
    body: "Даёт профессиональные экспертные заключения для судов по вопросам электрики.",
  },
];

/* ─── Отзывы на русском ──────────────────────────────────── */
const RU_REVIEWS: GoogleReview[] = [
  {
    name: "Mell Goltsman",
    initials: "MG",
    color: "bg-blue-500",
    text: "Иехуда приехал быстро, нашёл неисправность и устранил её меньше чем за 10 минут. Работал быстро, аккуратно и чисто. С удовольствием воспользуюсь его услугами снова.",
    stars: 5,
  },
  {
    name: "Boris",
    initials: "BO",
    color: "bg-purple-500",
    text: "Вызвал Иехуду для устранения сложной неисправности в щитке. Просто обязан поделиться — профессиональный, быстрый и надёжный сервис на уровне, который редко встретишь. Приехал точно в назначенное время, терпеливо объяснил проблему и варианты решения. Всё сделано чисто и аккуратно.",
    stars: 5,
  },
  {
    name: "Alla H",
    initials: "АХ",
    color: "bg-emerald-500",
    text: "Давно не встречали такого честного и порядочного человека, как Иехуда! Он заслуживает этой награды, а ещё больше — довольных клиентов. Делает ровно то, что нужно, без лишнего, и помогает от всего сердца по честным ценам!",
    stars: 5,
  },
  {
    name: "Aziza Turaev",
    initials: "АТ",
    color: "bg-rose-500",
    text: "Позвонила Иехуде ночью — приехал немедленно и нашёл проблему. Вежливый и профессиональный сервис.",
    stars: 5,
  },
  {
    name: "Sima Mirochnik",
    initials: "СМ",
    color: "bg-cyan-500",
    text: "Обратилась к Иехуде по поводу замены светильника. С первой же секунды разговора поняла, что обратилась по адресу. Он внимательно выслушал и дал именно тот совет, который был нужен. Очень рекомендую.",
    stars: 5,
  },
  {
    name: "Daniel Gofshtein",
    initials: "ДГ",
    color: "bg-amber-600",
    text: "Иехуда заменил фланец в бойлере и сделал намного больше, чем ожидалось! Он также прочистил весь накипь, смазал соединения — потому что любит своё дело! Очень рекомендую!!!",
    stars: 5,
  },
  {
    name: "keren wissman",
    initials: "KW",
    color: "bg-indigo-500",
    text: "Иехуда — чемпион!!! Приехал во время войны, за час починил именно то, что было нужно. Ещё 5 минут и минимум денег! Таких людей не бывает. Добрый, приятный, профессиональный, вежливый и честный.",
    stars: 5,
  },
  {
    name: "Gad Shoshany",
    initials: "GS",
    color: "bg-orange-500",
    text: "Иехуда оказывает точный, профессиональный, надёжный и вежливый сервис. Среагировал немедленно, приехал на следующий день, установил светильник мгновенно. Оставил после себя рабочий прибор, чистое пространство и довольного клиента. Рекомендую без оговорок.",
    stars: 5,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Рейтинг: ${count} звёзд`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function RussianPage() {
  return (
    <>
      {/* Hero — тот же визуальный компонент */}
      <HeroSection whatsappHref={WHATSAPP_HREF} locale="ru" />

      {/* Credentials */}
      <section
        aria-label="Квалификация и сертификаты"
        className="bg-slate-50 border-y border-gray-100 py-10 md:py-14"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            role="list"
            aria-label="Профессиональные квалификации"
          >
            {CREDENTIALS_RU.map(({ icon, label, sub }) => (
              <div
                key={label}
                role="listitem"
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 lift"
              >
                <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  {icon}
                </span>
                <div>
                  <div className="text-slate-900 font-bold text-sm">{label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Видео «Ицат Цадик» */}
      <div className="bg-slate-50 border-b border-gray-100 pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto px-6">
          <YatzaTzadikVideo />
        </div>
      </div>

      {/* О нас */}
      <section
        id="about"
        aria-labelledby="about-heading-ru"
        className="bg-white py-16 md:py-24 scroll-mt-20"
        dir="ltr"
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            О нас
          </p>
          <h2
            id="about-heading-ru"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6"
          >
            Х.И. Электросервис
          </h2>

          <div className="space-y-4 text-slate-600 text-base leading-[1.9]">
            <p>
              <strong className="text-slate-900">Х.И. Электросервис</strong> — ведущая компания, специализирующаяся на профессиональных, надёжных и безопасных электромонтажных решениях для частных клиентов, предприятий и учреждений.
            </p>
            <p>
              Мы предлагаем широкий спектр услуг — от быстрого ремонта и установки осветительных приборов до модернизации электрощитков — с соблюдением высочайших стандартов безопасности и качества. Все работы выполняет лично{" "}
              <strong className="text-slate-900">Иехуда Хахамов</strong> — дипломированный практический инженер-электрик с главной лицензией и большим опытом.
            </p>
            <p>
              Мы гордимся признанием, полученным в телепрограмме{" "}
              <strong className="text-slate-900">«Ицат Цадик — с Хаимом Этгаром»</strong>{" "}
              на 12-м канале, благодаря сочетанию профессионализма, надёжности и честных цен.
            </p>
            <p>
              У нас каждый клиент получает индивидуальный подход, профессиональную консультацию и гибкий график — 6 дней в неделю. Мы также стараемся реагировать на экстренные вызовы 24/7 (кроме шаббата и праздников) — в меру возможностей и доступности.
            </p>
            <p>
              Все электромонтажные работы выполняются лицензированным специалистом с большим опытом, вниманием к деталям, использованием качественных материалов — и всегда с целью обеспечить вам душевный покой. Помимо устранения неисправности, я привношу на объект высокий, тщательный и бескомпромиссный профессиональный стандарт.
            </p>
          </div>

          {/* Особые компетенции */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            role="list"
            aria-label="Особые профессиональные компетенции"
          >
            {AUTHORITY_HIGHLIGHTS_RU.map(({ icon, title, body }) => (
              <div
                key={title}
                role="listitem"
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl" aria-hidden="true">{icon}</span>
                  <h3 className="text-slate-900 font-bold text-sm leading-snug">{title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Блок «Ицат Цадик» */}
          <div
            className="bg-slate-100 border-l-4 border-emerald-500 rounded-xl p-5 mt-6"
            role="note"
            aria-label="Упоминание программы Ицат Цадик"
          >
            <p className="text-slate-800 text-sm font-semibold leading-relaxed">
              Мы гордимся участием в программе «Ицат Цадик» с Хаимом Этгаром на 12-м канале — благодаря надёжному, профессиональному и честному сервису. Выбирая нас — вы выбираете душевный покой и обслуживание наивысшего уровня.
            </p>
          </div>

          {/* Теги */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "Инженер-электрик",
              "Главная лицензия",
              "Сертифицированный электрик",
              "Программа «Ицат Цадик»",
              "Рекомендованный электрик",
            ].map((t) => (
              <span
                key={t}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Ценности */}
          <div
            className="bg-slate-100 border-l-4 border-slate-400 rounded-xl p-5 mt-12"
            role="note"
          >
            <p className="text-slate-700 text-sm font-medium leading-relaxed text-center">
              Точная диагностика с помощью передовых технологий &nbsp;|&nbsp; Индивидуальный подход &nbsp;|&nbsp; Строгое соответствие стандартам &nbsp;|&nbsp; Профессионализм без компромиссов &nbsp;|&nbsp; Прозрачность и честные цены
            </p>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed mt-6 pt-6 border-t border-gray-200 text-center">
            Все работы выполняются исключительно лицензированным электриком. Каждый проект адаптируется к индивидуальным потребностям клиента и выполняется на высочайшем уровне.
          </p>
        </div>
      </section>

      {/* Отзывы */}
      <section
        id="reviews"
        aria-labelledby="reviews-heading-ru"
        className="bg-slate-50 py-16 md:py-24 border-t border-gray-100"
        dir="ltr"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
              Отзывы
            </p>
            <h2
              id="reviews-heading-ru"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2"
            >
              Клиенты рекомендуют
            </h2>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-2">
              <Stars count={5} />
              <span className="text-slate-600 text-sm font-medium">5.0 ·</span>
              <span className="text-slate-400 text-sm">589 отзывов в Google</span>
            </div>
          </div>
          <ReviewsCarousel reviews={RU_REVIEWS} />
        </div>
      </section>

      {/* Районы обслуживания */}
      <section
        id="service-areas"
        aria-labelledby="service-areas-heading-ru"
        className="bg-white py-16 md:py-20 border-t border-gray-100 scroll-mt-20"
        dir="ltr"
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            Районы обслуживания
          </p>
          <h2
            id="service-areas-heading-ru"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3"
          >
            Выезд мастера по всему Центральному округу
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
            Если вам срочно нужен квалифицированный лицензированный электрик — я оперативно выезжаю на объекты в следующих населённых пунктах:
          </p>

          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 list-none"
            role="list"
            aria-label="Список районов обслуживания"
          >
            {serviceAreas.map(({ slug }) => (
              <li key={slug}>
                <Link
                  href={`/cities/${slug}`}
                  title={`Услуги электрика в ${RU_CITY_NAMES[slug] ?? slug}`}
                  className="group flex items-center justify-center min-h-[2.5rem] bg-slate-50 border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-2 py-2 rounded-lg text-xs font-semibold leading-tight text-center transition-all duration-200"
                >
                  {RU_CITY_NAMES[slug] ?? slug}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-slate-500 text-xs leading-relaxed mt-8 pt-6 border-t border-gray-200">
            Не нашли свой город в списке? Позвоните — возможен выезд и в соседние населённые пункты по договорённости.
          </p>
        </div>
      </section>

      {/* Trust Statement */}
      <section
        aria-labelledby="trust-heading-ru"
        className="bg-white py-10 md:py-12 border-t border-gray-100"
        dir="ltr"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 id="trust-heading-ru" className="sr-only">
            Почему стоит выбрать Х.И. Электросервис
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-[1.85]">
            Когда речь идёт о безопасности вашего дома и семьи — не соглашайтесь на меньшее, чем квалифицированный специалист. Как инженер-электрик с главной лицензией, я привношу на объект инженерный стандарт, прозрачность и тщательность без компромиссов.{" "}
            <strong className="text-slate-900">Х.И. Электросервис</strong> прошёл проверку и получил признание в телепрограмме «Ицат Цадик» — официальный знак надёжности, профессионализма и честных цен. Мы гордимся наивысшим рейтингом на всех ведущих платформах и являемся выбором номер один для клиентов, ищущих рекомендованного электрика. Каждая неисправность тщательно диагностируется, с полной гарантией на все работы.
          </p>
        </div>
      </section>

      {/* Пресса */}
      <PressSection />

      {/* Контакты */}
      <ContactSection
        heading="Нужен электрик прямо сейчас?"
        subtext="Иехуда доступен для экстренных вызовов по мере возможности. Сертифицированный и рекомендованный электрик с главной лицензией и знаком «Ицат Цадик»."
        whatsappHref={WHATSAPP_HREF}
        locale="ru"
      />
    </>
  );
}
