import { Link } from "@/quran/wouter-shim";
import {
  BookOpen, Headphones, Mic2, Sparkles, ScrollText, BookText, Clock,
  Compass, HandHeart, Sun, CircleDot, Bell, Play, ChevronLeft,
} from "lucide-react";

const sheikh = `${import.meta.env.BASE_URL}sheikh-clear.png`;

const sections = [
  { href: "/quran-audio", icon: Headphones, label: "القرآن مرتل", sub: "استماع بدون إنترنت", testid: "link-quran-audio" },
  { href: "/quran-tajweed", icon: Mic2, label: "القرآن مجود", sub: "تلاوة بأحكام التجويد", testid: "link-quran-tajweed" },
  { href: "/quran-written", icon: BookOpen, label: "المصحف المكتوب", sub: "النص الكامل للمصحف", testid: "link-quran-written" },
  { href: "/hadith", icon: ScrollText, label: "الأحاديث النبوية", sub: "أحاديث صحيحة", testid: "link-hadith" },
  { href: "/asma-husna", icon: BookText, label: "أسماء الله الحسنى", sub: "شرح ومعاني", testid: "link-asma-husna" },
  { href: "/prayer-times", icon: Clock, label: "مواقيت الصلاة", sub: "حسب موقعك", testid: "link-prayer-times" },
  { href: "/qibla", icon: Compass, label: "اتجاه القبلة", sub: "بوصلة دقيقة", testid: "link-qibla" },
  { href: "/duas", icon: HandHeart, label: "الدعاء", sub: "أدعية مأثورة", testid: "link-duas" },
  { href: "/adhkar", icon: Sun, label: "الأذكار", sub: "الصباح والمساء", testid: "link-adhkar" },
  { href: "/tasbeeh", icon: CircleDot, label: "التسابيح", sub: "سبحة إلكترونية", testid: "link-tasbeeh" },
] as const;

export default function Home() {
  return (
    <main className="home-calm" dir="rtl" aria-label="الصفحة الرئيسية">
      <div className="mx-auto max-w-xl px-4 pb-10 pt-6">
        <header className="home-fade mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">السلام عليكم</p>
            <h1 className="text-2xl font-extrabold text-foreground">تقوى القلوب</h1>
          </div>
          <Link href="/notifications" aria-label="الإشعارات" data-testid="link-notifications"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card text-primary">
            <Bell className="h-5 w-5" />
          </Link>
        </header>

        <section className="home-hero home-fade p-5">
          <div className="relative flex items-center gap-4">
            <div className="flex-1">
              <span className="inline-block rounded-full bg-accent/25 px-3 py-1 text-[11px] font-semibold">فضيلة الشيخ</span>
              <h2 className="mt-2 font-serif text-2xl leading-snug">محمد صديق المنشاوي</h2>
              <p className="mt-1 text-sm opacity-80">استمع إلى القرآن الكريم بصوت خاشع</p>
              <Link href="/quran-audio"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
                <Play className="h-4 w-4 fill-current" /> ابدأ الاستماع
              </Link>
            </div>
            <div className="home-ring shrink-0">
              <img src={sheikh} alt="الشيخ محمد صديق المنشاوي" className="h-28 w-28 rounded-full bg-card object-cover object-top" draggable={false} />
            </div>
          </div>
        </section>

        <Link href="/illuminated-book" data-testid="link-illuminated-book"
          className="home-tile home-fade mt-4 !flex-row items-center">
          <span className="home-icon !bg-accent/15 !text-accent-foreground"><Sparkles className="h-5 w-5" /></span>
          <span className="flex-1">
            <span className="block font-bold text-foreground">الكتاب المضيء</span>
            <span className="block text-xs text-muted-foreground">اسأل واعرف وتعلّم</span>
          </span>
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </Link>

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
    </main>
  );
}
