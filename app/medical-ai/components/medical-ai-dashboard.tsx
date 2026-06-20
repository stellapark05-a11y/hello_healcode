"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Finding = {
  label: string;
  score: number;
  level: "Low" | "Moderate" | "High";
  color: string;
  note: string;
};

type HeatSpot = {
  id: string;
  left: string;
  top: string;
  width: string;
  height: string;
  color: string;
  opacity: number;
};

const findings: Finding[] = [
  {
    label: "Mass",
    score: 82,
    level: "High",
    color: "#fb7185",
    note: "경계가 불명확한 결절 의심 패턴",
  },
  {
    label: "Calcification",
    score: 64,
    level: "Moderate",
    color: "#f59e0b",
    note: "국소 미세석회화 가능성",
  },
  {
    label: "Architectural Distortion",
    score: 41,
    level: "Moderate",
    color: "#38bdf8",
    note: "조직 왜곡 신호 약함",
  },
  {
    label: "Pneumonia / Opacity",
    score: 28,
    level: "Low",
    color: "#34d399",
    note: "폐야 음영 변화 낮음",
  },
];

const heatSpots: HeatSpot[] = [
  {
    id: "mass-focus",
    left: "57%",
    top: "38%",
    width: "23%",
    height: "28%",
    color: "rgba(251, 113, 133, 0.72)",
    opacity: 0.86,
  },
  {
    id: "calcification-focus",
    left: "43%",
    top: "55%",
    width: "15%",
    height: "16%",
    color: "rgba(245, 158, 11, 0.62)",
    opacity: 0.74,
  },
  {
    id: "opacity-focus",
    left: "31%",
    top: "35%",
    width: "17%",
    height: "22%",
    color: "rgba(56, 189, 248, 0.52)",
    opacity: 0.58,
  },
];

const caseMetrics = [
  ["Modality", "Mammography / CXR"],
  ["AI Model", "DemoNet-RX v0.9"],
  ["Processing", "1.8 sec"],
  ["Confidence", "High variance"],
];

export function MedicalAiDashboard() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No image uploaded");
  const [heatmapEnabled, setHeatmapEnabled] = useState(true);
  const [activeFinding, setActiveFinding] = useState(findings[0].label);

  const activeScore = useMemo(
    () => findings.find((finding) => finding.label === activeFinding) ?? findings[0],
    [activeFinding],
  );

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);
    setImageUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }

      return URL.createObjectURL(file);
    });
  }

  return (
    <main className="min-h-screen bg-[#eef3f7] text-[#102030]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
              Medical Imaging AI Simulation
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              흉부 X-ray 및 유방촬영술 AI 분석 대시보드
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              업로드한 의료 영상 위에 가상의 병변 의심 히트맵을 표시하고, Mass,
              Calcification 등 타겟 질환별 AI Score를 시각화합니다.
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 lg:max-w-sm">
            데모 목적의 시뮬레이션 UI입니다. 실제 진단, 판독, 치료 결정에 사용할 수
            없으며 임상 판단은 의료 전문가가 수행해야 합니다.
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[320px_minmax(0,1fr)_360px]">
        <aside className="space-y-5">
          <UploadPanel
            fileName={fileName}
            heatmapEnabled={heatmapEnabled}
            onHeatmapChange={setHeatmapEnabled}
            onUpload={handleUpload}
          />
          <CaseSummary />
        </aside>

        <ImageViewer
          activeFinding={activeFinding}
          heatmapEnabled={heatmapEnabled}
          imageUrl={imageUrl}
        />

        <aside className="space-y-5">
          <ScoreGauge finding={activeScore} />
          <FindingsPanel
            activeFinding={activeFinding}
            findings={findings}
            onSelect={setActiveFinding}
          />
        </aside>
      </section>
    </main>
  );
}

function UploadPanel({
  fileName,
  heatmapEnabled,
  onHeatmapChange,
  onUpload,
}: {
  fileName: string;
  heatmapEnabled: boolean;
  onHeatmapChange: (enabled: boolean) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Image Upload</h2>
          <p className="mt-1 text-sm text-slate-500">DICOM 대신 PNG/JPG 데모 입력</p>
        </div>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
          SIM
        </span>
      </div>

      <label className="mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center transition hover:border-cyan-500 hover:bg-cyan-50/60">
        <input
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={onUpload}
          type="file"
        />
        <span className="text-3xl text-cyan-700">+</span>
        <span className="mt-2 text-sm font-semibold text-slate-900">이미지 선택</span>
        <span className="mt-1 max-w-52 truncate text-xs text-slate-500">{fileName}</span>
      </label>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Heatmap overlay</p>
          <p className="text-xs text-slate-500">병변 의심 영역 표시</p>
        </div>
        <button
          aria-pressed={heatmapEnabled}
          className={`relative h-7 w-12 rounded-full transition ${
            heatmapEnabled ? "bg-cyan-600" : "bg-slate-300"
          }`}
          onClick={() => onHeatmapChange(!heatmapEnabled)}
          type="button"
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
              heatmapEnabled ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    </section>
  );
}

function CaseSummary() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Case Summary</h2>
      <div className="mt-4 space-y-3">
        {caseMetrics.map(([label, value]) => (
          <div className="flex items-center justify-between gap-4 text-sm" key={label}>
            <span className="text-slate-500">{label}</span>
            <span className="font-semibold text-slate-900">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-200">
        Simulated triage: <span className="font-semibold text-rose-300">Review suggested</span>
      </div>
    </section>
  );
}

function ImageViewer({
  activeFinding,
  heatmapEnabled,
  imageUrl,
}: {
  activeFinding: string;
  heatmapEnabled: boolean;
  imageUrl: string | null;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-950 p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Image Analysis View</h2>
          <p className="text-sm text-slate-400">Active target: {activeFinding}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Model ready
        </div>
      </div>

      <div className="relative grid min-h-[560px] place-items-center overflow-hidden rounded-lg border border-slate-800 bg-[#080d14]">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Uploaded medical scan preview"
            className="max-h-[680px] w-full object-contain"
            src={imageUrl}
          />
        ) : (
          <SampleRadiograph />
        )}

        {heatmapEnabled ? (
          <div className="pointer-events-none absolute inset-0">
            {heatSpots.map((spot) => (
              <span
                className="absolute rounded-full blur-xl mix-blend-screen"
                key={spot.id}
                style={{
                  background: `radial-gradient(circle, ${spot.color} 0%, rgba(255,255,255,0.08) 36%, transparent 72%)`,
                  height: spot.height,
                  left: spot.left,
                  opacity: spot.opacity,
                  top: spot.top,
                  transform: "translate(-50%, -50%)",
                  width: spot.width,
                }}
              />
            ))}
            <div className="absolute left-[57%] top-[38%] h-[28%] w-[23%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-300/80" />
          </div>
        ) : null}

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-950/78 px-4 py-3 text-xs text-slate-300 backdrop-blur">
          <span>Window: lung / breast soft tissue</span>
          <span>Overlay opacity: {heatmapEnabled ? "86%" : "0%"}</span>
          <span>Series: simulated preview</span>
        </div>
      </div>
    </section>
  );
}

function SampleRadiograph() {
  return (
    <svg
      aria-label="Sample radiograph placeholder"
      className="h-full min-h-[560px] w-full"
      role="img"
      viewBox="0 0 760 680"
    >
      <defs>
        <radialGradient cx="50%" cy="38%" id="scanGlow" r="58%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.72" />
          <stop offset="52%" stopColor="#1e293b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020617" stopOpacity="1" />
        </radialGradient>
        <filter id="softNoise">
          <feTurbulence baseFrequency="0.9" numOctaves="2" seed="7" type="fractalNoise" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA slope="0.08" type="linear" />
          </feComponentTransfer>
          <feBlend in2="SourceGraphic" mode="screen" />
        </filter>
      </defs>
      <rect fill="#020617" height="680" width="760" />
      <ellipse cx="380" cy="344" fill="url(#scanGlow)" filter="url(#softNoise)" rx="265" ry="300" />
      <path
        d="M355 110 C330 190 328 275 350 380 C365 450 365 530 345 610"
        fill="none"
        stroke="#dbeafe"
        strokeOpacity="0.32"
        strokeWidth="18"
      />
      <path
        d="M405 110 C430 190 432 275 410 380 C395 450 395 530 415 610"
        fill="none"
        stroke="#dbeafe"
        strokeOpacity="0.28"
        strokeWidth="18"
      />
      <ellipse cx="278" cy="345" fill="#dbeafe" opacity="0.16" rx="112" ry="210" />
      <ellipse cx="482" cy="345" fill="#dbeafe" opacity="0.16" rx="112" ry="210" />
      <path
        d="M205 205 C286 237 327 315 316 464"
        fill="none"
        stroke="#e0f2fe"
        strokeOpacity="0.16"
        strokeWidth="12"
      />
      <path
        d="M555 205 C474 237 433 315 444 464"
        fill="none"
        stroke="#e0f2fe"
        strokeOpacity="0.16"
        strokeWidth="12"
      />
      <text fill="#94a3b8" fontSize="18" x="34" y="48">
        Upload mammography or chest X-ray image
      </text>
      <text fill="#64748b" fontSize="14" x="34" y="72">
        Synthetic placeholder, not patient data
      </text>
    </svg>
  );
}

function ScoreGauge({ finding }: { finding: Finding }) {
  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (finding.score / 100) * circumference;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">Primary AI Score</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {finding.level}
        </span>
      </div>

      <div className="mt-5 grid place-items-center">
        <div className="relative h-40 w-40">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              fill="none"
              r="58"
              stroke="#e2e8f0"
              strokeWidth="14"
            />
            <circle
              cx="70"
              cy="70"
              fill="none"
              r="58"
              stroke={finding.color}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="14"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-4xl font-semibold text-slate-950">{finding.score}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                AI Score
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        {finding.label}: {finding.note}
      </p>
    </section>
  );
}

function FindingsPanel({
  activeFinding,
  findings,
  onSelect,
}: {
  activeFinding: string;
  findings: Finding[];
  onSelect: (label: string) => void;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Target Findings</h2>
      <div className="mt-4 space-y-3">
        {findings.map((finding) => (
          <button
            className={`w-full rounded-lg border p-3 text-left transition ${
              activeFinding === finding.label
                ? "border-cyan-500 bg-cyan-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
            key={finding.label}
            onClick={() => onSelect(finding.label)}
            type="button"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-950">{finding.label}</span>
              <span className="text-sm font-semibold" style={{ color: finding.color }}>
                {finding.score}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <span
                className="block h-full rounded-full"
                style={{
                  backgroundColor: finding.color,
                  width: `${finding.score}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">{finding.note}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
