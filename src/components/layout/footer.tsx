import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS, APP_NAME } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 푸터 링크 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-foreground mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* 하단 정보 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 소셜 링크 */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* 카피라이트 */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © 2024 {APP_NAME}. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  );
}
