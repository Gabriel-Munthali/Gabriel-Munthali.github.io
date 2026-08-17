# CSS organization

Structure reference for `css/`. Line numbers are approximate.

```
css/
├── theme-dark.css            # dark theme token overrides (imported by style.css)
├── responsive.css            # cross-cutting breakpoints (linked after style.css)
└── style.css
    ├── @import               # Inter font, theme-dark.css
    ├── :root                 # design tokens (4-95)
    │   ├── --text-gray-50..900
    │   ├── --color-* / --bg-*        (primary, secondary, accent, danger, warning, info, success)
    │   ├── --fz-xs..3xl               (font size)
    │   ├── --fw-sm..xl                (font weight)
    │   ├── --lg-sm..lg                (line height)
    │   ├── --br-sm..3xl               (border radius)
    │   ├── --space-xs..10xl           (spacing)
    │   └── component tokens           (--chart-*, --app-main-nav-*, --modal-*, --iti-*)
    ├── body                  # global reset (97)
    │
    ├── Utilities (110)
    │   └── .text-* helpers
    │   └── mark (143)
    │
    ├── Shared components
    │   ├── Buttons (143)
    │   │   └── Text buttons (430)
    │   ├── Badges (447)
    │   ├── Alerts (510)
    │   ├── Callout banners (641)
    │   ├── Toasts (739)
    │   ├── Stepper (814)
    │   ├── Floating nav (982)
    │   │   └── Floating nav stack (1042)
    │   ├── Forms (1036)
    │   │   ├── .form-group-row (1042)   # reusable multi-field row; stacks at 576px
    │   │   └── form invalid / .form-error (danger)
    │   ├── Tables (1305)
    │   │   └── Table toolbar (1307)
    │   ├── Modals (1685)
    │   │   ├── shell (1685)
    │   │   ├── header back button (1700)
    │   │   ├── icons (1729)
    │   │   ├── leading graphic (1764)
    │   │   ├── internal spacing (1844)
    │   │   ├── width modifiers (1899)
    │   │   └── confirm row (1937)
    │   │       └── Modal footer between (1944)
    │   └── Offcanvas (1970)
    │       ├── Air Datepicker z-index (1970)
    │       ├── panel (1976)
    │       └── drawer account card (2169)
    │
    ├── Content base styles (2246)
    │   ├── .component-card (2246)
    │   ├── Charts / Chart.js (2254)
    │   ├── Description lists (2465)
    │   ├── Event timeline (2529)
    │   ├── Avatar (2650)
    │   ├── Entity card (2707)
    │   │   └── guide-card (2779)
    │   ├── Page intro (2820)
    │   │   └── Page intro center (2899)
    │   ├── Section jump nav (2907)
    │   ├── Tab buttons (2931)
    │   ├── Detail group (2955)
    │   └── Dashboard / in-page stats (2995)
    │       └── .app-dashboard-stat-icon* (reused on auth title icons)
    │
    ├── App shell (3139)
    │   ├── Sidebar brand (3175)
    │   ├── Sidebar nav (3198)
    │   ├── Sidebar nav nested (3320)
    │   ├── Sidebar footer (3365)
    │   ├── Main column (3496)
    │   │   └── dashboard scroll (3504)
    │   ├── Main nav (3531)
    │   └── Sidebar offcanvas (4184)
    │
    └── Page / feature blocks
        ├── Auth (4450)
        │   ├── layout shell (4451)        # .auth-section, .auth-header, .auth-brand-*, .auth-main
        │   ├── form content (4484)        # .auth-form-wrapper
        │   ├── title block (4493)         # .user-account-title-icon, .user-account-title*
        │   ├── password strength (4524)   # meter, status, requirements
        │   ├── auth field overrides (4678) # focus + input surface inside .auth-form-wrapper
        │   ├── OTP inputs (4704)          # .authcode-inputs, .auth-code-input
        │   ├── form footer links (4755)   # .auth-form-info
        │   ├── Cloudflare Turnstile mock (4796)
        │   ├── footer (4865)              # .auth-footer, .auth-footer-text
        │   └── Hosted checkout (4875)
        ├── Merchant Portal (4896)
        │   ├── Sandbox welcome modal (4898)
        │   ├── Merchant detail layout (4996)
        │   ├── RTP detail / amount banner (5087)
        │   ├── Disbursement add drawers (5168)
        │   ├── Funds transfer (5270)
        │   ├── Collections: Request to Pay (5393)
        │   ├── Fake data (5526)
        │   ├── Accept RTP (5566)
        │   ├── Sample disbursement (5609)
        │   └── Application progress / Submit KYC (5885)
        │       └── KYC / Onboarding (6012)
        ├── Admin Portal (6230)
        │   ├── Admin dashboard (5951)
        │   ├── Admin application detail (6010)
        │   └── Complaints / dispute detail (6122)
        │       └── Dispute thresholds (6216)
        └── Iconology (6321)
```

## Auth pages (`pages/auth/**`)

Auth form screens share one HTML structure (hub index excluded):

```
.auth-section > .container-fluid
├── .auth-header > .auth-brand-link > .auth-brand-image
├── .auth-main > .auth-form-wrapper > form | div
│   ├── .user-account-title-icon (+ .app-dashboard-stat-icon-primary)
│   ├── .user-account-title
│   ├── .user-account-description
│   ├── fields (.form-group, .form-group-row, .authcode-inputs, …)
│   ├── primary action (.button-primary)
│   ├── secondary action (.button-outline for Back)
│   └── .auth-form-info (optional links below actions)
└── .auth-footer > .auth-footer-text
```

Promote new auth-only rules under the Auth block in `style.css`. Reuse shared form and button classes first; scope overrides under `.auth-form-wrapper` when auth needs a different treatment.

## responsive.css

```
responsive.css
├── @media (max-width: 992px)
│   └── auth form width (2)
├── @media (max-width: 576px)
│   ├── auth shell spacing (9)
│   ├── auth title icon scale (22)
│   └── .form-group-row stacks to one column (32)
├── @media (min-width: 992px)
├── @media (max-width: 991.98px)
├── @media (max-width: 767.98px)
│   └── Application progress stacks; full-width CTA
├── @media (max-width: 576px) / 575.98px
└── @media (prefers-reduced-motion: reduce)
    ├── Stepper glow-pulse off
    └── Application progress glow-pulse off
```
