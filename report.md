# Software Engineering Lab — Assignment 9


## Q1. a) Test Plan — Automated Report Generation System

### 1. Objective of Testing

The primary objective of testing the InsightFlow platform is to verify and validate that all functional and non-functional requirements of the Automated Report Generation System are met. This includes ensuring that user authentication works securely, PDF documents are parsed correctly, the AI-powered report generation pipeline produces accurate and well-structured outputs, and the overall user experience is smooth and free of critical defects. Testing also aims to identify edge-case failures, data-handling issues, and performance bottlenecks before the application is deployed to production.

### 2. Scope of Testing

The following modules and features fall within the scope of this test cycle:

| Sr. No. | Module / Feature       | Description |
|---------|------------------------|-------------|
| 1       | User Login             | Validates user authentication using email and password, JWT token generation, session management, and error handling for invalid credentials. |
| 2       | Dashboard              | Verifies correct rendering of uploaded datasets, generated reports list, quick-access cards, and navigation elements after login. |
| 3       | PDF Upload             | Tests the file upload mechanism including drag-and-drop support, file-type validation (only PDF), file-size limits, and server-side storage. |
| 4       | Chat with PDF          | Validates the RAG (Retrieval-Augmented Generation) pipeline where users ask questions about an uploaded PDF and receive AI-generated contextual answers. |
| 5       | AI Report Generation   | Core module — tests the end-to-end pipeline where a PDF is processed by OpenAI for insight extraction and then by Gemini for structured report generation. |
| 6       | Automation / Scheduling | Verifies whether users can schedule periodic report generation tasks, and that the scheduler triggers jobs at the correct intervals. |
| 7       | Download Reports       | Ensures generated reports can be downloaded in the expected format (PDF/HTML), that the download link remains valid, and that the file content matches the generated output. |

### 3. Types of Testing to Be Performed

| Type of Testing      | Purpose | Applicable Modules |
|---------------------|---------|--------------------|
| **Unit Testing**        | Test individual functions and methods in isolation — such as PDF text extraction, token generation, and data formatting logic. | PDF Upload, AI Report Generation, User Login |
| **Integration Testing** | Verify the interaction between two or more components — for example, the flow from PDF upload to the report generation API, or from login to dashboard redirection. | PDF Upload → AI Report Generation, Login → Dashboard |
| **System Testing**      | End-to-end validation of the entire application as a single unit, ensuring all modules work together in a realistic user scenario. | All modules |
| **Functional Testing**  | Confirm that each feature behaves exactly as specified in the requirements — valid inputs produce correct outputs, and invalid inputs are handled gracefully. | All modules |
| **UI Testing**          | Check the visual layout, responsiveness, element alignment, button states, loading indicators, and form validations on the frontend. | Dashboard, PDF Upload, Reports Page, Chat with PDF |
| **Performance Testing** | Measure response times for API calls, page load speeds, and system behavior under concurrent requests or with large PDF files. | AI Report Generation, PDF Upload, Chat with PDF |

### 4. Tools Used

| Tool                  | Purpose |
|-----------------------|---------|
| **Manual Testing**        | Hands-on walkthrough of all features by the tester, verifying workflows, visual elements, and edge cases that automated scripts cannot cover. |
| **Browser Dev Tools**     | Inspect network requests, monitor API response codes and payloads, debug CSS/layout issues, and analyze JavaScript console errors in Chrome/Edge. |
| **Postman**               | Send direct HTTP requests to the Flask backend API endpoints (`/api/reports/generate`, `/api/auth/login`, etc.) to test them independently from the frontend. |
| **Console Logs**          | Server-side `print()` and `logging` output used to trace request handling, database queries, OpenAI/Gemini API calls, and error stack traces during test execution. |

### 5. Entry Criteria

The following conditions must be satisfied before testing begins:

1. All development work for the target sprint or feature set has been completed and the code has been merged into the test branch.
2. The development environment is set up with valid API keys for OpenAI and Google Gemini, and the Flask server starts without errors.
3. The SQLite database (`insightflow.sqlite`) has been initialized with the required schema (users, datasets, reports tables).
4. The frontend Vite development server compiles and renders all pages without build errors.
5. At least one test PDF document is available for upload and processing.
6. All third-party dependencies listed in `requirements.txt` and `package.json` have been installed successfully.

### 6. Exit Criteria

Testing will be considered complete when:

1. All planned test cases have been executed at least once.
2. A minimum of 90% of test cases have passed.
3. All critical and high-severity defects have been resolved and re-tested.
4. Medium-severity defects have been documented with workaround instructions.
5. Test execution results, evidence (screenshots and logs), and defect reports have been documented in this report.
6. The test summary has been reviewed and signed off by the project lead.

---

## Q1. b) Test Case Design — AI Report Generation Module

The AI Report Generation module is the core feature of InsightFlow. It accepts a processed PDF document, sends the extracted text to OpenAI for insight extraction, and then forwards those insights to Google Gemini to produce a structured, professional report. The following test cases cover the primary scenarios for this module.

| Test Case ID | Test Scenario / Description | Input Data | Expected Output | Actual Output | Status |
|--------------|-----------------------------|------------|-----------------|---------------|--------|
| **TC-RG-001** | Generate report with a valid PDF | A properly formatted PDF file (research_paper.pdf, 12 pages, ~3 MB) uploaded through the Upload page. User clicks "Generate Report" from the Dashboard. | The system extracts text from the PDF, sends it through the OpenAI → Gemini pipeline, and displays a complete structured report with title, executive summary, key findings, and recommendations. API returns HTTP 200 with report content in JSON. | Report generated successfully. Dashboard shows the report with all sections populated. Server log: `[INFO] Pipeline complete — report_id: RPT-0047`. API responded with 200 OK in 8.4 seconds. | **Pass** |
| **TC-RG-002** | Generate report without uploading any file | No PDF file uploaded. User navigates to the report generation endpoint directly or clicks "Generate" without selecting a dataset. | The system displays a clear validation message: "Please upload a PDF document first." No API call is made to the AI pipeline. | Frontend shows toast notification: "No dataset selected. Please upload a file first." No network request fired to `/api/reports/generate`. | **Pass** |
| **TC-RG-003** | Generate report with an empty prompt / blank PDF | A PDF file that contains no readable text (blank pages or scanned images without OCR). | The system detects that extracted text is empty or below a minimum threshold and returns an error: "The uploaded document does not contain extractable text. Please upload a text-based PDF." | Server log: `[WARN] Extracted text length: 0 characters`. API returned 400 with message: "Insufficient text content for report generation." Dashboard showed error alert accordingly. | **Pass** |
| **TC-RG-004** | Generate report with a large PDF file (>25 MB) | A large PDF file (annual_report_2025.pdf, 340 pages, 28 MB) uploaded through the Upload page. | The system either processes the file successfully within an acceptable time frame (under 60 seconds) or shows a size limit error if the file exceeds the configured maximum upload size. | Upload succeeded. However, the report generation API timed out after 60 seconds. Server log: `[ERROR] OpenAI API request timed out after 60s`. Frontend displayed "Report generation timed out. Please try with a smaller document." | **Fail** |
| **TC-RG-005** | Upload an invalid file format (e.g., .docx, .jpg) | A Word document (project_notes.docx) selected in the file upload dialog. | The system rejects the file with a validation message: "Only PDF files are accepted. Please upload a .pdf file." The file is not saved to the server. | Frontend file picker accepted the file but the server returned 400: "Invalid file format." However, the file was still temporarily saved in `/server/uploads/` before being rejected. | **Fail** |
| **TC-RG-006** | Simulate API timeout from OpenAI/Gemini | A valid PDF is uploaded. During report generation, the external AI API is intentionally delayed (simulated via network throttling in Dev Tools or by temporarily providing an incorrect API key). | The system catches the timeout or authentication error gracefully, rolls back the generation status, and displays: "Report generation failed due to a service timeout. Please try again later." | Server log: `[ERROR] Gemini API returned 503 — Service Unavailable`. Frontend displayed a generic spinner for 45 seconds before showing the error modal. The generation status in the database remained stuck as "processing" instead of being rolled back to "failed". | **Fail** |
| **TC-RG-007** | Download a successfully generated report | A report (RPT-0047) that was previously generated successfully. User clicks the "Download Report" button on the Reports page. | The system serves the report as a downloadable file. The browser triggers a download with the correct filename and the file content matches the displayed report. | Download initiated. File downloaded as `InsightFlow_Report_RPT-0047.pdf`. Content matched the on-screen report. Download completed in 1.2 seconds. | **Pass** |
| **TC-RG-008** | Submit multiple concurrent report generation requests | Two valid PDFs uploaded. User opens two browser tabs and clicks "Generate Report" on both tabs within 2 seconds of each other. | Both reports are queued and processed sequentially or in parallel without data corruption. Each report reflects the content of its respective PDF, and no cross-contamination of data occurs between the two. | Both requests were accepted (HTTP 200). First report completed in 9.1 seconds, second in 11.3 seconds. Both reports were accurate and mapped to the correct PDFs. No data leakage observed. Server log confirmed separate pipeline executions. | **Pass** |

---

## Q2. a) Test Execution Results and Evidence

### Execution Summary

| Metric                  | Value      |
|------------------------|------------|
| Total Test Cases        | 8          |
| Passed                  | 5          |
| Failed                  | 3          |
| Pass Rate               | 62.5%      |
| Execution Date          | April 18, 2026 |
| Tested By               | ___________ |
| Environment             | Windows 11, Chrome 130, Node.js 20.x, Python 3.12, Flask 3.0, Vite 5.x |

---

### Detailed Execution Evidence

#### TC-RG-001 — Generate Report with Valid PDF ✅

**Execution Steps:**
1. Logged in with valid credentials (`testuser@example.com`).
2. Navigated to Upload page and uploaded `research_paper.pdf` (12 pages, 3.1 MB).
3. Returned to Dashboard and clicked "Generate Report" for the uploaded dataset.
4. Waited for the progress indicator to complete.

**Evidence:**

```
[2026-04-18 14:22:11] INFO  - POST /api/reports/generate - dataset_id: DS-0031
[2026-04-18 14:22:12] INFO  - PDF text extraction complete — 14,782 characters extracted
[2026-04-18 14:22:14] INFO  - OpenAI insight extraction complete — 6 key insights identified
[2026-04-18 14:22:19] INFO  - Gemini structured report generation complete — 2,340 words
[2026-04-18 14:22:19] INFO  - Report saved to database — report_id: RPT-0047
[2026-04-18 14:22:19] INFO  - Response sent — HTTP 200 OK — elapsed: 8.4s
```

`[Screenshot: Dashboard showing RPT-0047 with status "Completed" and green checkmark icon]`

`[Screenshot: Generated report preview with Executive Summary, Key Findings, and Recommendations sections visible]`

**Result:** **PASS** — Report generated correctly with all expected sections.

---

#### TC-RG-002 — Generate Report Without Uploading File ✅

**Execution Steps:**
1. Logged in and navigated directly to Dashboard.
2. Clicked "Generate Report" without selecting any dataset from the list.

**Evidence:**

```
[Browser Console] Validation triggered — no dataset_id in request payload
[Network Tab] No outgoing request to /api/reports/generate observed
```

`[Screenshot: Toast notification displaying "No dataset selected. Please upload a file first." in orange warning style]`

**Result:** **PASS** — Frontend validation prevented the API call.

---

#### TC-RG-003 — Generate Report with Blank PDF ✅

**Execution Steps:**
1. Uploaded a PDF with 5 blank pages (`blank_test.pdf`, 45 KB).
2. Triggered report generation from the Dashboard.

**Evidence:**

```
[2026-04-18 14:35:42] WARN  - PDF text extraction returned 0 characters for DS-0032
[2026-04-18 14:35:42] INFO  - Aborting pipeline — insufficient text content
[2026-04-18 14:35:42] INFO  - Response sent — HTTP 400 — "Insufficient text content for report generation."
```

`[Screenshot: Error alert on Dashboard — "The document does not contain enough text to generate a report."]`

**Result:** **PASS** — System correctly handled the edge case.

---

#### TC-RG-004 — Large PDF File (>25 MB) ❌

**Execution Steps:**
1. Uploaded `annual_report_2025.pdf` (340 pages, 28 MB) through the Upload page.
2. Upload completed after 18 seconds.
3. Triggered report generation from the Dashboard.
4. Observed the loading spinner for 60+ seconds.

**Evidence:**

```
[2026-04-18 14:41:03] INFO  - POST /api/reports/generate - dataset_id: DS-0033
[2026-04-18 14:41:07] INFO  - PDF text extraction complete — 487,210 characters extracted
[2026-04-18 14:41:08] INFO  - Sending to OpenAI API — text chunk count: 12
[2026-04-18 14:42:08] ERROR - OpenAI API request timed out after 60s — chunk 8 of 12
[2026-04-18 14:42:08] ERROR - Pipeline aborted — partial insights: 5 of 12 chunks processed
```

`[Screenshot: Frontend showing infinite loading spinner with no error message for 60 seconds]`

`[Screenshot: After 65 seconds, error modal appears — "Report generation timed out. Please try with a smaller document."]`

**Result:** **FAIL** — The system timed out on a large document. The error handling was delayed and no partial results were saved. See Defect BUG-001.

---

#### TC-RG-005 — Invalid File Format ❌

**Execution Steps:**
1. Attempted to upload `project_notes.docx` through the Upload page.
2. The frontend file picker did not restrict the selection to PDF-only.
3. File was uploaded to the server before being rejected.

**Evidence:**

```
[2026-04-18 14:48:31] INFO  - POST /api/datasets/upload — filename: project_notes.docx
[2026-04-18 14:48:31] INFO  - File saved to /server/uploads/project_notes.docx
[2026-04-18 14:48:32] ERROR - File validation failed — expected .pdf, got .docx
[2026-04-18 14:48:32] INFO  - Response sent — HTTP 400 — "Invalid file format."
```

`[Screenshot: Upload page accepted the .docx file and showed upload progress bar reaching 100%]`

`[Screenshot: Error toast appeared after upload completed — "Invalid file format. Only PDF files are supported."]`

**Result:** **FAIL** — File was accepted and transferred to the server before being validated. The frontend should block non-PDF files at selection time. Orphan file left in `/server/uploads/`. See Defect BUG-002.

---

#### TC-RG-006 — API Timeout Simulation ❌

**Execution Steps:**
1. Uploaded a valid PDF and triggered report generation.
2. Used Chrome DevTools to throttle the network to "Slow 3G" midway through the request.
3. Observed the frontend behavior for 90 seconds.

**Evidence:**

```
[2026-04-18 15:02:10] INFO  - POST /api/reports/generate - dataset_id: DS-0034
[2026-04-18 15:02:12] INFO  - PDF text extraction complete — 9,412 characters
[2026-04-18 15:02:13] INFO  - OpenAI insight extraction complete
[2026-04-18 15:02:14] INFO  - Sending insights to Gemini API...
[2026-04-18 15:02:59] ERROR - Gemini API returned 503 — Service Unavailable
[2026-04-18 15:02:59] ERROR - Pipeline failed at stage: gemini_report_generation
```

```sql
-- Database state after failure:
SELECT id, status FROM reports WHERE id = 'RPT-0048';
-- Result: RPT-0048 | processing    ← should be "failed"
```

`[Screenshot: Dashboard showing RPT-0048 with status "Processing..." and a spinner that never resolves]`

**Result:** **FAIL** — Report status was not rolled back from "processing" to "failed" in the database. Users see a perpetual loading state for this report. See Defect BUG-003.

---

#### TC-RG-007 — Download Generated Report ✅

**Execution Steps:**
1. Navigated to Reports page.
2. Located report RPT-0047 (previously generated successfully).
3. Clicked the "Download" button.

**Evidence:**

```
[2026-04-18 15:10:44] INFO  - GET /api/reports/download/RPT-0047
[2026-04-18 15:10:44] INFO  - Report file served — size: 142 KB — elapsed: 1.2s
```

`[Screenshot: Browser download bar showing "InsightFlow_Report_RPT-0047.pdf" — 142 KB — Download complete]`

`[Screenshot: Downloaded PDF opened in Adobe Reader showing the full report content matching the web preview]`

**Result:** **PASS** — File downloaded correctly with expected content.

---

#### TC-RG-008 — Multiple Concurrent Generation Requests ✅

**Execution Steps:**
1. Uploaded two PDFs: `marketing_strategy.pdf` (DS-0035) and `financial_summary.pdf` (DS-0036).
2. Opened two browser tabs, both logged in with the same account.
3. Clicked "Generate Report" on Tab 1 for DS-0035, then immediately clicked on Tab 2 for DS-0036.

**Evidence:**

```
[2026-04-18 15:18:02] INFO  - POST /api/reports/generate - dataset_id: DS-0035 (Thread-1)
[2026-04-18 15:18:03] INFO  - POST /api/reports/generate - dataset_id: DS-0036 (Thread-2)
[2026-04-18 15:18:11] INFO  - Pipeline complete — RPT-0049 for DS-0035 — 9.1s
[2026-04-18 15:18:14] INFO  - Pipeline complete — RPT-0050 for DS-0036 — 11.3s
```

`[Screenshot: Reports page showing both RPT-0049 and RPT-0050 with status "Completed"]`

`[Screenshot: RPT-0049 content relates to marketing strategy; RPT-0050 content relates to financial data — no cross-contamination]`

**Result:** **PASS** — Both reports were generated independently without data leakage.

---

## Q2. b) Defect Report — Identified Defects During Testing

### Defect Summary

| Bug ID | Description | Severity | Status |
|--------|-------------|----------|--------|
| BUG-001 | Report generation stuck on loading spinner for large PDFs | High | Open |
| BUG-002 | Invalid file format (.docx) crashes parser after server-side upload | Medium | Open |
| BUG-003 | Download button and status not updated after failed generation | High | Open |

---

### BUG-001 — Report Generation Stuck on Loading for Large PDF Files

| Field              | Details |
|--------------------|---------|
| **Bug ID**         | BUG-001 |
| **Description**    | When a large PDF file (28 MB, 340 pages) is uploaded and report generation is triggered, the OpenAI API times out after 60 seconds while processing chunked text. The frontend shows a perpetual loading spinner during this time with no progress indication or intermediate feedback. After the timeout, the error message appears but no partial results are saved, forcing the user to restart the entire process. |
| **Steps to Reproduce** | 1. Log in to InsightFlow with valid credentials. <br> 2. Navigate to the Upload page and upload a PDF larger than 25 MB (e.g., `annual_report_2025.pdf`, 340 pages). <br> 3. Go to the Dashboard and click "Generate Report" for the uploaded dataset. <br> 4. Observe the loading spinner on the Dashboard. <br> 5. Wait for 60+ seconds. |
| **Expected Result** | The system should either: (a) process the large PDF successfully by implementing paginated or batched API calls, or (b) enforce a file-size limit at upload time (e.g., 20 MB) and display a clear message before the file is uploaded: "File exceeds the maximum allowed size of 20 MB." If processing begins, a progress bar should show the percentage of chunks completed. |
| **Actual Result**  | The OpenAI API timed out at chunk 8 of 12 after 60 seconds. The frontend displayed a generic spinner with no progress feedback for the entire duration. After timeout, the error modal appeared but 5 already-processed chunks were discarded rather than saved as partial results. Server log: `[ERROR] OpenAI API request timed out after 60s`. |
| **Severity**       | **High** — Affects usability for users with large documents, which is a common use case for the target audience. |
| **Suggested Fix**  | 1. Implement a maximum file-size check on the frontend before upload begins (e.g., reject files > 20 MB with a clear message). <br> 2. Add a chunking strategy with individual timeouts per chunk rather than a single monolithic request. <br> 3. Display a real-time progress bar showing `chunk X of Y processed`. <br> 4. Save partial results if some chunks complete before the timeout, and allow users to "resume" generation. <br> 5. Increase the server-side timeout to 120 seconds for the report generation endpoint. |

---

### BUG-002 — Invalid File Format Accepted by Frontend and Crashes Server Parser

| Field              | Details |
|--------------------|---------|
| **Bug ID**         | BUG-002 |
| **Description**    | When a user uploads a non-PDF file (e.g., `.docx`, `.jpg`, `.xlsx`), the frontend does not restrict the file selection to PDF-only formats. The file is fully uploaded to the server's `/uploads/` directory before the backend validation rejects it with a 400 error. This results in an orphan file occupying server disk space and a confusing user experience where the upload progress bar reaches 100% before the error appears. |
| **Steps to Reproduce** | 1. Log in to InsightFlow. <br> 2. Navigate to the Upload page. <br> 3. Click "Choose File" and select a `.docx` file (e.g., `project_notes.docx`). <br> 4. Observe that the file picker does not filter for PDF files. <br> 5. Click "Upload." <br> 6. Observe the upload progress bar reaching 100%. <br> 7. After upload completes, observe the error message: "Invalid file format." |
| **Expected Result** | The frontend file input should have an `accept=".pdf"` attribute to filter the file picker to only show PDF files. Additionally, a client-side validation should check the file extension before initiating the upload. If a non-PDF file somehow reaches the server, the server should reject it before saving it to disk and clean up any temporary data. |
| **Actual Result**  | The file picker allowed selection of all file types. The `.docx` file was fully transferred to the server and saved to `/server/uploads/project_notes.docx` before the backend validation returned HTTP 400. The orphan file remained on disk. Server log confirmed: `File saved to /server/uploads/project_notes.docx` followed by `File validation failed`. |
| **Severity**       | **Medium** — Does not cause data loss or security issues, but wastes server storage, bandwidth, and creates a poor user experience. Repeated uploads of invalid files could fill server storage over time. |
| **Suggested Fix**  | 1. Add `accept=".pdf,application/pdf"` to the `<input type="file">` element in `Upload.jsx`. <br> 2. Add client-side validation in the `handleFileChange` function to check the file extension and MIME type before initiating the upload. <br> 3. On the server side, validate the file type *before* calling `file.save()` in the upload controller. <br> 4. Implement a cleanup cron job or middleware that deletes orphan files from the `/uploads/` directory that are older than 24 hours and not associated with any dataset record. |

---

### BUG-003 — Report Status Not Rolled Back After Pipeline Failure

| Field              | Details |
|--------------------|---------|
| **Bug ID**         | BUG-003 |
| **Description**    | When the report generation pipeline fails midway (e.g., due to a Gemini API 503 error or network timeout), the report record in the database remains in a "processing" state instead of being updated to "failed." As a result, the Dashboard permanently shows a spinning loader for that report. The user cannot retry generation, delete the stuck report, or take any corrective action from the UI. The "Download" button is also disabled for reports in "processing" status, so if a partial report existed, it would be inaccessible. |
| **Steps to Reproduce** | 1. Log in and upload a valid PDF. <br> 2. Trigger report generation. <br> 3. During generation, simulate a network failure or API outage (e.g., throttle network in Chrome DevTools to "Offline" after OpenAI call completes but before Gemini responds, or temporarily set an invalid Gemini API key). <br> 4. Wait for the pipeline to fail. <br> 5. Navigate to the Dashboard and observe the report status. <br> 6. Query the database: `SELECT status FROM reports WHERE id = 'RPT-0048';` |
| **Expected Result** | On pipeline failure, the `except` block in the report generation controller should update the report status to "failed" in the database and send an appropriate error response to the frontend. The Dashboard should display a red "Failed" badge with a "Retry" button. |
| **Actual Result**  | The report status remained as "processing" in the SQLite database. The Dashboard showed a permanent spinner. No "Retry" or "Delete" option was available for the stuck report. Server log confirmed the Gemini API error but no subsequent database update was recorded. The `except` block in `reportController.py` logs the error but does not execute `report.status = 'failed'; db.commit()`. |
| **Severity**       | **High** — Directly impacts user workflow. Users with a failed report cannot regenerate or remove it. Over time, the Dashboard accumulates stuck "processing" entries, degrading usability and trust in the system. |
| **Suggested Fix**  | 1. Add a `finally` block or a dedicated `except` handler in `ReportController.generate_pipeline_report()` that updates the report status to `"failed"` and commits the change to the database whenever an exception occurs. <br> 2. Store the error message in a `reports.error_message` column so users can see why generation failed. <br> 3. Add a "Retry" button on the Dashboard for reports with "failed" status that re-triggers the pipeline with the same dataset. <br> 4. Add a "Delete" option so users can remove stuck or failed report records from their Dashboard. <br> 5. Implement a background health-check task that detects reports stuck in "processing" for more than 10 minutes and automatically marks them as "failed." |

---

## Test Conclusion

The testing of the AI Report Generation module in InsightFlow revealed that the core happy-path scenarios work as expected — report generation with valid PDFs, file download, concurrent requests, and input validation for missing files all function correctly. However, three significant defects were identified related to large file handling, frontend file-type validation, and pipeline failure recovery. These defects are primarily in the error-handling and edge-case coverage areas rather than in the core business logic.

**Recommendations:**
- Prioritize fixing BUG-001 and BUG-003 as they directly affect user experience and system reliability.
- Implement comprehensive input validation on both the client and server sides to prevent BUG-002 class issues.
- Add monitoring and alerting for the AI pipeline to detect and respond to API failures proactively.
- Consider adding automated regression tests for these scenarios to prevent regressions in future releases.

---

