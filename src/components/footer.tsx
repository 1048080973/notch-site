import { Button, Logo } from "./ui";

const columns = [
  { title: "Pages", links: ["Home", "About", "Blog", "Contact"] },
  { title: "Socials", links: ["LinkedIn", "Youtube", "Twitter", "Facebook"] },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-10">
      <div className="overflow-hidden rounded-[32px] border border-border bg-card p-8 md:p-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight">
              Making automation simple and reliable
            </h3>
            <p className="mt-5 text-sm font-medium text-muted">
              Join our newsletter
            </p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="name@email.com"
                className="w-full rounded-full border border-border bg-bg-soft px-4 py-2.5 text-sm text-white outline-none placeholder:text-muted focus:border-border-strong"
              />
              <Button href="#" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Notch. All rights reserved.</p>
          <p>Privacy policy · Terms of service</p>
        </div>
      </div>
    </footer>
  );
}
