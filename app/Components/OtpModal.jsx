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
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const OtpModal = ({ email, onVerified, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleOpenChange = (open) => {
    if (isVerifying) return; // Prevent closing while verifying
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "verify", 
          email: email.trim(), 
          otp: otp.trim() 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", data.token);
        
        toast.success("OTP verified successfully!", { 
          id: "otp-verification",
          duration: 2000 
        });

        // Call onVerified callback with token
        if (onVerified) {
          onVerified(data.token);
        }

        // Close modal after success
        setTimeout(() => {
          setIsOpen(false);
        }, 500);
      } else {
        // Show error message from server
        toast.error(data.message || "Invalid OTP. Please try again.", { 
          id: "otp-verification" 
        });
        // Clear OTP input on error
        setOtp("");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Network error. Please check your connection and try again.", { 
        id: "otp-verification" 
      });
      setOtp("");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle OTP change
  const handleOtpChange = (value) => {
    setOtp(value);
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6 && !isVerifying) {
      // Small delay to show the last digit before submitting
      setTimeout(() => {
        handleSubmitWithValue(value);
      }, 100);
    }
  };

  // Helper function to submit with a specific OTP value
  const handleSubmitWithValue = async (otpValue) => {
    if (otpValue.length !== 6 || isVerifying) return;

    setIsVerifying(true);

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "verify", 
          email: email.trim(), 
          otp: otpValue.trim() 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        
        toast.success("OTP verified successfully!", { 
          id: "otp-verification",
          duration: 2000 
        });

        if (onVerified) {
          onVerified(data.token);
        }

        setTimeout(() => {
          setIsOpen(false);
        }, 500);
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.", { 
          id: "otp-verification" 
        });
        setOtp("");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Network error. Please try again.", { 
        id: "otp-verification" 
      });
      setOtp("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setCanResend(false);

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("New OTP sent to your email!");
        setOtp(""); // Clear current OTP input
        setResendCountdown(60); // Reset countdown
      } else {
        toast.error(data.message || "Failed to resend OTP");
        setCanResend(true); // Allow retry
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Network error. Please try again.");
      setCanResend(true); // Allow retry
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-lg rounded-lg p-0 overflow-hidden border-0 shadow-xl">
        <div className="bg-white p-6 sm:p-8">
          <AlertDialogHeader className="relative mb-6">
            {/* Close button */}
            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                onClick={() => handleOpenChange(false)}
                disabled={isVerifying}
                aria-label="Close"
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
                  />
                </svg>
              </button>
            </div>

            <AlertDialogTitle className="text-2xl font-bold text-center text-[#1E381E] mb-4 pr-8">
              Verify Your Identity
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-semibold text-[#1f6b1f] mt-1 inline-block">
                {email || "your email"}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* OTP Input */}
          <div className="flex justify-center mb-8">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={handleOtpChange}
              disabled={isVerifying}
            >
              <InputOTPGroup className="gap-3">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-14 text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#1f6b1f] focus:ring-2 focus:ring-[#1f6b1f] focus:ring-opacity-20 transition-all"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              className="w-full bg-[#1f6b1f] hover:bg-[#1c5f1c] text-white py-3 h-12 rounded-lg font-medium text-base shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isVerifying || otp.length !== 6}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Login"
              )}
            </Button>

            {/* Resend OTP */}
            <div className="text-center text-sm text-gray-600">
              Didn't receive the code?{" "}
              {canResend ? (
                <button
                  type="button"
                  className="text-[#1f6b1f] font-semibold hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={handleResendOtp}
                  disabled={isResending}
                >
                  {isResending ? "Sending..." : "Resend OTP"}
                </button>
              ) : (
                <span className="text-gray-500 font-medium">
                  Resend in {resendCountdown}s
                </span>
              )}
            </div>

            {/* Help text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Code expires in 10 minutes. Check your spam folder if you don't see it.
            </p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;