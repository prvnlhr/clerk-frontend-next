"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GoogleIcon from "@/components/Common/Icons/GoogleIcon";
import Link from "next/link";
import Image from "next/image";
import adminAuthBanner from "../../../../../../public/banners/Auth/admin-auth.png";

// Simplified validation schema for sign-in
const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-[80%] md:h-[80%] h-[100%] w-[100%] flex flex-col md:flex-row">
        {/* LEFT SECTION: BANNER IMAGE */}
        <section className="relative w-[100%] h-[30vh] md:w-[60%] md:h-[100%] bg-[#E7F0FA] overflow-hidden rounded">
          {/* Image Container */}
          <div className="w-full h-full z-[1]">
            <Image
              src={adminAuthBanner}
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
              Welcome Back.
              <span className="block mt-2 text-2xl md:text-3xl font-semibold text-white/90">
                Access your talent tools and stay ahead.
              </span>
            </h1>
          </div>
        </section>

        {/* RIGHT SECTION: FORM CONTENT */}
        <section className="w-[100%] md:w-[40%] h-[70vh] md:h-[100%] px-[30px] md:py-[0px] py-[20px]">
          <div className="w-full h-[100%] flex flex-col justify-center">
            {/* Main heading */}
            <div className="w-full h-[40px] flex items-center">
              <h1 className="font-primary font-semibold text-2xl">Sign In as Admin</h1>
            </div>

            {/* SubHeading */}
            <div className="w-full h-[30px] flex items-center">
              <h2 className="font-primary text-sm font-medium font-secondary">
                Welcome back! Please enter your details
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full grid grid-rows-[80px_80px_30px_80px] grid-cols-[100%] py-[10px]"
            >
              {/* EMAIL INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#E4E5E8] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="john.doe@example.com"
                      type="email"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-medium placeholder:font-secondary"
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

              {/* PASSWORD INPUT GROUP */}
              <div className="w-[100%] h-[100%] flex flex-col">
                <div className="w-full h-[calc(100%-25px)] grid grid-rows-[40%_60%] border border-[#E4E5E8] rounded px-[5px] py-[5px]">
                  <label className="w-full h-full text-[0.7rem] scheme-font font-bold tracking-widest">
                    PASSWORD
                  </label>
                  <div className="w-full h-full">
                    <input
                      placeholder="••••••"
                      type="password"
                      className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-medium placeholder:font-secondary"
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

              {/* FORGOT PASSWORD */}
              <div className="w-[100%] h-[100%] flex items-center justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs scheme-font font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              {/* FORM BUTTON GROUP  */}
              <div className="w-[100%] h-[100%] flex flex-col items-center justify-evenly">
                <button
                  type="submit"
                  className="w-full h-[50%] flex items-center justify-center scheme-bg rounded"
                >
                  <p className="text-white text-sm">Sign In</p>
                </button>
                <div className="w-[100%] h-[50%] flex items-center justify-center">
                  <p className="text-xs font-medium font-secondary">
                    Don&apos;t have an account?
                    <Link
                      href={"/auth/admin/sign-up"}
                      className="scheme-font font-semibold ml-[5px]"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </form>

            {/* SOCIAL LOGIN */}
            <div className="w-full h-[80px] min-h-[80px] flex flex-col items-center">
              <div className="w-full h-[50%] flex items-center justify-evenly text-[0.7rem] font-medium">
                <span className="w-[40%] h-[1px] bg-black/10"></span> OR
                <span className="w-[40%] h-[1px] bg-black/10"></span>
              </div>
              <div className="w-full h-[50%] flex items-center justify-center">
                <button
                  type="button"
                  className="w-[auto] h-[85%] flex border border-[#E4E5E8] px-[30px] rounded"
                >
                  <div className="h-full aspect-square flex items-center p-[10px]">
                    <GoogleIcon />
                  </div>
                  <div className="h-full flex-1 flex items-center pr-[20px]">
                    <p className="text-xs font-medium">Google</p>
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

export default SignInPage;

