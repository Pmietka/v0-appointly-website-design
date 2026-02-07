import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/appointly-logo.png"
            alt="Appointly logo"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-sm font-semibold font-display text-foreground">
            Appointly
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Appointly. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
