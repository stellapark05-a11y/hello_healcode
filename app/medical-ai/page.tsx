import { MedicalAiDashboard } from "./components/medical-ai-dashboard";

export const metadata = {
  title: "Medical AI Simulation Dashboard | healcode",
  description:
    "Uploaded mammography or chest X-ray images with simulated AI score and heatmap overlays.",
};

export default function MedicalAiPage() {
  return <MedicalAiDashboard />;
}
