"use client";

import { useState, FormEvent } from "react";
import { generatePageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/constants";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const WEB3FORMS_KEY = "0734a7db-3a83-46bd-bd7b-03a4fe6073de";

const serviceOptions = [
  "Commercial Construction",
  "Project Management",
  "Engineering Services",
  "Construction Materials",
  "Renovation & Remodeling",
  "Architectural Services",
  "Other",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Header */}
      <section className="bg-surface-dark pt-32 pb-section-sm">
        <div className="container-main">
          <Reveal>
            <SectionLabel>Contact Us</SectionLabel>
            <h1 className="mt-4 text-display-lg font-heading text-text-inverse text-balance">
              Let&apos;s talk about{" "}
              <span className="gradient-text">your project</span>
            </h1>
            <p className="mt-6 text-body-lg text-text-inverse-secondary max-w-2xl">
              Whether you need a quote, want to discuss a project, or simply
              have a question — we&apos;re here to help. Reach out and
              we&apos;ll get back to you within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Reveal>
                <div className="space-y-6">
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-accent-600" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold">Email</h3>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-body-md text-accent-600 hover:text-accent-700 transition-colors"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="text-accent-600" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold">Phone</h3>
                        <a
                          href={`tel:${siteConfig.phoneRaw}`}
                          className="text-body-md text-accent-600 hover:text-accent-700 transition-colors"
                        >
                          {siteConfig.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-accent-600" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold">Location</h3>
                        <p className="text-body-md text-text-secondary">
                          {siteConfig.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-accent-600" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold">
                          Response Time
                        </h3>
                        <p className="text-body-md text-text-secondary">
                          Within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="card">
                  {status === "success" ? (
                    <div className="text-center py-12">
                      <CheckCircle
                        size={48}
                        className="text-green-500 mx-auto mb-4"
                      />
                      <h3 className="text-heading-lg font-heading">
                        Message Sent!
                      </h3>
                      <p className="mt-2 text-body-md text-text-secondary">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-accent-600 hover:text-accent-700 font-medium transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-body-sm font-medium mb-1.5"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body-md focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-body-sm font-medium mb-1.5"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body-md focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-body-sm font-medium mb-1.5"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body-md focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                            placeholder="061 234 5678"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-body-sm font-medium mb-1.5"
                          >
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body-md focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                            placeholder="Your company"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block text-body-sm font-medium mb-1.5"
                        >
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body-md focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-body-sm font-medium mb-1.5"
                        >
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body-md focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-none"
                          placeholder="Tell us about your project, timeline, and any specific requirements..."
                        />
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-red-600 text-body-sm">
                          <AlertCircle size={16} />
                          Something went wrong. Please try again or email us
                          directly.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent-500 hover:bg-accent-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold font-heading rounded-lg transition-colors focus-ring"
                      >
                        {status === "submitting" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
