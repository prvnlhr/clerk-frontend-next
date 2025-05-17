"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GoogleIcon from "@/components/Common/Icons/GoogleIcon";
import Link from "next/link";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import signUpBanner from "../../../../../../public/banners/Auth/sign-up-banner.png";
import Image from "next/image";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .regex(/^[a-zA-Z]+$/, "First name should only contain letters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .regex(/^[a-zA-Z]+$/, "Last name should only contain letters"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(5, "Enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-[80%] md:h-[80%] h-[100%] w-[100%] flex flex-col md:flex-row">
        {/* LEFT SECTION : BANNER IMAGE */}
        <section className="relative w-[100%] h-[30vh] md:w-[60%] md:h-[100%] bg-[#E7F0FA] overflow-hidden rounded">
          {/* Image Container */}
          <div className="w-full h-full z-[1]">
            <Image
              src={signUpBanner}
              fill={true}
              alt="sign-up-banner"
              className="object-cover"
              priority
            />
          </div>

          {/* Color Overlay with Gradient */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#131776]/90 via-[#131776]/50 to-[#131776]/0" />

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Your next Career Move starts Here.
              <span className="block mt-2 text-2xl md:text-3xl font-semibold text-white/90">
                Sign Up to explore opportunity
              </span>
            </h1>
          </div>
        </section>

        {/* RIGHT SECTION: FORM CONTENT */}
        <section className="w-[100%] md:w-[40%] h-[70vh] md:h-[100%] px-[30px] md:py-[0px] py-[20px]">
          <div className="w-full h-full flex flex-col">
            {/* Main heading */}
            <div className="w-full h-[40px] flex items-center">
              <h1 className="font-primary font-semibold text-2xl">Sign Up.</h1>
            </div>

            {/* SubHeading */}
            <div className="w-full h-[30px] flex items-start">
              <h2 className="font-primary text-sm font-medium font-secondary">
                Let&apos;s create a account for you
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex-1 grid grid-rows-[21%_21%_21%_21%_16%] grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-600"
            >
              {/* FIRST NAME INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col col-span-1">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#D6DDEB] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    FIRST NAME
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="John"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                      {...register("firstName")}
                    />
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {errors.firstName && (
                    <p className="text-[0.7rem] danger-red whitespace-nowrap font-medium">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* LAST NAME INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col col-span-1 ">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#D6DDEB] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    LAST NAME
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="Doe"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                      {...register("lastName")}
                    />
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {errors.lastName && (
                    <p className="text-[0.7rem] danger-red whitespace-nowrap font-medium">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col col-span-2">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#D6DDEB] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="john.doe@example.com"
                      type="email"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {errors.email && (
                    <p className="text-[0.7rem] danger-red whitespace-nowrap font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* PHONE INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col col-span-2">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#D6DDEB] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    PHONE NUMBER
                  </label>
                  <div className="w-full h-full flex items-center">
                    <PhoneInput
                      defaultCountry="in"
                      placeholder="Enter phone number"
                      value={watch("phone")}
                      onChange={(phone) => setValue("phone", phone)}
                      inputStyle={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        border: "none",
                      }}
                      className="w-full h-full items-center"
                      countrySelectorStyleProps={{
                        buttonStyle: {
                          height: "100%",
                          paddingRight: "5px",
                          border: "none",
                          borderRight: "1px solid #D6DDEB",
                        },
                        flagStyle: {
                          height: "18px",
                        },
                        buttonClassName: "flex items-center",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {errors.phone && (
                    <p className="text-[0.7rem] danger-red whitespace-nowrap font-medium">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* PASSWORD INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col col-span-1">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#D6DDEB] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    PASSWORD
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="••••••"
                      type="password"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                      {...register("password")}
                    />
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {errors.password && (
                    <p className="text-[0.7rem] danger-red whitespace-nowrap font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* CONFIRM PASSWORD INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col col-span-1">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#D6DDEB] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    CONFIRM PASSWORD
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="••••••"
                      type="password"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                      {...register("confirmPassword")}
                    />
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {errors.confirmPassword && (
                    <p className="text-[0.7rem] danger-red whitespace-nowrap font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* FORM BUTTON GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col items-center justify-evenly col-span-2">
                <button
                  type="submit"
                  className="w-full h-[60%] flex items-center justify-center scheme-bg rounded"
                >
                  <p className="text-white text-sm">Sign Up</p>
                </button>
                <div className="w-[100%] h-[40%] flex items-center justify-center">
                  <p className="text-xs font-medium font-secondary">
                    Already have an account?
                    <Link
                      href={"/auth/user/sign-in"}
                      className="scheme-font font-semibold ml-[5px]"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>

            {/* FOOTER: SOCIAL LOGIN BUTTON */}
            <div className="w-full h-[80px] min-h-[80px] flex flex-col items-center">
              <div className="w-full h-[50%] flex items-center justify-evenly text-[0.7rem] font-medium">
                <span className="w-[40%] h-[0.03rem] bg-black/10"></span> OR
                <span className="w-[40%] h-[0.03rem] bg-black/10"></span>
              </div>
              <div className="w-full h-[50%] flex items-center justify-center">
                <button
                  type="button"
                  className="w-[auto] h-[85%] flex border border-[#D6DDEB] px-[30px] rounded"
                >
                  <div className="h-full aspect-square flex items-center p-[10px]">
                    <GoogleIcon />
                  </div>
                  <div className="h-full flex-1 flex items-center pr-[20px]">
                    <p className="text-xs font-medium">Continue with Google</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUpPage;
