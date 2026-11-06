import { useEffect, useState } from "react";
import { Link } from "@/quran/wouter-shim";
import {
  BookOpen, Headphones, Mic2, Sparkles, ScrollText, BookText, Clock,
  Compass, HandHeart, Sun, CircleDot, Bell, Play, ChevronLeft, Home as HomeIcon,
  Heart, Search, Quote,
} from "lucide-react";
import skyline from "@/assets/home-dawn-skyline.jpg";

const sheikh = `${import.meta.env.BASE_URL}minshawi.jpg`;

const featured = [
  { href: "/quran-audio", icon: Headphones, label: "مرتّل", testid: "link-quran-audio" },
  { href: "/quran-written", icon: BookOpen, label: "المصحف", testid: "link-quran-written" },
  { href: "/quran-tajweed", icon: Mic2, label: "مجوّد", testid: "link-quran-tajweed" },
] as const;

const sections = [
  { href: "/prayer-times", icon: Clock, label: "مواقيت الصلاة", sub: "حسب موقعك", testid: "link-prayer-times" },
  { href: "/qibla", icon: Compass, label: "اتجاه القبلة", sub: "بوصلة دقيقة", testid: "link-qibla" },
  { href: "/adhkar", icon: Sun, label: "الأذكار", sub: "الصباح والمساء", testid: "link-adhkar" },
  { href: "/duas", icon: HandHeart, label: "الدعاء", sub: "أدعية مأثورة", testid: "link-duas" },
  { href: "/hadith", icon: ScrollText, label: "الأحاديث النبوية", sub: "أحاديث صحيحة", testid: "link-hadith" },
  { href: "/asma-husna", icon: BookText, label: "أسماء الله الحسنى", sub: "شرح ومعاني", testid: "link-asma-husna" },
  { href: "/tasbeeh", icon: CircleDot, label: "التسابيح", sub: "سبحة إلكترونية", testid: "link-tasbeeh" },
  { href: "/tafsir", icon: BookText, label: "التفسير", sub: "معاني الآيات", testid: "link-tafsir" },
] as const;

const ayat = [
  { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "سورة الرعد ٢٨" },
  { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "سورة الشرح ٦" },
  { text: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", ref: "سورة المزمل ٤" },
  { text: "فَاذْكُرُونِي أَذْكُرْكُمْ", ref: "سورة البقرة ١٥٢" },
  { text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", ref: "سورة طه ١١٤" },
];

function useToday() {
  const [info, setInfo] = useState<{ hijri: string; greet: string; ayah: number } | null>(null);
  useEffect(() => {
    const d = new Date();
    let hijri = "";
    try {
      hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", { day: "numeric", month: "long", year: "numeric" }).format(d);
    } catch { /* calendar unsupported */ }
    const h = d.getHours();
    const greet = h < 12 ? "صباح الخير" : h < 18 ? "طاب يومك" : "مساء الخير";
    const day = Math.floor(d.getTime() / 86400000);
    setInfo({ hijri, greet, ayah: day % ayat.length });
  }, []);
  return info;
}

export default function Home() {
  const today = useToday();
  const ayah = ayat[today?.ayah ?? 0];

  return (
    <main className="home-calm relative" dir="rtl" aria-label="الصفحة الرئيسية">
      <div className="home-art" style={{ backgroundImage: `url(${skyline})` }} aria-hidden="true" />

      <div className="relative mx-auto max-w-xl px-4 pb-32 pt-5">
        <header className="home-fade flex items-center justify-between">
          <div className="home-glass rounded-2xl px-4 py-2">
            <p className="text-[11px] text-muted-foreground">{today?.greet ?? "السلام عليكم"}{today?.hijri ? ` · ${today.hijri}` : ""}</p>
            <h1 className="text-xl font-extrabold text-foreground">تقوى القلوب</h1>
          </div>
          <Link href="/notifications" aria-label="الإشعارات" data-testid="link-notifications"
            className="home-glass grid h-11 w-11 place-items-center rounded-2xl text-primary">
            <Bell className="h-5 w-5" />
          </Link>
        </header>

        <section className="home-hero home-fade mt-36 p-5">
          <div className="relative flex items-center gap-4">
            <div className="flex-1">
              <span className="inline-block rounded-full bg-accent/25 px-3 py-1 text-[11px] font-semibold">فضيلة الشيخ</span>
              <h2 className="mt-2 font-serif text-2xl leading-snug">محمد صديق المنشاوي</h2>
              <p className="mt-1 text-sm opacity-80">تلاوة خاشعة تسكن القلوب</p>
              <Link href="/quran-audio"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
                <Play className="h-4 w-4 fill-current" /> ابدأ الاستماع
              </Link>
            </div>
            <div className="home-ring shrink-0">
              <img src={sheikh} alt="الشيخ محمد صديق المنشاوي" className="h-28 w-28 rounded-full bg-card object-cover" draggable={false} />
            </div>
          </div>
        </section>

        <nav className="mt-4 grid grid-cols-3 gap-3" aria-label="القرآن الكريم">
          {featured.map((f, i) => (
            <Link key={f.href} href={f.href} data-testid={f.testid} className="home-feature home-fade" style={{ animationDelay: `${60 + i * 50}ms` }}>
              <span className="home-feature-icon"><f.icon className="h-5 w-5" /></span>
              <span className="text-sm font-bold text-foreground">{f.label}</span>
            </Link>
          ))}
        </nav>

        <Link href="/illuminated-book" data-testid="link-illuminated-book" className="home-tile home-fade mt-4 !flex-row items-center">
          <span className="home-icon !bg-accent/15 !text-accent-foreground"><Sparkles className="h-5 w-5" /></span>
          <span className="flex-1">
            <span className="block font-bold text-foreground">الكتاب المضيء</span>
            <span className="block text-xs text-muted-foreground">اسأل واعرف وتعلّم</span>
          </span>
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </Link>

        <section className="home-ayah home-fade mt-6 px-6 py-6 text-center">
          <Quote className="mx-auto h-5 w-5 text-accent" />
          <p className="mt-2 text-[11px] font-semibold tracking-wide text-muted-foreground">آية اليوم</p>
          <p className="mt-2 font-serif text-2xl leading-loose text-primary">﴿ {ayah.text} ﴾</p>
          <p className="mt-1 text-xs text-muted-foreground">{ayah.ref}</p>
        </section>

        <h3 className="mb-3 mt-7 text-lg font-bold text-foreground">الأقسام</h3>
        <nav className="grid grid-cols-2 gap-3" aria-label="أقسام التطبيق">
          {sections.map((s, i) => (
            <Link key={s.href} href={s.href} data-testid={s.testid} aria-label={s.label}
              className="home-tile home-fade" style={{ animationDelay: `${80 + i * 40}ms` }}>
              <span className="home-icon"><s.icon className="h-5 w-5" /></span>
              <span>
                <span className="block font-bold text-foreground">{s.label}</span>
                <span className="block text-xs text-muted-foreground">{s.sub}</span>
              </span>
            </Link>
          ))}
        </nav>

        <Link href="/privacy" data-testid="link-privacy" className="mt-8 block text-center text-xs text-muted-foreground underline">
          سياسة الخصوصية
        </Link>
      </div>

      <nav className="home-tabbar home-glass flex items-center justify-around px-2 py-2" aria-label="التنقل">
        {[
          { href: "/", icon: HomeIcon, label: "الرئيسية", active: true },
          { href: "/quran-written", icon: BookOpen, label: "المصحف" },
          { href: "/favorites", icon: Heart, label: "المفضلة" },
          { href: "/search", icon: Search, label: "البحث" },
        ].map((t) => (
          <Link key={t.href} href={t.href}
            className={`flex flex-col items-center gap-0.5 rounded-2xl px-4 py-1.5 text-[11px] font-semibold ${t.active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            <t.icon className="h-5 w-5" />{t.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
