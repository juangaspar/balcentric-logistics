import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";

import Header from ".";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(() => ({})),
    usePathname: jest.fn(() => ({})),
    useParams: jest.fn(() => ({ locale: "es" })),
    useSearchParams: jest.fn(() => ({})),
  };
});

jest.mock("@/utils/constants", () => {
  return {
    LOCALES: ["es", "en", "de"],
  };
});

describe("Header component", () => {
  test("Title is rendered", () => {
    const { queryAllByText } = render(<Header />);

    expect(queryAllByText("Baltricen logistics")).toHaveLength(1);
  });

  test("Links are rendered properly", () => {
    const { queryAllByText } = render(<Header />);

    expect(queryAllByText("ES")).toHaveLength(0);
    expect(queryAllByText("DE")).toHaveLength(1);
    expect(queryAllByText("EN")).toHaveLength(1);
  });
});
