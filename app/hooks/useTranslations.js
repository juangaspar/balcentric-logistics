"use client";
import { useParams } from "next/navigation";
import messages from "@/utils/messages";

export default function useTranslations() {
  const { locale } = useParams();

  return (key) => messages[locale][key] || `<${key}>`;
}
