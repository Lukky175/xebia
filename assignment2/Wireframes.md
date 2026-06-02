# Wireframes — Internship Management Platform

> **Platform:** Internship Management Platform  
> **Deliverable:** Wireframe Documentation  
> **Screens covered:** Login / Sign-up · Student Dashboard · Company / Recruiter Dashboard

---

## Screen 1 — Login / Sign-up

### Purpose
The entry point for all users. Lets returning users log in and new users register as either a Student or a Company. Role selection at sign-up determines which dashboard the user lands on.

---

### Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              [ Platform logo + tagline ]                    │
│                                                             │
│         ┌───────────────────────────────────┐              │
│         │                                   │              │
│         │   [ Tab: Log in | Sign up ]        │              │
│         │                                   │              │
│         │   Email ________________________  │              │
│         │                                   │              │
│         │   Password _____________________  │              │
│         │                                   │              │
│         │   [ Log in / Create account ]     │              │
│         │                                   │              │
│         │   ── or continue with ──          │              │
│         │         [ Google ]                │              │
│         │                                   │              │
│         │   Forgot password?                │              │
│         └───────────────────────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

> Sign-up view adds: Full name · Role selector (Student / Company) · College or Company name

---

### Components

#### Logo + Tagline
| Element | Description |
|---|---|
| Platform logo | Top-center, above the card |
| Tagline | Short one-liner e.g. "Find your next internship. Hire the best talent." |

---

#### Auth Card (centered, fixed width ~420px)

**Tab switcher — Log in / Sign up**
- Two tabs at the top of the card
- Clicking switches the form fields below without a page reload

---

**Log in form fields:**

| Field | Type | Validation |
|---|---|---|
| Email | Text input | Required, valid email format |
| Password | Password input | Required, min 8 characters |
| Log in button | Primary CTA | Submits the form |
| Forgot password | Text link | Sends reset email |

---

**Sign-up form fields (additional):**

| Field | Type | Notes |
|---|---|---|
| Full name | Text input | Required |
| I am a… | Toggle / radio | Student · Company — determines dashboard on redirect |
| College name | Text input | Shown only when Student is selected |
| Company name | Text input | Shown only when Company is selected |
| Create account button | Primary CTA | Triggers email verification |

---

#### Social Auth
- "Continue with Google" button

---

#### Role-based redirect after login
| Role selected | Redirects to |
|---|---|
| Student | Student Dashboard (Screen 2) |
| Company | Recruiter Dashboard (Screen 3) |

---

### User Actions on this Screen
- Log in with email + password
- Sign up as Student or Company
- Authenticate via Google
- Reset forgotten password

---
---

## Screen 2 — Student Dashboard

### Purpose
The central hub for students to track applications, discover new internships, manage their profile, and monitor their active internship progress.

---

### Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (left)       │  MAIN CONTENT AREA (right)          │
│  160px wide           │  Flexible width                     │
│                       │                                     │
│  [ Avatar + Name ]    │  [ Stats Row — 4 cards ]            │
│  [ Dashboard ]        │                                     │
│  [ Browse listings ]  │  [ Application Tracker ] [ Sidebar ]│
│  [ My applications ]  │  [ Recommended listings]  panels   │
│  [ Work diary ]       │                                     │
│  [ Certificates ]     │                                     │
│  [ My profile ]       │                                     │
│  [ Settings ]         │                                     │
└─────────────────────────────────────────────────────────────┘
```

---

### Components

#### Sidebar
| Element | Description |
|---|---|
| Avatar + Name | Initials circle, student name, year and branch |
| Navigation links | Dashboard, Browse listings, My applications, Work diary, Certificates, My profile, Settings |
| Active state | Highlighted background on current page link |

---

#### Stats Row (4 metric cards)
| Card | Metric | Color signal |
|---|---|---|
| Applied | Total applications submitted | Neutral |
| Shortlisted | Companies that moved student forward | Blue (info) |
| Interviews | Scheduled interview count | Amber (warning) |
| Profile % | Profile completion percentage | Green (success) |

---

#### Application Tracker
Displays the student's recent applications as a list. Each row contains:

- Company logo / initial badge
- Role name and company name
- Date applied
- Status badge — one of: `Under review` · `Shortlisted` · `Interview` · `Offer received` · `Rejected`

**Status badge color mapping:**

| Status | Color |
|---|---|
| Under review | Gray |
| Shortlisted | Blue |
| Interview | Amber |
| Offer received | Green |
| Rejected | Red |

---

#### Recommended Listings
A 2-column card grid showing AI-matched internships based on the student's profile. Each card shows:

- Role title
- Company name · Location · Stipend
- "Apply" button (1-click apply)

---

#### Right Panel — 3 stacked widgets

**1. Next interview countdown**
- Company name and role
- Date and time of interview
- "Prep tips" button linking to AI interview coach

**2. Profile strength bar**
- Horizontal progress bar (e.g. 82% filled)
- Prompt showing what to add to reach 100%

**3. Notifications feed**
- Vertical list of recent activity
- Color-coded left border per notification type (blue = shortlist, amber = interview, gray = general)

---

### User Actions on this Screen
- View and filter application statuses
- One-click apply to recommended listings
- Navigate to interview prep
- Complete profile from the prompt

---
---

## Screen 3 — Company / Recruiter Dashboard

### Purpose
Allows recruiters to post internship listings, manage the hiring pipeline visually, track active interns, and view hiring analytics.

---

### Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (left)       │  MAIN CONTENT AREA (right)          │
│  152px wide           │  Flexible width                     │
│                       │                                     │
│  [ Company logo ]     │  [ Stats Row — 4 cards ]            │
│  [ Overview ]         │                                     │
│  [ Post listing ]     │  [ Kanban Pipeline — full width ]   │
│  [ Applicants ]       │                                     │
│  [ Active interns ]   │  Applied │ Shortlisted │ Interview  │
│  [ Analytics ]        │          │             │ Offered    │
│  [ Settings ]         │                                     │
└─────────────────────────────────────────────────────────────┘
```

---

### Components

#### Sidebar
| Element | Description |
|---|---|
| Company logo + name | Square logo badge, company name, verified badge |
| Navigation links | Overview, Post listing, Applicants, Active interns, Analytics, Settings |

---

#### Stats Row (4 metric cards)
| Card | Metric | Color signal |
|---|---|---|
| Active listings | Currently open internship posts | Neutral |
| Applications | Total received across all listings | Blue |
| Interviews set | Scheduled interview slots | Amber |
| Active interns | Currently onboarded interns | Green |

---

#### Kanban Hiring Pipeline
The core feature of this screen. A 4-column Kanban board showing candidates at each stage for a selected listing.

**Columns:**

| Column | Color accent | Contents |
|---|---|---|
| Applied | Gray | All incoming applicants, count badge |
| Shortlisted | Blue | Candidates moved forward by recruiter |
| Interview | Amber | Candidates with scheduled interviews |
| Offered | Green | Candidates who received offer letters |

**Each candidate card shows:**
- Candidate name
- College name and CGPA / key skill
- Interview time (in the Interview column)
- Acceptance status (in the Offered column)

**Recruiter actions per card:**
- Drag card to move between columns
- Click card to open full candidate profile
- Schedule interview (generates a video link + notifies student)
- Send offer letter (digital, in-platform)

---

#### "Post New Listing" Button
Persistent in the top-right of the main area. Opens a form with:
- Role title
- Domain / department
- Duration (weeks/months)
- Location (remote / hybrid / on-site)
- Stipend amount
- Required skills (tag input)
- Application deadline

---

### User Actions on this Screen
- Post and manage internship listings
- Move candidates through the hiring pipeline
- Schedule interviews with auto-notification to students
- Send digital offer letters
- View active interns and their task progress

---
---

## Summary Table — All Screens

| Screen | Primary user | Core feature | Key actions |
|---|---|---|---|
| Login / Sign-up | All users | Role-based auth + registration | Log in, sign up as Student or Company, OAuth |
| Student dashboard | Student | Application tracker + recommendations | Apply, track status, prep for interview |
| Recruiter dashboard | Company recruiter | Kanban hiring pipeline | Post listing, shortlist, schedule, offer |

---

## Design Notes

- **Layout pattern:** All screens use a fixed left sidebar + flexible main content area.
- **Color system:** Status colors are consistent across all screens — blue = info/shortlisted, amber = warning/interview, green = success/offer, red = danger/urgent.
- **Responsiveness:** On smaller screens, the sidebar collapses to an icon-only rail; stat cards stack to 2×2.
- **Accessibility:** All status information is conveyed by both color and label text (not color alone).
- **Navigation:** Breadcrumbs appear on nested pages (e.g. Recruiter > Applicants > Anika T.)
