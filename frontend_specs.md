# Frontend Development Specification: MPLADS AI Dashboard

**Target Tech Stack:** Next.js (React), Tailwind CSS, Recharts (for charts), Shadcn/UI or Material-UI (for components).
**Context:** This dashboard serves two personas: MPs (planning) and Ministry Officials (oversight). It consumes pre-processed ML data via REST APIs.

---

## 1. Global Application Structure
*   **Layout:** A persistent top navigation bar containing the Government/MoSPI logo, the current user profile, and the **Persona Toggle Switch** (MP Mode vs Oversight Mode).
*   **State Management:** The toggle switch should manage global state (e.g., via React Context). Toggling it completely swaps out the main `<main>` container component.
*   **Theming:** Use a clean, enterprise-grade color palette. 
    *   *Primary:* Deep Navy Blue (`#0f172a`)
    *   *Accents:* Emerald Green (for good metrics/smart utilization), Crimson Red (for fraud/anomalies).
    *   *Background:* Very light gray/off-white (`#f8fafc`) to make data cards pop.

---

## 2. Component Specs: Theme A (MP Planner Mode)
*Focus: Optimizing fund allocation, finding gaps, and collaboration.*

### A.1. Top KPI Row (4 Cards)
*   **Total Funds Available:** Big typography. Fetch from `/api/mp/funds`.
*   **Active Projects:** Count of projects with `status != "Completed"`.
*   **Stalled Projects Nearby:** A critical metric pulling from the Convergence API. 
*   **Top Implementing Agency:** Highlights the highest-rated IDA in their district.

### A.2. Sector Gap Analysis (Chart Component)
*   **Visual:** A side-by-side Bar Chart or a Radar Chart.
*   **Data Props:** Array of objects `{ sector: "Education", mp_spend: 45, state_avg: 30 }`.
*   **Interactivity:** Hovering over a bar shows a tooltip calculating the exact monetary gap (e.g., "You are under-spending on Health by ₹1.2 Cr compared to the state average").

### A.3. Cost Benchmarking Search Tool (Interactive Component)
*   **Visual:** A large Search Bar (`<input>`) dominating a white card.
*   **Behavior:** As the user types (e.g., "Water Tank"), use a debounce function to fetch from `/api/benchmarks?q=water+tank`.
*   **Result Render:** Displays a card showing:
    *   **Median Cost:** Large text (e.g., ₹4.5 Lakhs).
    *   **Confidence Interval:** e.g., "Standard range: ₹3L - ₹6L".
    *   **Warning Badge:** "Any sanction above ₹6L will require special justification."

### A.4. Convergence Board (Data Grid)
*   **Visual:** A paginated Data Table.
*   **Columns:** `Project ID`, `Description`, `Sector`, `Funds Needed`, `Location`.
*   **Action Column:** A button `[ Offer Convergence Funds ]` that triggers a confirmation modal.

---

## 3. Component Specs: Theme B (Oversight Mode)
*Focus: Finding fraud, ranking risks, and drilling down into anomalies.*

### B.1. Top KPI Row (4 Cards)
*   **Total High-Risk Projects:** Number of projects with `risk_score > 75`. Red font.
*   **Estimated Funds at Risk:** Sum of `sanction_amt` for all high-risk projects.
*   **Highest Risk Constituency:** Name + CRI Score.
*   **Highest Risk Agency:** IDA Name + Anomaly Rate %.

### B.2. Risk Leaderboards (Dual Tables)
*   **Visual:** Two side-by-side compact lists/tables.
*   **Table 1 (Constituencies):** Ranked by Constituency Risk Index (CRI).
    *   Columns: `Rank`, `Constituency`, `CRI Score`, `FAR %`, `FIR %`.
    *   *Interactivity:* Clicking a row routes to a deep-dive page for that constituency.
*   **Table 2 (Agencies/IDAs):** Ranked by Anomaly Rate.
    *   Columns: `Rank`, `Agency Name`, `Anomaly Rate %`, `Total Anomalies`.

### B.3. Fraud Typology & Sector Vulnerability (Charts)
*   **Sector Vulnerability (Bar Chart):** 
    *   X-Axis: Sectors (Roads, Health, etc.). Y-Axis: Total Red Flags.
*   **Fraud Typology (Donut Chart):**
    *   Slices: Estimate Fraud, Execution Overrun, Duplication. 
    *   *Interactivity:* Clicking a slice filters the "Live Anomaly Feed" below to only show that type of fraud.

### B.4. Live Anomaly Feed (The Main Data Grid)
*   **Visual:** A robust, full-width Data Table (use a library like AG-Grid or TanStack Table).
*   **Features:** Must have column sorting and filtering (e.g., filter by Sector).
*   **Columns:** `Alert Icon 🚨`, `Project ID`, `Description`, `Sanctioned Amt`, `Anomaly Type`, `Action`.
*   **Row Click:** Clicking *anywhere* on the row opens the "Investigate Modal" (Section 4).

---

## 4. The "Investigate" Modal (AI Drill-Down)
This is the most critical UI component for the judges. It pops up over the screen (overlay).

*   **Header:** `PROJECT INSPECTOR: #[ID]` with a red warning banner.
*   **Left Column (The Facts):**
    *   Description, Sanctioned Amount, Actual Amount, Dates, Implementing Agency (IDA).
*   **Right Column (The AI Brain):**
    *   **The LLM Explanation Box:** A distinct, slightly shaded box with an AI sparkle icon ✨. This displays the plain-English `red_flag_explanation` string fetched from the DB.
    *   *Typography:* Use a slightly larger, highly readable font for the LLM text to draw the user's eye immediately to the AI's reasoning.
*   **Footer Actions:**
    *   `[ View Full JSON History ]` (Expandable accordion showing raw data traces).
    *   `[ Freeze Funds ]` (Primary red button - visual only for demo).

---

## 5. API Data Structures (For Mocking)
If the backend isn't ready, the frontend team should mock the endpoints to expect JSON arrays of objects. 

**Example Project Object:**
```json
{
  "id": 248539,
  "constituency": "Anakapalle",
  "sector": "Infrastructure",
  "description": "Const. of public park in Golugonda",
  "ida_name": "DISTRICT COLLECTOR ANAKAPALLI_IDA",
  "sanction_amt": 5000000.0,
  "actual_amt": 5000000.0,
  "is_anomaly": true,
  "anomaly_type": "Estimate_Fraud",
  "llm_explanation": "Flagged for SEVERE ESTIMATE FRAUD. The sanctioned amount of ₹50 Lakhs is 450% higher than the regional median (₹11 Lakhs) for 'Public Park' projects."
}
```
