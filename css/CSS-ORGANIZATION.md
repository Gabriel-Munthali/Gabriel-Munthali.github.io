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
    │
    ├── Shared components
    │   ├── Buttons (143)
    │   │   └── Text buttons (428)
    │   ├── Badges (450)
    │   ├── Alerts (513)
    │   ├── Callout banners (644)
    │   ├── Toasts (742)
    │   ├── Stepper (817)
    │   ├── Floating nav (946)
    │   ├── Forms (1006)
    │   │   └── .form-group-row (1012)   # reusable multi-field row; stacks at 576px
    │   ├── Tables (1245)
    │   │   └── Table toolbar (1247)
    │   ├── Modals (1625)
    │   │   ├── shell (1625)
    │   │   ├── header back button (1640)
    │   │   ├── internal spacing (1695)
    │   │   ├── width modifiers (1745)
    │   │   ├── confirm row (1783)
    │   │   ├── icons (1794)
    │   │   └── leading graphic (1839)
    │   └── Offcanvas (1915)
    │       ├── Air Datepicker z-index (1915)
    │       ├── panel (1921)
    │       └── drawer account card (2130)
    │
    ├── Content base styles (2207)
    │   ├── .component-card (2207)
    │   ├── Charts / Chart.js (2215)
    │   ├── Description lists (2426)
    │   ├── Event timeline (2490)
    │   ├── Avatar (2611)
    │   ├── Entity card (2668)
    │   │   └── guide-card (2631)
    │   ├── Page intro (2781)
    │   ├── Section jump nav (2806)
    │   ├── Tab buttons (2892)
    │   ├── Detail group (2916)
    │   └── Dashboard / in-page stats (2956)
    │       └── .app-dashboard-stat-icon* (reused on auth title icons)
    │
    ├── App shell (3100)
    │   ├── sidebar nav scrollbar (3368)
    │   ├── dashboard scroll (3669)
    │   └── sidebar offcanvas env toggle override (4113)
    │
    └── Page / feature blocks
        ├── Auth (4373)
        │   ├── layout shell (4376)      # .auth-section, .auth-header, .auth-main, .auth-footer
        │   ├── form content (4295)      # .auth-form-wrapper (flat, no card chrome)
        │   ├── title block (4318)         # .user-account-title*, .user-account-title-icon
        │   ├── auth field overrides (4349) # focus + input surface inside .auth-form-wrapper
        │   ├── OTP inputs (4378)          # .authcode-inputs, .auth-code-input
        │   ├── form footer links (4429)   # .auth-form-info
        │   └── Cloudflare Turnstile mock (4470)
        ├── Merchant Portal (4637)
        │   ├── Merchant detail layout (4639)
        │   ├── RTP detail / amount banner (4730)
        │   ├── Disbursement add drawers (4811)
        │   ├── Funds transfer (4913)
        │   ├── Collections - Request to Pay (5036)
        │   ├── Fake data (5169)
        │   ├── Accept RTP (5209)
        │   └── Sample disbursement (5252)
        ├── Admin Portal (5466)
        │   ├── Admin dashboard (5467)
        │   ├── Admin application detail (5526)
        │   └── Complaints / dispute detail (5638)
        │       └── Dispute thresholds (5732)
        └── Iconology (5837)
        └── Pitch tour (Driver.js) (5877)
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
├── @media (max-width: 576px) / 575.98px
└── @media (prefers-reduced-motion: reduce)
```
