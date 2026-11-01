import { describe, expect, it } from "vitest";

import { checks, firstName, trimValues, validate } from "@/lib/contact";

describe("contact checks", () => {
  it("needs a name", () => {
    expect(checks.name("   ")).toBe("enter your name");
    expect(checks.name("Sam")).toBe("");
  });

  it("needs an email like name@company.com", () => {
    expect(checks.email("sam@company")).toBe(
      "enter an email like name@company.com",
    );
    expect(checks.email("sam @company.com")).not.toBe("");
    expect(checks.email(" sam@company.com ")).toBe("");
  });

  it("needs a message of 10 characters or more", () => {
    expect(checks.message("Hi")).toBe(
      "write a little more (10 characters or more)",
    );
    expect(checks.message("  123456789  ")).not.toBe("");
    expect(checks.message("1234567890")).toBe("");
  });

  it("validates every field at once", () => {
    expect(validate({ name: "", email: "x", message: "hi" })).toEqual({
      name: "enter your name",
      email: "enter an email like name@company.com",
      message: "write a little more (10 characters or more)",
    });
    expect(
      validate({
        name: "Sam",
        email: "sam@company.com",
        message: "Hello there!",
      }),
    ).toEqual({});
  });

  it("trims values and picks the first name", () => {
    expect(
      trimValues({ name: " Sam Cruz ", email: " a@b.co ", message: " hi " }),
    ).toEqual({ name: "Sam Cruz", email: "a@b.co", message: "hi" });
    expect(firstName("  Sam   Cruz ")).toBe("Sam");
  });
});
