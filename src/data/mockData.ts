export interface MpKpiData {
  totalFunds: {
    amount: number;
    formatted: string;
    entitlement: string;
    utilizationRate: number;
    subtext: string;
  };
  activeProjects: {
    count: number;
    onSchedule: number;
    underReview: number;
    subtext: string;
  };
  stalledProjectsNearby: {
    count: number;
    neighboringDistricts: string[];
    potentialConvergenceAmt: string;
    subtext: string;
  };
  topImplementingAgency: {
    name: string;
    district: string;
    rating: number;
    onTimeRate: number;
    subtext: string;
  };
}

export const mockMpKpiData: MpKpiData = {
  totalFunds: {
    amount: 25000000,
    formatted: "₹ 2.50 Cr",
    entitlement: "₹ 5.00 Cr",
    utilizationRate: 50.0,
    subtext: "50% utilized of annual MPLADS allocation",
  },
  activeProjects: {
    count: 14,
    onSchedule: 9,
    underReview: 5,
    subtext: "Filtered by status != 'Completed'",
  },
  stalledProjectsNearby: {
    count: 3,
    neighboringDistricts: ["Visakhapatnam", "Vizianagaram", "Kakinada"],
    potentialConvergenceAmt: "₹ 23 Lakhs",
    subtext: "Eligible for inter-district convergence funding",
  },
  topImplementingAgency: {
    name: "Zilla Parishad, Vijayawada",
    district: "Vijayawada",
    rating: 4.8,
    onTimeRate: 94,
    subtext: "Highest rated IDA in the district",
  },
};

export interface SectorGapItem {
  sector: string;
  mp_spend: number;
  state_avg: number;
  gap_percentage: number;
  gap_amount_cr: number;
  isGapDetected: boolean;
}

export const mockSectorGapData: SectorGapItem[] = [
  {
    sector: "Education",
    mp_spend: 45,
    state_avg: 30,
    gap_percentage: 15,
    gap_amount_cr: 0.75,
    isGapDetected: false,
  },
  {
    sector: "Roads/Infra",
    mp_spend: 10,
    state_avg: 40,
    gap_percentage: -30,
    gap_amount_cr: -1.5,
    isGapDetected: true,
  },
  {
    sector: "Water Supply",
    mp_spend: 25,
    state_avg: 20,
    gap_percentage: 5,
    gap_amount_cr: 0.25,
    isGapDetected: false,
  },
  {
    sector: "Health",
    mp_spend: 20,
    state_avg: 10,
    gap_percentage: 10,
    gap_amount_cr: 0.5,
    isGapDetected: false,
  },
];

export interface BenchmarkItem {
  id: string;
  projectType: string;
  keywords: string[];
  medianCost: string;
  medianCostRaw: number;
  confidenceInterval: string;
  minRange: string;
  maxRange: string;
  warningThreshold: string;
  warningText: string;
  expectedTimeDays: number;
  recommendedAgency: string;
  semanticCluster: string;
  sampleSize: number;
}

export const mockBenchmarks: BenchmarkItem[] = [
  {
    id: "bm-ro-plant",
    projectType: "Water RO Plant",
    keywords: ["water", "ro", "plant", "tank", "drinking", "purifier", "filtration"],
    medianCost: "₹ 4.5 Lakhs",
    medianCostRaw: 450000,
    confidenceInterval: "₹ 3.0L – ₹ 6.0L",
    minRange: "₹ 3.0 Lakhs",
    maxRange: "₹ 6.0 Lakhs",
    warningThreshold: "₹ 6.0 Lakhs",
    warningText: "Any sanction above ₹6L will require special justification based on regional AI clustering.",
    expectedTimeDays: 120,
    recommendedAgency: "Rural Water Supply Dept.",
    semanticCluster: "Cluster #104 (Drinking Water Infrastructure)",
    sampleSize: 84,
  },
  {
    id: "bm-cc-road",
    projectType: "Cement Concrete (CC) Road (1 km)",
    keywords: ["road", "concrete", "cc", "paving", "infra", "connectivity", "highway", "street"],
    medianCost: "₹ 18.0 Lakhs",
    medianCostRaw: 1800000,
    confidenceInterval: "₹ 14.0L – ₹ 22.0L",
    minRange: "₹ 14.0 Lakhs",
    maxRange: "₹ 22.0 Lakhs",
    warningThreshold: "₹ 22.0 Lakhs",
    warningText: "Any sanction above ₹22L will trigger scrutiny for execution overruns.",
    expectedTimeDays: 180,
    recommendedAgency: "Panchayat Raj Engineering Dept.",
    semanticCluster: "Cluster #042 (Rural Road & Connectivity)",
    sampleSize: 132,
  },
  {
    id: "bm-community-hall",
    projectType: "Community Hall / Gram Panchayat Kendra",
    keywords: ["community", "hall", "kendra", "building", "panchayat", "bhawan"],
    medianCost: "₹ 32.0 Lakhs",
    medianCostRaw: 3200000,
    confidenceInterval: "₹ 26.0L – ₹ 38.0L",
    minRange: "₹ 26.0 Lakhs",
    maxRange: "₹ 38.0 Lakhs",
    warningThreshold: "₹ 38.0 Lakhs",
    warningText: "Any sanction above ₹38L will require architectural variance approval.",
    expectedTimeDays: 240,
    recommendedAgency: "Roads & Buildings (R&B) Division",
    semanticCluster: "Cluster #019 (Public Civic Buildings)",
    sampleSize: 67,
  },
  {
    id: "bm-solar-street-light",
    projectType: "Solar Street Light Installation (Set of 20)",
    keywords: ["solar", "street", "light", "lighting", "electricity", "lamp", "led"],
    medianCost: "₹ 5.2 Lakhs",
    medianCostRaw: 520000,
    confidenceInterval: "₹ 4.0L – ₹ 6.8L",
    minRange: "₹ 4.0 Lakhs",
    maxRange: "₹ 6.8 Lakhs",
    warningThreshold: "₹ 6.8 Lakhs",
    warningText: "Any sanction above ₹6.8L will require central IDA equipment clearance.",
    expectedTimeDays: 60,
    recommendedAgency: "State Renewable Energy Dev Agency (NREDCAP)",
    semanticCluster: "Cluster #077 (Rural Electrification & Clean Energy)",
    sampleSize: 210,
  },
  {
    id: "bm-public-toilet",
    projectType: "Public Sanitation / Modern Toilet Block",
    keywords: ["toilet", "sanitation", "washroom", "swachh", "latrine"],
    medianCost: "₹ 7.5 Lakhs",
    medianCostRaw: 750000,
    confidenceInterval: "₹ 5.5L – ₹ 9.5L",
    minRange: "₹ 5.5 Lakhs",
    maxRange: "₹ 9.5 Lakhs",
    warningThreshold: "₹ 9.5 Lakhs",
    warningText: "Any sanction above ₹9.5L exceeds the 95th percentile benchmark.",
    expectedTimeDays: 90,
    recommendedAgency: "Municipal Health & Sanitation Dept.",
    semanticCluster: "Cluster #058 (Public Sanitation & Waste Mgmt)",
    sampleSize: 95,
  },
];

export interface ConvergenceProject {
  id: string;
  projectId: number;
  description: string;
  sector: string;
  fundsNeeded: string;
  fundsNeededRaw: number;
  location: string;
  stalledDays: number;
  hostAgency: string;
  beneficiaryCount: string;
  progressPercent: number;
}

export const mockConvergenceProjects: ConvergenceProject[] = [
  {
    id: "#1092",
    projectId: 1092,
    description: "Completion of District Hospital Wing",
    sector: "Health",
    fundsNeeded: "₹ 15 Lakhs",
    fundsNeededRaw: 1500000,
    location: "Visakhapatnam (North)",
    stalledDays: 142,
    hostAgency: "DISTRICT COLLECTOR VIZAG_IDA",
    beneficiaryCount: "45,000 citizens",
    progressPercent: 75,
  },
  {
    id: "#2201",
    projectId: 2201,
    description: "Linking Road to National Highway",
    sector: "Infra",
    fundsNeeded: "₹ 8 Lakhs",
    fundsNeededRaw: 800000,
    location: "Vizianagaram Rural",
    stalledDays: 98,
    hostAgency: "Panchayat Raj Engineering Division",
    beneficiaryCount: "12,000 villagers",
    progressPercent: 60,
  },
  {
    id: "#1845",
    projectId: 1845,
    description: "Solar Micro-Grid for Primary Health Centre",
    sector: "Health",
    fundsNeeded: "₹ 6.5 Lakhs",
    fundsNeededRaw: 650000,
    location: "Kakinada Agency Area",
    stalledDays: 110,
    hostAgency: "State Renewable Energy Agency",
    beneficiaryCount: "8,500 tribal residents",
    progressPercent: 70,
  },
  {
    id: "#3140",
    projectId: 3140,
    description: "Rural Community Drinking Water Filtration Unit",
    sector: "Drinking Water",
    fundsNeeded: "₹ 4.5 Lakhs",
    fundsNeededRaw: 450000,
    location: "Anakapalle West",
    stalledDays: 85,
    hostAgency: "Rural Water Supply Sub-Division",
    beneficiaryCount: "6,200 households",
    progressPercent: 80,
  },
  {
    id: "#4098",
    projectId: 4098,
    description: "High School Science Lab Equipment & Computers",
    sector: "Education",
    fundsNeeded: "₹ 9 Lakhs",
    fundsNeededRaw: 900000,
    location: "Alluri Sitharama Raju District",
    stalledDays: 130,
    hostAgency: "District Educational Office",
    beneficiaryCount: "1,200 students",
    progressPercent: 65,
  },
];

export interface OversightKpiData {
  highRiskProjects: {
    count: number;
    threshold: string;
    subtext: string;
  };
  fundsAtRisk: {
    amount: string;
    rawAmount: number;
    subtext: string;
    percentageOfTotalAudit: number;
  };
  highestRiskConstituency: {
    name: string;
    criScore: number;
    farPercent: number;
    firPercent: number;
    subtext: string;
  };
  highestRiskAgency: {
    name: string;
    district: string;
    anomalyRatePercent: number;
    totalAnomalies: number;
    subtext: string;
  };
}

export const mockOversightKpiData: OversightKpiData = {
  highRiskProjects: {
    count: 42,
    threshold: "risk_score > 75",
    subtext: "Flagged by Isolation Forest & NLP duplicate models",
  },
  fundsAtRisk: {
    amount: "₹ 12.4 Crore",
    rawAmount: 124000000,
    subtext: "Sum of sanctioned amount for all high-risk projects",
    percentageOfTotalAudit: 18.5,
  },
  highestRiskConstituency: {
    name: "Anakapalle",
    criScore: 84,
    farPercent: 15,
    firPercent: 40,
    subtext: "Constituency Risk Index (CRI: 84/100)",
  },
  highestRiskAgency: {
    name: "District Collector, Chittoor",
    district: "Chittoor",
    anomalyRatePercent: 34.8,
    totalAnomalies: 12,
    subtext: "Highest anomaly rate among implementing agencies",
  },
};

/* ── B.2 Risk Leaderboards ─────────────────────────────────────── */

export interface ConstituencyRisk {
  rank: number;
  constituency: string;
  criScore: number;
  farPercent: number;
  firPercent: number;
}

export const mockConstituencyRisks: ConstituencyRisk[] = [
  { rank: 1, constituency: "Anakapalle", criScore: 84, farPercent: 15, firPercent: 40 },
  { rank: 2, constituency: "Bengaluru Rural", criScore: 72, farPercent: 8, firPercent: 35 },
  { rank: 3, constituency: "Nandyal", criScore: 68, farPercent: 12, firPercent: 20 },
  { rank: 4, constituency: "Kadapa", criScore: 61, farPercent: 9, firPercent: 18 },
  { rank: 5, constituency: "Ongole", criScore: 55, farPercent: 6, firPercent: 14 },
];

export interface AgencyRisk {
  rank: number;
  agencyName: string;
  anomalyRatePercent: number;
  totalAnomalies: number;
}

export const mockAgencyRisks: AgencyRisk[] = [
  { rank: 1, agencyName: "District Collector, Chittoor", anomalyRatePercent: 34.8, totalAnomalies: 12 },
  { rank: 2, agencyName: "Zilla Parishad, Anantapur", anomalyRatePercent: 28.2, totalAnomalies: 9 },
  { rank: 3, agencyName: "Municipal Corp., Vizag", anomalyRatePercent: 22.5, totalAnomalies: 7 },
  { rank: 4, agencyName: "Panchayat Raj, Srikakulam", anomalyRatePercent: 18.1, totalAnomalies: 5 },
  { rank: 5, agencyName: "R&B Division, Kurnool", anomalyRatePercent: 14.6, totalAnomalies: 4 },
];

/* ── B.3 Fraud Typology & Sector Vulnerability ─────────────────── */

export interface FraudTypologyItem {
  id: string;
  name: string;
  percentage: number;
  flagCount: number;
  estimatedRiskCr: number;
  color: string;
  description: string;
}

export const mockFraudTypologyData: FraudTypologyItem[] = [
  {
    id: "execution_overrun",
    name: "Cost Overruns",
    percentage: 55,
    flagCount: 23,
    estimatedRiskCr: 6.82,
    color: "#e11d48", // rose-600
    description: "Actual project expenditures exceeding sanctioned limits with prolonged delays.",
  },
  {
    id: "estimate_fraud",
    name: "Estimate Fraud",
    percentage: 30,
    flagCount: 13,
    estimatedRiskCr: 3.72,
    color: "#fb7185", // rose-400
    description: "Sanctioned amounts inflated substantially above regional ML cost benchmarks.",
  },
  {
    id: "duplicate_projects",
    name: "Duplicate Projects",
    percentage: 15,
    flagCount: 6,
    estimatedRiskCr: 1.86,
    color: "#fda4af", // rose-300
    description: "Semantic overlap and duplicate asset proposals in identical GPS coordinates.",
  },
];

export interface SectorVulnerabilityItem {
  sector: string;
  totalRedFlags: number;
  percentage: number;
  amountAtRiskCr: number;
  riskLevel: "Critical" | "High" | "Moderate" | "Low";
}

export const mockSectorVulnerabilityData: SectorVulnerabilityItem[] = [
  {
    sector: "Infrastructure",
    totalRedFlags: 25,
    percentage: 60,
    amountAtRiskCr: 7.44,
    riskLevel: "Critical",
  },
  {
    sector: "Sanitation",
    totalRedFlags: 11,
    percentage: 25,
    amountAtRiskCr: 3.10,
    riskLevel: "High",
  },
  {
    sector: "Health",
    totalRedFlags: 4,
    percentage: 10,
    amountAtRiskCr: 1.24,
    riskLevel: "Moderate",
  },
  {
    sector: "Education",
    totalRedFlags: 2,
    percentage: 5,
    amountAtRiskCr: 0.62,
    riskLevel: "Low",
  },
];

/* ── B.4 Live Anomaly Feed ─────────────────────────────────────── */

export interface AnomalyProject {
  id: number;
  formattedId: string;
  constituency: string;
  sector: string;
  description: string;
  ida_name: string;
  sanction_amt: number;
  sanction_amt_formatted: string;
  actual_amt: number;
  actual_amt_formatted: string;
  sanction_date: string;
  completion_date: string;
  is_anomaly: boolean;
  anomaly_type: "Estimate_Fraud" | "Execution_Overrun" | "Duplication";
  anomaly_type_label: string;
  alert_severity: "red" | "yellow";
  risk_score: number;
  llm_explanation: string;
  benchmark_median: string;
  variance_pct: string;
  coordinates?: string;
}

export const mockAnomalyProjects: AnomalyProject[] = [
  {
    id: 248539,
    formattedId: "#248539",
    constituency: "Anakapalle",
    sector: "Infrastructure",
    description: "Const. of public park in Golugonda",
    ida_name: "DISTRICT COLLECTOR ANAKAPALLI_IDA",
    sanction_amt: 5000000.0,
    sanction_amt_formatted: "₹ 50.0 Lakhs",
    actual_amt: 5000000.0,
    actual_amt_formatted: "₹ 50.0 Lakhs",
    sanction_date: "14-Feb-2025",
    completion_date: "Delayed (Overdue 140d)",
    is_anomaly: true,
    anomaly_type: "Estimate_Fraud",
    anomaly_type_label: "Estimate Fraud",
    alert_severity: "red",
    risk_score: 94,
    llm_explanation:
      "This project has been flagged for SEVERE ESTIMATE FRAUD. The sanctioned amount of ₹50 Lakhs is 450% higher than the regional median (₹11 Lakhs) for 'Public Park' projects within this semantic cluster. Additionally, the implementing agency has a historical delay rate of 62%.",
    benchmark_median: "₹ 11.0 Lakhs",
    variance_pct: "+450%",
    coordinates: "17.6868° N, 82.5028° E",
  },
  {
    id: 134703,
    formattedId: "#134703",
    constituency: "Visakhapatnam North",
    sector: "Infrastructure",
    description: "Upgradation of Road from Madhavaram to Highway",
    ida_name: "PANCHAYAT RAJ ENG DIV VIZAG",
    sanction_amt: 1200000.0,
    sanction_amt_formatted: "₹ 12.0 Lakhs",
    actual_amt: 2280000.0,
    actual_amt_formatted: "₹ 22.8 Lakhs",
    sanction_date: "03-Nov-2024",
    completion_date: "Stalled / Physical Progress 40%",
    is_anomaly: true,
    anomaly_type: "Execution_Overrun",
    anomaly_type_label: "Execution Overrun",
    alert_severity: "red",
    risk_score: 88,
    llm_explanation:
      "Flagged for EXECUTION COST OVERRUN. Cumulative disbursements have exceeded initial sanctioned estimate by 90% with only 40% physical asset completion verified on ground.",
    benchmark_median: "₹ 12.0 Lakhs",
    variance_pct: "+90%",
    coordinates: "17.7231° N, 83.2986° E",
  },
  {
    id: 169751,
    formattedId: "#169751",
    constituency: "Chittoor Rural",
    sector: "Sanitation",
    description: "Community Hall Construction & Modern Sanitation Unit",
    ida_name: "DISTRICT COLLECTOR CHITTOOR_IDA",
    sanction_amt: 4500000.0,
    sanction_amt_formatted: "₹ 45.0 Lakhs",
    actual_amt: 4500000.0,
    actual_amt_formatted: "₹ 45.0 Lakhs",
    sanction_date: "19-Jan-2025",
    completion_date: "Under Verification",
    is_anomaly: true,
    anomaly_type: "Duplication",
    anomaly_type_label: "Duplicate Work",
    alert_severity: "yellow",
    risk_score: 76,
    llm_explanation:
      "Flagged for SPATIAL DUPLICATION RISK. A sanction with 92% semantic and geographical overlap (#168920) was already disbursed to the same Gram Panchayat in Q3 2024.",
    benchmark_median: "₹ 32.0 Lakhs",
    variance_pct: "+40%",
    coordinates: "13.2172° N, 79.1003° E",
  },
  {
    id: 301928,
    formattedId: "#301928",
    constituency: "Nandyal",
    sector: "Health",
    description: "Primary Health Center Diagnostic Equipment Procurement",
    ida_name: "DISTRICT MEDICAL & HEALTH OFFICE NANDYAL",
    sanction_amt: 2800000.0,
    sanction_amt_formatted: "₹ 28.0 Lakhs",
    actual_amt: 2800000.0,
    actual_amt_formatted: "₹ 28.0 Lakhs",
    sanction_date: "12-Dec-2024",
    completion_date: "Pending Equipment Delivery",
    is_anomaly: true,
    anomaly_type: "Estimate_Fraud",
    anomaly_type_label: "Estimate Fraud",
    alert_severity: "red",
    risk_score: 82,
    llm_explanation:
      "Flagged for EQUIPMENT UNIT COST INFLATION. Itemized bill of quantities shows 180% markup compared to standard GEM portal rate cards for ultrasound units.",
    benchmark_median: "₹ 15.5 Lakhs",
    variance_pct: "+80%",
    coordinates: "15.4889° N, 78.4842° E",
  },
  {
    id: 285119,
    formattedId: "#285119",
    constituency: "Bengaluru Rural",
    sector: "Sanitation",
    description: "Reverse Osmosis (RO) Purification Plant (5000 LPH)",
    ida_name: "RURAL WATER SUPPLY & SANITATION DEPT",
    sanction_amt: 1600000.0,
    sanction_amt_formatted: "₹ 16.0 Lakhs",
    actual_amt: 1600000.0,
    actual_amt_formatted: "₹ 16.0 Lakhs",
    sanction_date: "05-Jan-2025",
    completion_date: "Civil Work Completed / Inactive",
    is_anomaly: true,
    anomaly_type: "Duplication",
    anomaly_type_label: "Duplicate Work",
    alert_severity: "yellow",
    risk_score: 72,
    llm_explanation:
      "Flagged for INFRASTRUCTURE REDUNDANCY. Water supply GIS maps indicate an existing functional state-funded RO kiosk located within 120 meters.",
    benchmark_median: "₹ 4.5 Lakhs",
    variance_pct: "+255%",
    coordinates: "13.2384° N, 77.7121° E",
  },
  {
    id: 412093,
    formattedId: "#412093",
    constituency: "Kadapa",
    sector: "Education",
    description: "Digital Classroom Smart Board & IT Setup (5 Schools)",
    ida_name: "ZILLA PARISHAD KADAPA",
    sanction_amt: 2200000.0,
    sanction_amt_formatted: "₹ 22.0 Lakhs",
    actual_amt: 3100000.0,
    actual_amt_formatted: "₹ 31.0 Lakhs",
    sanction_date: "28-Oct-2024",
    completion_date: "Stalled / Supplier Contract Disputed",
    is_anomaly: true,
    anomaly_type: "Execution_Overrun",
    anomaly_type_label: "Execution Overrun",
    alert_severity: "red",
    risk_score: 79,
    llm_explanation:
      "Flagged for REVISED ESTIMATE IRREGULARITIES. Contractor invoiced 41% additional cabling and structural charges without prior technical sanction approval.",
    benchmark_median: "₹ 18.0 Lakhs",
    variance_pct: "+41%",
    coordinates: "14.4673° N, 78.8242° E",
  },
];



