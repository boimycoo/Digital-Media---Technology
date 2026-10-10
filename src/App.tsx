import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brush,
  Check,
  Cloud,
  Code2,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Mic2,
  MonitorSmartphone,
  MoonStar,
  Music2,
  Phone,
  Search,
  Send,
  SunMedium,
  X,
  Megaphone,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const services = [
  {
    icon: Code2,
    title: "Web design & development",
    description: "Distinctive, responsive websites that turn a first visit into a lasting impression.",
    number: "01",
  },
  {
    icon: Cloud,
    title: "Web hosting",
    description: "Fast, dependable hosting that keeps your business online and ready for what is next.",
    number: "02",
  },
  {
    icon: Megaphone,
    title: "Digital marketing",
    description: "Clear, considered campaigns that connect your brand with the right people.",
    number: "03",
  },
  {
    icon: Brush,
    title: "Brand & graphic design",
    description: "A cohesive visual identity that tells your story at every touchpoint.",
    number: "04",
  },
  {
    icon: MonitorSmartphone,
    title: "UI/UX design",
    description: "Thoughtful digital experiences that feel natural from desktop to mobile.",
    number: "05",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Practical search optimization that helps the right customers find you.",
    number: "06",
  },
  {
    icon: Music2,
    title: "Music promotion",
    description: "Strategic releases and promotion to help independent artists find an audience.",
    number: "07",
  },
  {
    icon: BarChart3,
    title: "Social media management",
    description: "A consistent social presence built around useful content and real engagement.",
    number: "08",
  },
  {
    icon: Mic2,
    title: "Artist management",
    description: "Practical guidance and industry support for artists building a lasting career.",
    number: "09",
  },
];

const asset = (path: string) => `${import.meta.env.BASE_URL}asset/${encodeURIComponent(path)}`;

const workImages = [
  { src: asset("Image 2.png"), alt: "A magnifying glass over a keyboard, representing careful digital strategy", label: "Search strategy" },
  { src: asset("Image 3.png"), alt: "Analytics dashboard on a laptop screen", label: "Digital insights" },
  { src: asset("Image 4.png"), alt: "Creative professional producing a video on a laptop", label: "Creative production" },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Header({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-forest/[0.07] bg-paper/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1715]/90">
      <div className="section-shell flex h-19 items-center justify-between gap-4">
        <a href="#home" aria-label="NaijaLumia home" className="shrink-0">
          <img className="h-10 w-auto" src={asset("NaijaLumia 1.svg")} alt="NaijaLumia" />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-leaf dark:text-[#dfeee6] dark:hover:text-mint"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((current) => !current)}
            className="grid size-11 place-items-center rounded-full border border-forest/10 bg-white/80 text-forest shadow-sm transition hover:border-forest/20 hover:bg-forest hover:text-white dark:border-white/10 dark:bg-[#111d1a] dark:text-[#e7f5eb] dark:hover:bg-mint dark:hover:text-forest"
          >
            {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-leaf dark:bg-mint dark:text-forest dark:hover:bg-[#edf8e3]"
          >
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((current) => !current)}
            className="grid size-10 place-items-center rounded-full border border-forest/10 bg-white/80 text-forest dark:border-white/10 dark:bg-[#111d1a] dark:text-[#e7f5eb]"
          >
            {darkMode ? <SunMedium size={17} /> : <MoonStar size={17} />}
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-forest/10 text-forest dark:border-white/10 dark:text-[#e7f5eb]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="overflow-hidden border-t border-forest/[0.07] bg-paper dark:border-white/10 dark:bg-[#0d1715] md:hidden"
          >
            <div className="section-shell flex flex-col py-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-forest/6 py-3.5 text-sm font-medium text-forest last:border-0 dark:border-white/10 dark:text-[#ebfff4]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative isolate overflow-hidden bg-paper">
      <div className="soft-grid absolute inset-x-0 top-0 -z-10 h-[90%] opacity-70" />
      <div className="section-shell grid min-h-162.5 items-center gap-8 py-16 md:min-h-172.5 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }}
          className="relative z-10 max-w-155"
        >
          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="section-kicker mb-6">
            Digital media & technology
          </motion.div>
          <motion.h1
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="font-display text-[clamp(2.9rem,6.1vw,5.3rem)] font-extrabold leading-[1.04] tracking-[-0.055em] text-forest"
          >
            Taking your brand <span className="text-leaf">beyond limits.</span>
          </motion.h1>
          <motion.p
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mt-6 max-w-130 text-base leading-7 text-muted sm:text-lg sm:leading-8"
          >
            We bring creative thinking and dependable technology together to help ambitious brands move forward.
          </motion.p>
          <motion.div variants={reveal} transition={{ duration: 0.7 }} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#services"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-leaf"
            >
              Explore our services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold text-forest transition hover:bg-mint/50"
            >
              Get to know us <ArrowDown size={15} />
            </a>
          </motion.div>
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-forest/10 pt-6 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-leaf" /> Based in Ogbomoso, Nigeria
            </span>
            <span className="font-semibold text-forest">Working everywhere</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex min-h-92.5 w-full max-w-130 items-center justify-center sm:min-h-122.5"
        >
          <div className="absolute right-[7%] top-[8%] aspect-square w-[78%] rounded-[42%_58%_52%_48%/46%_42%_58%_54%] bg-mint/70" />
          <div className="absolute bottom-[5%] left-[2%] h-[55%] w-[76%] rounded-[48%_52%_38%_62%/52%_44%_56%_48%] bg-forest" />
          <motion.img
            src={asset("Image 1.png")}
            alt="Laptop displaying a modern website and digital tools"
            className="relative z-10 h-90 w-auto max-w-[92%] object-contain drop-shadow-[0_28px_30px_rgba(7,59,34,0.16)] sm:h-117.5"
            animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute bottom-[9%] right-0 z-20 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl shadow-forest/10 sm:right-[-1%]"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-mint/55 text-leaf">
              <Check size={21} />
            </span>
            <span>
              <span className="block font-display text-sm font-bold text-forest">Thoughtfully made</span>
              <span className="mt-0.5 block text-xs text-muted">From idea to impact</span>
            </span>
          </motion.div>
          <div className="absolute right-[4%] top-[13%] size-3 rounded-full bg-leaf/70" />
          <div className="absolute left-[2%] top-[28%] size-2 rounded-full bg-forest/35" />
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div variants={reveal} transition={{ duration: 0.65 }} className="max-w-170">
      <span className="section-kicker dark:text-mint">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.045em] text-forest sm:text-4xl lg:text-[2.75rem] dark:text-[#f4fff8]">
        {title}
      </h2>
      {copy && <p className="mt-4 max-w-150 text-base leading-7 text-muted dark:text-[#dfeee6]">{copy}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28 dark:bg-[#0f1715]">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <SectionHeading
            eyebrow="A little about us"
            title="Good ideas deserve a digital home that works."
            copy="NaijaLumia is a digital media and technology company helping businesses and individuals show up with clarity, creativity, and confidence."
          />
          <motion.p variants={reveal} transition={{ duration: 0.6 }} className="mt-4 max-w-150 text-base leading-7 text-muted dark:text-[#dfeee6]">
            Our team combines design, technology, and strategy to create thoughtful experiences tailored to the people you want to reach.
          </motion.p>
          <motion.a
            variants={reveal}
            transition={{ duration: 0.6 }}
            href="#contact"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-leaf dark:text-mint"
          >
            Let&apos;s build something meaningful <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 items-center gap-3 sm:gap-4">
          <motion.figure
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl bg-paper shadow-sm"
          >
            <img
              src={asset("Image 3.png")}
              alt="Business analytics shown on a laptop"
              loading="lazy"
              className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </motion.figure>
          <div className="grid gap-3 pt-8 sm:gap-4 sm:pt-12">
            <motion.figure
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="overflow-hidden rounded-2xl bg-paper shadow-sm dark:bg-[#141f1b]"
            >
              <img
                src={asset("Image 4.png")}
                alt="Creative professional editing a video project"
                loading="lazy"
                className="aspect-1.25/1 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </motion.figure>
            <div className="rounded-2xl bg-forest p-5 text-white sm:p-7">
              <p className="font-display text-2xl font-bold sm:text-3xl">One team.</p>
              <p className="mt-1 text-sm leading-6 text-white/70">Creative direction, technology, and thoughtful support in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-paper py-20 sm:py-28 dark:bg-[#0d1513]">
      <div className="section-shell">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <SectionHeading
            eyebrow="What we do"
            title="Everything your next chapter needs."
            copy="A considered mix of creative and technical services, shaped around your goals and built to work together."
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, description, number }) => (
            <motion.article
              key={title}
              variants={reveal}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group flex min-h-55 flex-col bg-white p-6 transition-colors hover:bg-[#fbfdf9] dark:bg-[#121d1a] dark:hover:bg-[#162521] sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-mint/50 text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <span className="font-display text-xs font-semibold text-forest/35">{number}</span>
              </div>
              <h3 className="mt-6 font-display text-lg font-bold text-forest dark:text-[#f1fff7]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted dark:text-[#dfeee6]">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="bg-white py-20 sm:py-28 dark:bg-[#0f1715]">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <SectionHeading
              eyebrow="Our approach"
              title="Built around the people behind the brand."
              copy="Every project starts with listening. Then we bring the right ideas, tools, and people together to move it forward."
            />
          </motion.div>
          <motion.a
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-leaf dark:text-mint"
          >
            Start a conversation <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {workImages.map((image, index) => (
            <motion.figure
              key={image.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative isolate overflow-hidden rounded-2xl bg-forest"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-[1.12/1] w-full object-cover transition duration-700 group-hover:scale-[1.04] group-hover:opacity-80"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-forest/85 to-transparent px-5 pb-5 pt-14 text-sm font-semibold text-white">
                {image.label}
                <ArrowUpRight size={17} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSending(true);

    const formData = new FormData(event.currentTarget);
    const values = {
      sendername: String(formData.get("name") ?? "").trim(),
      senderemail: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      await emailjs.send("service_hnfsjt7", "template_6f5i1be", values, "p75x9dtjSxlA3GUgu");
      event.currentTarget.reset();
      setStatus({ kind: "success", message: "Thanks for reaching out. Your message is on its way." });
    } catch {
      setStatus({ kind: "error", message: "We could not send your message. Please email info@naijalumia.com instead." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="bg-[#eef4e9] py-20 sm:py-28 dark:bg-[#0d1513]">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionHeading
            eyebrow="Let’s get started"
            title="Tell us what you’re working on."
            copy="Have a project in mind or just want to explore an idea? We’d love to hear from you."
          />
          <motion.div variants={reveal} transition={{ duration: 0.55 }} className="mt-8 space-y-5">
            <a href="mailto:info@naijalumia.com" className="group flex items-center gap-4 text-sm text-forest">
              <span className="grid size-11 place-items-center rounded-full bg-white text-leaf">
                <Mail size={18} />
              </span>
              <span>
                <span className="block text-xs text-muted">Email us</span>
                <span className="mt-0.5 block font-semibold">info@naijalumia.com</span>
              </span>
            </a>
            <a href="tel:+2348067750802" className="group flex items-center gap-4 text-sm text-forest">
              <span className="grid size-11 place-items-center rounded-full bg-white text-leaf">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-xs text-muted">Call us</span>
                <span className="mt-0.5 block font-semibold">+234 806 775 0802</span>
              </span>
            </a>
            <div className="flex items-center gap-4 text-sm text-forest">
              <span className="grid size-11 place-items-center rounded-full bg-white text-leaf">
                <MapPin size={18} />
              </span>
              <span>
                <span className="block text-xs text-muted">Find us</span>
                <span className="mt-0.5 block max-w-75 font-semibold">Ogbomoso, Oyo State, Nigeria</span>
              </span>
            </div>
          </motion.div>
          <motion.a
            variants={reveal}
            transition={{ duration: 0.55 }}
            href="https://wa.me/2348067750802"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-forest/15 px-5 py-3 text-sm font-semibold text-forest transition hover:border-forest hover:bg-white"
          >
            Message us on WhatsApp <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          transition={{ duration: 0.65 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-forest/8 bg-white p-5 shadow-[0_18px_55px_rgba(7,59,34,0.07)] dark:border-white/10 dark:bg-[#101c19] sm:p-8"
        >
          <h3 className="font-display text-xl font-bold text-forest dark:text-[#f4fff8]">Send us a message</h3>
          <p className="mt-1 text-sm text-muted dark:text-[#dfeee6]">We’ll get back to you as soon as we can.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-forest dark:text-[#eefbf2]">
              Your name
              <input
                className="form-field mt-2 text-sm font-normal"
                name="name"
                autoComplete="name"
                placeholder="e.g. Ada Okafor"
                minLength={2}
                required
              />
            </label>
            <label className="text-sm font-semibold text-forest dark:text-[#eefbf2]">
              Email address
              <input
                className="form-field mt-2 text-sm font-normal"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="text-sm font-semibold text-forest sm:col-span-2 dark:text-[#eefbf2]">
              How can we help?
              <textarea
                className="form-field mt-2 min-h-32 resize-y text-sm font-normal"
                name="message"
                placeholder="Tell us a little about your project..."
                minLength={10}
                required
              />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-leaf disabled:cursor-wait disabled:opacity-65 dark:bg-mint dark:text-forest dark:hover:bg-[#edf8e3]"
            >
              {sending ? "Sending..." : "Send message"}
              <Send size={15} />
            </button>
            <AnimatePresence mode="wait">
              {status && (
                <motion.p
                  key={status.kind}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`text-sm ${status.kind === "success" ? "text-leaf" : "text-red-700"}`}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="section-shell py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" aria-label="NaijaLumia home">
            <img src={asset("NaijaLumia Light 1.svg")} alt="NaijaLumia" className="h-10 w-auto" loading="lazy" />
          </a>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/emikellymore_"
              aria-label="NaijaLumia on X"
              className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <span className="text-xs font-bold">X</span>
            </a>
            <a
              href="https://fb.com/emikellymore"
              aria-label="NaijaLumia on Facebook"
              className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href="https://instagram.com/"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <Instagram size={17} />
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NaijaLumia Media & Technology. All rights reserved.</p>
          <a href="mailto:info@naijalumia.com" className="transition-colors hover:text-white">
            Made for what&apos;s next <ArrowUpRight size={12} className="ml-1 inline" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("naijalumia-theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem("naijalumia-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <a href="#main-content" className="sr-only z-100 rounded bg-white p-3 text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main-content" className="bg-paper text-forest dark:bg-[#0d1513] dark:text-[#eafaf0]">
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
