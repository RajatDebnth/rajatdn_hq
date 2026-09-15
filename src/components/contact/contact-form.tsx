import { Button } from "@/components/ui/button";

const inputStyles = "mt-2 min-h-11 w-full rounded-[var(--radius-sm)] border border-[var(--control-line)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60";

export function ContactForm({ endpoint }: { endpoint: string | null }) {
  const configured = Boolean(endpoint);
  return <form action={endpoint ?? undefined} method="post" className="mt-8" aria-describedby="contact-form-status contact-privacy-note">
    <fieldset disabled={!configured} className="space-y-6">
      <legend className="sr-only">Technical conversation request</legend>
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label className="block font-medium" htmlFor="contact-name">Name <span aria-hidden="true">*</span></label><input className={inputStyles} autoComplete="name" id="contact-name" maxLength={120} minLength={2} name="name" required type="text" /></div>
        <div><label className="block font-medium" htmlFor="contact-email">Email <span aria-hidden="true">*</span></label><input className={inputStyles} autoComplete="email" id="contact-email" maxLength={254} name="email" required type="email" /></div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label className="block font-medium" htmlFor="contact-company">Company <span className="text-sm text-[var(--muted)]">(optional)</span></label><input className={inputStyles} autoComplete="organization" id="contact-company" maxLength={160} name="company" type="text" /></div>
        <div><label className="block font-medium" htmlFor="contact-topic">Topic <span aria-hidden="true">*</span></label><select className={inputStyles} defaultValue="" id="contact-topic" name="topic" required><option disabled value="">Select a topic</option><option value="production-ai">Production AI system</option><option value="industrial-data">Industrial data and infrastructure</option><option value="deployment">Deployment and MLOps</option><option value="architecture">Architecture discussion</option><option value="other">Other technical topic</option></select></div>
      </div>
      <div><label className="block font-medium" htmlFor="contact-message">Message <span aria-hidden="true">*</span></label><p className="mt-1 text-sm text-[var(--muted)]" id="message-hint">Describe the problem, decision, constraints, and the kind of conversation you have in mind. Do not include confidential data.</p><textarea aria-describedby="message-hint" className={`${inputStyles} min-h-44 resize-y`} id="contact-message" maxLength={5000} minLength={20} name="message" required rows={7} /></div>
      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input autoComplete="off" id="contact-website" name="website" tabIndex={-1} type="text" /></div>
      <Button type="submit">Send technical inquiry</Button>
    </fieldset>
    <p className="mt-4 text-sm leading-6 text-[var(--muted)]" id="contact-form-status">{configured ? "Submitting this form sends your information directly to the configured external form provider. The provider may show its own confirmation page." : "Form submission is not enabled yet because no verified form provider has been configured."}</p>
  </form>;
}
