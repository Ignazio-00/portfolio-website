import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

// Environment variables for EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  requestResume: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    requestResume: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error(
        "EmailJS configuration missing. Please check environment variables."
      );
      console.error(
        "Make sure you have a .env file in your project root with:"
      );
      console.error("REACT_APP_EMAILJS_SERVICE_ID=your_service_id");
      console.error("REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id");
      console.error("REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        request_resume: formData.requestResume ? "Yes" : "No",
        to_name: "Ignazio Balistreri",
        reply_to: formData.email,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitStatus("success");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        requestResume: false,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      console.error("Error details:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "ignazio.balistreri@code.berlin",
      href: "mailto:ignazio.balistreri@code.berlin",
      description: "Send me an email",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Berlin, Germany",
      href: null,
      description: "Currently based in",
    },
    {
      icon: <Clock size={20} />,
      label: "Response Time",
      value: "Within 24 hours",
      href: null,
      description: "I typically respond",
    },
  ];

  return (
    <section id="contact" className="section bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            <Mail size={16} />
            Get In Touch
          </div>

          <h2 className="font-display font-bold text-neutral-900 dark:text-white mb-6">
            Let's Work Together
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full mb-6"></div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to discuss new opportunities, collaborate on
            interesting projects, or simply connect with fellow developers. Drop
            me a message and let's build ⚡️.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                        {info.label}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        {info.description}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-neutral-900 dark:text-white font-medium">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="card p-6 bg-gradient-to-br from-success-50 to-primary-50 dark:from-success-950 dark:to-primary-950 border-success-200 dark:border-success-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="status-online"></div>
                <h4 className="font-semibold text-success-800 dark:text-success-200">
                  Available for Projects
                </h4>
              </div>
              <p className="text-sm text-success-700 dark:text-success-300 mb-4">
                I'm currently open to new freelance projects, working student
                opportunities, and exciting collaborations.
              </p>
              <p className="text-xs text-success-600 dark:text-success-400 italic">
                💼 Resume available upon request through the contact form
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Ignazio-00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/ignazio-balistreri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:ignazio.balistreri@code.berlin"
                  className="social-link"
                  aria-label="Send Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                Send a Message
              </h3>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 rounded-xl flex items-center gap-3">
                  <CheckCircle
                    size={20}
                    className="text-success-600 dark:text-success-400"
                  />
                  <div>
                    <p className="font-medium text-success-800 dark:text-success-200">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-success-700 dark:text-success-300">
                      Thank you for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
                  <AlertCircle
                    size={20}
                    className="text-red-600 dark:text-red-400"
                  />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">
                      Something went wrong
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Please try again or send me an email directly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.name ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.email ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.subject ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`form-textarea ${
                      errors.message ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Resume Request Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="requestResume"
                    name="requestResume"
                    checked={formData.requestResume}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary-600 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <label
                    htmlFor="requestResume"
                    className="text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    Please include your resume/CV in the response
                    <span className="block text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      I'll attach my latest resume when I reply to your message
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="animate-spin" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
