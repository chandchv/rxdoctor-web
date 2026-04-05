export type GalleryFeature = {
  slug: string;
  title: string;
  image: string;
  tagline: string;
  summary: string;
  highlights: { title: string; description: string }[];
  metrics: { label: string; value: string }[];
  cta?: { label: string; href: string };
};

export const galleryFeatures: GalleryFeature[] = [
  {
    slug: 'doctor-dashboard',
    title: 'Unified Doctor Dashboard',
    image: '/imgs/Dashboard-Doctor.webp',
    tagline: 'Clinical + operational KPIs in a single cockpit',
    summary:
      'Combines the stabilized routing from CLINICAL_DASHBOARD_FIXES.md with the role-based views introduced in CLINICAL_RECORDS_DASHBOARD_SOLUTION.md so doctors see records, pending reviews, and processing stats without context switching.',
    highlights: [
      {
        title: 'Role-aware routing',
        description:
          'Automatic redirect to doctor dashboards with namespace-safe URLs prevents auth loops and keeps the experience fast.',
      },
      {
        title: 'Processing telemetry',
        description:
          'Surface record type distribution, OCR queues, and share-token activity in one glance for better follow-up.',
      },
      {
        title: 'Quick actions',
        description:
          'Launch new records, review pending documents, or jump into the clinical records service directly from the hero widgets.',
      },
    ],
    metrics: [
      { label: 'Dashboards stabilized', value: '5 roles' },
      { label: 'Redirect issues fixed', value: '100%' },
      { label: 'KPIs surfaced', value: '15+' },
    ],
    cta: { label: 'Explore clinical dashboards', href: '/symptom-checker' },
  },
  {
    slug: 'prescription-template',
    title: 'Smart Prescription Composer',
    image: '/imgs/Prescription-Template.webp',
    tagline: 'Letterhead-ready scripts with automated delivery hooks',
    summary:
      'Based on PRESCRIPTION_DELIVERY_QUICKSTART.md, physicians can generate branded prescriptions that automatically trigger email and WhatsApp fulfillment once saved.',
    highlights: [
      {
        title: 'Template management',
        description:
          'Switch between digital and letterhead layouts, prefill clinic branding, and capture dosage logic consistently.',
      },
      {
        title: 'Delivery toggles',
        description:
          'Choose whether to attach PDFs, send WhatsApp notifications, or email summaries straight from the composer UI.',
      },
      {
        title: 'Twilio-ready meta',
        description:
          'All outbound metadata (doctor, patient, medicine list) aligns with the WhatsApp service contract for instant notifications.',
      },
    ],
    metrics: [
      { label: 'Channels automated', value: 'Email + WhatsApp' },
      { label: 'PDF outputs', value: 'Digital / Letterhead' },
      { label: 'Delivery config time', value: '< 5 min' },
    ],
    cta: { label: 'See delivery setup', href: 'https://docs.twilio.com' },
  },
  {
    slug: 'prescription-delivery',
    title: 'Multi-Channel Prescription Delivery',
    image: '/imgs/Prescription-finished.webp',
    tagline: 'Patients receive PDFs, links, and in-app alerts instantly',
    summary:
      'Extends the prescription workflow so that every finalized script triggers HTML emails, WhatsApp links, and in-app notifications as detailed in PRESCRIPTION_DELIVERY_QUICKSTART.md.',
    highlights: [
      {
        title: 'Email templates',
        description:
          'Responsive HTML emails embed dosage instructions, PDF attachments, and portal links for immediate access.',
      },
      {
        title: 'WhatsApp notifications',
        description:
          'Uses Twilio sandbox or production numbers to push download links and doctor details directly to the patient.',
      },
      {
        title: 'Audit-friendly logs',
        description:
          'Each delivery path logs success/failure so clinics can prove prescriptions were shared with the patient.',
      },
    ],
    metrics: [
      { label: 'Delivery latency', value: '< 10s' },
      { label: 'Notification paths', value: '3' },
      { label: 'Setup steps', value: '6' },
    ],
  },
  {
    slug: 'patient-appointments',
    title: 'Patient Appointments Hub',
    image: '/imgs/Patient-Appointments.webp',
    tagline: 'Patients track bookings, reminders, and visit summaries',
    summary:
      'Combines the refined slot APIs from doctor_availability_refinement_complete.md with patient-friendly reminders so upcoming visits stay organized.',
    highlights: [
      {
        title: 'Live slot sync',
        description:
          'Patient timelines mirror the same slot generation logic doctors use, so availability and bookings stay in sync.',
      },
      {
        title: 'Reminder intelligence',
        description:
          '24-hour advance notice and quick-tap confirmation keep no-shows low while honoring clinic business rules.',
      },
      {
        title: 'Visit context',
        description:
          'Appointments link back to prescriptions, labs, and clinical notes to reduce “what’s next?” friction.',
      },
    ],
    metrics: [
      { label: 'Booking sources', value: 'Web + App' },
      { label: 'Reminder window', value: '24 hrs' },
      { label: 'Cancellation rules', value: 'Clinic-defined' },
    ],
  },
  {
    slug: 'patient-schedule',
    title: 'Smart Scheduling Console',
    image: '/imgs/Patient Schedule appt.webp',
    tagline: 'Drag-and-drop calendar powered by refined slot logic',
    summary:
      'Visualizes the slot generation tools from doctor_availability_refinement_complete.md, letting admins bulk-create, adjust, or blackout availability in seconds.',
    highlights: [
      {
        title: 'Quick generation',
        description:
          'Buttons for Today, This Week, and Next 30 Days invoke the `generate_slots_quick` API for instant coverage.',
      },
      {
        title: 'Leave awareness',
        description:
          'UI reflects leave requests, holiday calendars, and lunch breaks enforced by backend helpers.',
      },
      {
        title: 'Mobile parity',
        description:
          'The same refined APIs back the mobile app so front-desk teams and doctors never double book.',
      },
    ],
    metrics: [
      { label: 'Default slot size', value: '30 min' },
      { label: 'Working hours', value: '09:00 - 17:00' },
      { label: 'Quick actions', value: '3 presets' },
    ],
  },
  {
    slug: 'patient-dashboard',
    title: 'Patient Engagement Dashboard',
    image: '/imgs/Patient-Dashboard.webp',
    tagline: 'All clinical records, requests, and shares in one place',
    summary:
      'Built on the patient dashboard blueprint in CLINICAL_RECORDS_DASHBOARD_SOLUTION.md so individuals can view documents, track shares, and request new records securely.',
    highlights: [
      {
        title: 'Record timeline',
        description:
          'Recent uploads, shared documents, and health visualizations appear on a single responsive canvas.',
      },
      {
        title: 'Self-service requests',
        description:
          'Patients can trigger new record requests and monitor fulfillment status without calling the clinic.',
      },
      {
        title: 'Privacy controls',
        description:
          'Links directly to the Clinical Records privacy settings so patients manage consent and data sharing.',
      },
    ],
    metrics: [
      { label: 'Dashboards', value: 'Doctor / Patient / Lab / Admin / Institution' },
      { label: 'Share tokens', value: 'Tracked live' },
      { label: 'Request actions', value: '3+' },
    ],
  },
  {
    slug: 'patient-health-records',
    title: 'Clinical Records Vault',
    image: '/imgs/PAtient-HealthRecords.webp',
    tagline: 'Searchable, categorized, and shareable patient documents',
    summary:
      'Highlights the search, upload, and categorization flows documented in CLINICAL_RECORDS_USER_SYSTEM.md, giving patients full control over their files.',
    highlights: [
      {
        title: 'Granular roles',
        description:
          'Supports providers, patients, labs, and auditors with tailored permissions and audit trails.',
      },
      {
        title: 'Advanced metadata',
        description:
          'License tracking, privacy settings, and notification preferences travel with each user and record.',
      },
      {
        title: 'Security-first',
        description:
          'Two-factor readiness, account lockouts, and HIPAA-compliant logging protect every access.',
      },
    ],
    metrics: [
      { label: 'User types', value: '10+' },
      { label: 'Security controls', value: '2FA + lockouts' },
      { label: 'Org support', value: 'Hospitals, labs, clinics' },
    ],
  },
  {
    slug: 'patient-labtests',
    title: 'Lab & Diagnostics Workspace',
    image: '/imgs/Patient-Labtests.webp',
    tagline: 'Monitor lab queues, previews, and completed reports',
    summary:
      'Mirrors the lab dashboard described in CLINICAL_RECORDS_DASHBOARD_SOLUTION.md with document processing queues, completed reports, and lab-specific analytics.',
    highlights: [
      {
        title: 'Processing queues',
        description:
          'Lab technicians review uploads, manage DICOM previews, and oversee completion stats in one view.',
      },
      {
        title: 'Integration-ready',
        description:
          'Supports email and SFTP ingestion so labs can push PDFs and imaging straight into the workflow.',
      },
      {
        title: 'Compliance visibility',
        description:
          'Audit logs, accreditation data, and multi-organization filters ensure each report is traceable.',
      },
    ],
    metrics: [
      { label: 'Ingestion modes', value: 'Email + SFTP + API' },
      { label: 'Preview formats', value: 'PDF, images, DICOM' },
      { label: 'Queue widgets', value: '3+' },
    ],
  },
  {
    slug: 'patient-prescriptions',
    title: 'Prescription History Center',
    image: '/imgs/Patient-PRescriptions.webp',
    tagline: 'Patients revisit every script, note, and delivery event',
    summary:
      'Extends the delivery service from PRESCRIPTION_DELIVERY_QUICKSTART.md so patients can re-download PDFs, review WhatsApp links, and confirm fulfillment.',
    highlights: [
      {
        title: 'Channel receipts',
        description:
          'Shows when email, WhatsApp, and in-app notices were issued, making pharmacy follow-ups simple.',
      },
      {
        title: 'Download locker',
        description:
          'Patients can pull the latest PDF or switch between digital and letterhead variants without contacting the clinic.',
      },
      {
        title: 'Medication context',
        description:
          'Each entry surfaces dosage plans, frequency, and doctor notes so instructions never get lost.',
      },
    ],
    metrics: [
      { label: 'Delivery logs retained', value: 'Yes' },
      { label: 'Supported formats', value: 'PDF + HTML summary' },
      { label: 'Notification types', value: '3' },
    ],
  },
];

