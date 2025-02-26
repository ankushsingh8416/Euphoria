"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const OtpModal = ({ email, onVerified, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);

      try {
        const response = await fetch("/api/otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "verify",
            email,
            otp,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store JWT token in localStorage or cookies
          if (data.token) {
            localStorage.setItem("authToken", data.token);
            toast.success("Login successful!");

            if (onVerified) {
              onVerified(data.token);
            }
            setIsOpen(false);
          }
        } else {
          toast.error(data.message || "Verification failed");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Something went wrong");
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);

    // Auto-submit when OTP is complete
    if (value.length === 6) {
      handleSubmit();
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "send",
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP resent to your email!");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Something went wrong");
    }

    // Disable resend button for 30 seconds
    setTimeout(() => setResendDisabled(false), 30000);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-lg rounded-lg p-0 overflow-hidden border-0 shadow-xl">
        <div className="bg-white p-6 sm:p-8">
          <AlertDialogHeader className="relative mb-6">
            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleOpenChange(false)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center text-[#1E381E] mb-4">
              Enter Your OTP
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600">
              We've sent a verification code to
              <br />
              <span className="font-medium text-[#1f6b1f]">
                {email || "your email"}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center mb-8">
            <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
              <InputOTPGroup className="shad-otp space-x-4 p-2 rounded-md">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="shad-otp-slot border border-gray-900 rounded-md p-2"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="space-y-4">
            <Button
              className="w-full bg-[#1f6b1f] hover:bg-[#1c5f1c] text-white py-3 h-12 rounded-md font-medium text-base shadow-sm transition-colors"
              onClick={handleSubmit}
              disabled={isVerifying || otp.length !== 6}
            >
              {isVerifying ? "Verifying..." : "Verify & Login"}
            </Button>
            <div className="text-center text-sm text-gray-600">
              Didn't receive a code?{" "}
              <button
                type="button"
                className="text-[#1f6b1f] font-medium hover:underline focus:outline-none"
                onClick={handleResendOtp}
                disabled={resendDisabled}
              >
                {resendDisabled ? "Wait 30s..." : "Click to resend"}
              </button>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
