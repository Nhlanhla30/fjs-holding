import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-surface-dark">
      <div className="container-main text-center">
        <p className="text-[8rem] font-heading font-bold text-accent-500/20 leading-none select-none">
          404
        </p>
        <h1 className="mt-4 text-display-md font-heading text-text-inverse">
          Page Not Found
        </h1>
        <p className="mt-4 text-body-lg text-text-inverse-secondary max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button href="/" variant="primary" arrow>
            Back to Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
