"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
  type ReactNode,
} from "react";

export type Locale = "en" | "uz";

const STORAGE_KEY = "wedding-locale";

export type Dict = {
  nav: Record<string, string>;
  lang: { en: string; uz: string; aria: string };
  hero: {
    pretag: string;
    marryLine: string;
    body: string;
    signature: string;
  };
  whenWhere: {
    when: string;
    where: string;
    saturday: string;
    /** Large display line (e.g. “May 9” / “9-may”) — must match `WEDDING_ISO` in code. */
    weddingDatePrimary: string;
    weddingDateYear: string;
    timeDetail: string;
    cityLine: string;
    whenBlurb: string;
    whereIllustrationCaption: string;
  };
  schedule: {
    title: string;
    intro: string;
    arrival: string;
    main: string;
    evening: string;
    dress: string;
    note: string;
  };
  story: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };
  countdown: {
    eyebrow: string;
    title: string;
    sub: string;
    detail: string;
    dateLine: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    lead: string;
    fullName: string;
    guests: string;
    attendingLegend: string;
    yes: string;
    no: string;
    childrenLegend: string;
    childrenCount: string;
    message: string;
    optional: string;
    placeholder: string;
    submit: string;
    success: string;
    errors: Record<string, string>;
  };
  greetings: { eyebrow: string; quote: string; body: string; monogram: string };
  footer: string;
  splash: { line: string; cta: string; hint: string };
  map: { loading: string; openMaps: string };
};

const en: Dict = {
  nav: {
    home: "Home",
    story: "Story",
    when: "When",
    where: "Where",
    countdown: "Countdown",
    rsvp: "RSVP",
    love: "Love",
    backToTop: "Back to top",
  },
  lang: { en: "EN", uz: "UZ", aria: "Language" },
  hero: {
    pretag: "We’re celebrating in Cincinnati!",
    marryLine: "are getting married",
    body:
      "On Saturday, May 9, 2026, we’ll gather with family and friends at Restaurant Three Brothers. There will be love, music, dancing, and a few happy tears. Below you’ll find everything you need: the day’s details, how to RSVP, and how to reach us. Please respond by May 1, 2026.",
    signature: "— Sadriddin & Feruzabonu",
  },
  whenWhere: {
    when: "When",
    where: "Where",
    saturday: "Saturday",
    weddingDatePrimary: "May 9",
    weddingDateYear: "2026",
    timeDetail: "Celebration begins at 4:00 p.m.",
    cityLine: "Cincinnati, Ohio",
    whenBlurb:
      "We can’t wait to have everyone we love in one room — mark the day, and we’ll see you there.",
    whereIllustrationCaption: "Where we’ll meet you — warm lights, full tables, and room to dance.",
  },
  schedule: {
    title: "The day",
    intro:
      "One evening together — vows, dinner, and dancing. Here’s a simple guide to the flow; your invitation carries the final details.",
    arrival: "Doors open — 3:30 p.m. — Welcome & refreshments",
    main: "Ceremony & celebration — 4:00 p.m.",
    evening: "Evening — Dinner, music, and dancing",
    dress: "Attire — cocktail / festive (think garden party in spring)",
    note: "Parking is available on site. If you need accessibility help, reach out anytime.",
  },
  story: {
    eyebrow: "Our story",
    title: "Two paths, one meeting",
    p1:
      "Our story began with quiet glances and small kindnesses on ordinary days. Seasons changed, cities changed, and we kept finding our way back to the same truth: love, when it is real, feels both ancient and brand new.",
    p2:
      "We have laughed through long journeys, steadied each other through uncertainty, and learned that grace is not the absence of storms, but the choice to walk through them together.",
    p3:
      "On a spring evening in Cincinnati, surrounded by the people who shaped our lives, we will promise forever. It would be our greatest joy to celebrate with you.",
    p4:
      "We chose Cincinnati because it is home to the people who raised us, and because love — like a good city — is built from small daily kindnesses.",
    p5:
      "If you are reading this, you are already part of our story. We would be honored to share the next chapter with you.",
  },
  countdown: {
    eyebrow: "Save the date",
    title: "Countdown",
    sub: "Until we say I do",
    detail:
      "We’re counting the minutes until we can hug you, raise a glass with you, and dance with you.",
    dateLine: "Saturday · May 9, 2026 · Cincinnati",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  rsvp: {
    eyebrow: "Please respond by May 1, 2026",
    title: "RSVP",
    lead: "Will we see you there? Kindly let us know by May 1, 2026.",
    fullName: "Full name",
    guests: "Guests (including you)",
    attendingLegend: "Attendance",
    yes: "I’ll be there",
    no: "I can’t make it",
    childrenLegend: "Will any children attend?",
    childrenCount: "How many children?",
    message: "Allergies or notes",
    optional: "optional",
    placeholder: "Dietary needs, song requests, warm wishes…",
    submit: "Confirm attendance",
    success:
      "Thank you — your response has been recorded. We’ll be in touch if needed.",
    errors: {
      name_short: "Please enter your full name.",
      name_long: "Name is too long.",
      attending_required: "Please choose whether you are attending.",
      guests_invalid: "Guests must be a number between 0 and 20.",
      children_required: "Please indicate whether children will attend.",
      children_count_invalid: "Number of children must be between 1 and 15.",
      message_long: "Message is too long.",
    },
  },
  greetings: {
    eyebrow: "With love",
    quote: "“Every love story is beautiful, but ours is our favorite.”",
    body:
      "With grateful hearts and warmest anticipation — we cannot wait to celebrate with you.",
    monogram: "S & F",
  },
  footer: "May 9, 2026 · Cincinnati, Ohio",
  splash: {
    line: "You are invited",
    cta: "Open invitation",
    hint: "Tap the button to continue",
  },
  map: {
    loading: "Loading map…",
    openMaps: "Open in Google Maps",
  },
};

const uz: Dict = {
  nav: {
    home: "Bosh sahifa",
    story: "Hikoya",
    when: "Qachon",
    where: "Qayerda",
    countdown: "Teskari hisob",
    rsvp: "RSVP",
    love: "Muhabbat",
    backToTop: "Yuqoriga",
  },
  lang: { en: "EN", uz: "UZ", aria: "Til" },
  hero: {
    pretag: "Sinsinnati shahrida nishonlaymiz!",
    marryLine: "Uylanmoqdalar",
    body:
      "2026-yil 9-may, shanba kuni oila va doʻstlarimiz bilan Restaurant Three Brothers restoranda uchrashamiz. Bu yerda muhabbat, musiqa, raqs va quvonchli koʻz yoshlari boʻlishi aniq. Barcha kerakli maʼlumotlar — kun tartibi, RSVP va aloqa — quyida. Iltimos, javobingizni 2026-yil 1-maygacha yuboring.",
    signature: "— Sadriddin va Feruzabonu",
  },
  whenWhere: {
    when: "Qachon",
    where: "Qayerda",
    saturday: "Shanba",
    weddingDatePrimary: "9-may",
    weddingDateYear: "2026",
    timeDetail: "Tantana soat 16:00 da boshlanadi",
    cityLine: "Sinsinnati, Ogayo",
    whenBlurb:
      "Sevgan barcha insonlarimizni bir zalda koʻrishni intiqlik bilan kutamiz — sanani belgilab qoʻying.",
    whereIllustrationCaption:
      "U yerda uchrashamiz — iliq chiroqlar, toʻliq dasturxon va raqs uchun joy.",
  },
  schedule: {
    title: "Kun",
    intro:
      "Bitta kechada — marosim, kechki ovqat va raqs. Bu qisqa yoʻriqnoma; aniq vaqtlar taklifnomada.",
    arrival: "Eshiklar — 15:30 — Kutib olish va salqin ichimliklar",
    main: "Marosim va tantana — 16:00",
    evening: "Kechqurun — kechki ovqat, musiqa va raqs",
    dress: "Kiyim — kokteyl / tantanali (bahor bogʻi kabi)",
    note: "Avtoturargoh mavjud. Agar yordam kerak boʻlsa, xabar bering.",
  },
  story: {
    eyebrow: "Bizning hikoyamiz",
    title: "Ikki yoʻl, bitta uchrashuv",
    p1:
      "Hikoyamiz oddiy kunlardagi muloyim qarashlar va kichik eʼtiqor bilan boshlangan. Fasllar oʻzgardi, shaharlar oʻzgardi, biz esa bir xil haqiqatga qaytib kelardik: haqiqiy muhabbat qadimiy va yangi tuyuladi.",
    p2:
      "Uzoq yoʻllarda kulib, noaniqlikda bir-birimizni qoʻllab-quvvatlab, inoyat boʻron yoʻqolishi emas, balki unda birga yurishni tanlash ekanini oʻrgandik.",
    p3:
      "Sinsinnati bahor kechasi, hayotimizni shakllantirgan insonlar orasida abadiy vaʼda beramiz. Siz bilan birga nishonlash — eng katta baxtimiz boʻlardi.",
    p4:
      "Sinsinnati shahrini tanladik, chunki u bizni tarbiyalagan insonlarning uyi — va muhabbat yaxshi shahar kabi, kichik, kundalik mehr bilan quriladi.",
    p5:
      "Agar buni oʻqiyotgan boʻlsangiz, siz allaqachon bizning hikoyamizning bir qismisiz. Keyingi bobni siz bilan bahrash biz uchun sharaf boʻlardi.",
  },
  countdown: {
    eyebrow: "Sanani eslang",
    title: "Teskari hisob",
    sub: "To'y marosimigacha",
    detail:
      "Sizni quchoqlash, birga koʻtarish va raqsga tushish uchun daqiqalarni hisoblayapmiz.",
    dateLine: "Shanba · 2026-yil 9-may · Sinsinnati",
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",
  },
  rsvp: {
    eyebrow: "Iltimos, 2026-yil 1-maygacha javob bering",
    title: "RSVP",
    lead: "Kelolasizmi? Iltimos, 2026-yil 1-maygacha xabar bering.",
    fullName: "Toʻliq ism",
    guests: "Mehmonlar (oʻzingizni hisobga oling)",
    attendingLegend: "Ishtirok",
    yes: "Men u yerda boʻlaman",
    no: "Kela olmayman",
    childrenLegend: "Bolalar ham keladimi?",
    childrenCount: "Nechta bola?",
    message: "Allergiya yoki eslatmalar",
    optional: "ixtiyoriy",
    placeholder: "Oziq-ovqat, qoʻshiq tilaklari, tabriklar…",
    submit: "Ishtirokni tasdiqlash",
    success:
      "Rahmat — javobingiz qayd etildi. Kerak boʻlsa, aloqaga chiqamiz.",
    errors: {
      name_short: "Iltimos, toʻliq ismingizni kiriting.",
      name_long: "Ism juda uzun.",
      attending_required: "Ishtirok etishingizni tanlang.",
      guests_invalid: "Mehmonlar soni 0 dan 20 gacha boʻlishi kerak.",
      children_required: "Bolalar kelishini koʻrsating.",
      children_count_invalid: "Bolalar soni 1 dan 15 gacha boʻlishi kerak.",
      message_long: "Xabar juda uzun.",
    },
  },
  greetings: {
    eyebrow: "Muhabbat bilan",
    quote: "“Har bir muhabbat hikoyasi goʻzal, lekin bizniki — eng sevimli.”",
    body:
      "Minnatdor yuraklar va iliq intizorlik bilan — siz bilan nishonlashni intiqlik bilan kutamiz.",
    monogram: "S va F",
  },
  footer: "2026-yil 9-may · Sinsinnati, Ogayo",
  splash: {
    line: "Siz taklif etildingiz",
    cta: "Taklifnomani ochish",
    hint: "Davom etish uchun tugmani bosing",
  },
  map: {
    loading: "Xarita yuklanmoqda…",
    openMaps: "Google Xaritada ochish",
  },
};

const messages: Record<Locale, Dict> = { en, uz };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const I18nContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (s === "en" || s === "uz") {
        startTransition(() => setLocaleState(s));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "uz" ? "uz" : "en";
  }, [locale]);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
    }),
    [locale, setLocale],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT() {
  return useLocale().t;
}
