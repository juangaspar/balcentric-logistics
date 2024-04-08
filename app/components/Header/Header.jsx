"use client";
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { LOCALES } from "@/utils/constants";

export default function Header({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale: currentLocale } = useParams();
  const searchParams = useSearchParams();

  return (
    <div className="m-auto w-full md:w-3/4 2xl:w-1/2">
      <h1 className="text-xl m-4 font-bold">Baltricen logistics</h1>

      {children}
      <div className="ml-4 space-x-2 mt-2">
        {LOCALES.filter((locale) => locale !== currentLocale).map((locale) => (
          <a
            className="cursor-pointer"
            key={locale}
            onClick={() => {
              router.replace(
                `${pathname.replace(
                  /\w{2}/,
                  locale
                )}?${searchParams.toString()}`
              );
            }}
          >
            {locale.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
}
