"use client";

import useTranslations from "@/hooks/useTranslations";

export default function Menu({ options, selectedIndex, onChange }) {
  const translations = useTranslations();

  return (
    <div className="flex justify-center">
      <div className="flex">
        {options.map(({ translationKey }, index) => (
          <div key={index} onClick={() => onChange(index)} className="mr-4">
            <label
              className={`block p-4 text-center border-b-2  cursor-pointer hover:bg-indigo-100 transition duration-300 ${
                selectedIndex == index ? "border-indigo-500" : ""
              }`}
            >
              {translations(translationKey)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
