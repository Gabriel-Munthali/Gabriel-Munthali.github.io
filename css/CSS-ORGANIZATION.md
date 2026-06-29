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
    │   ├── Toasts (644)
    │   ├── Stepper (719)
    │   ├── Floating nav (848)
    │   ├── Forms (908)
    │   ├── Tables (1136)
    │   │   └── Table toolbar (1138)
    │   ├── Modals (1516)
    │   │   ├── shell (1516)
    │   │   ├── header back button (1531)
    │   │   ├── internal spacing (1586)
    │   │   ├── width modifiers (1636)
    │   │   ├── confirm row (1674)
    │   │   ├── icons (1685)
    │   │   └── leading graphic (1730)
    │   └── Offcanvas (1806)
    │       ├── Air Datepicker z-index (1806)
    │       ├── panel (1812)
    │       └── drawer account card (2021)
    │
    ├── Content base styles (2098)
    │   ├── .component-card (2098)
    │   ├── Charts / Chart.js (2106)
    │   ├── Description lists (2317)
    │   ├── Event timeline (2381)
    │   ├── Avatar (2502)
    │   ├── Entity card (2559)
    │   ├── Page intro (2631)
    │   ├── Section jump nav (2718)
    │   ├── Tab buttons (2804)
    │   ├── Detail group (2828)
    │   └── Dashboard / in-page stats (2868)
    │
    ├── App shell (3012)
    │   ├── sidebar nav scrollbar (3280)
    │   ├── dashboard scroll (3581)
    │   └── sidebar offcanvas env toggle override (4025)
    │
    └── Page / feature blocks
        ├── Auth (4285)
        ├── Merchant Portal (4451)
        │   ├── Merchant detail layout (4453)
        │   ├── RTP detail / amount banner (4544)
        │   ├── Disbursement add drawers (4625)
        │   ├── Funds transfer (4727)
        │   ├── Collections - Request to Pay (4850)
        │   ├── Fake data (4983)
        │   ├── Accept RTP (5023)
        │   └── Sample disbursement (5066)
        ├── Admin Portal (5280)
            ├── Admin dashboard (5281)
            ├── Admin application detail (5340)
            └── Complaints / dispute detail (5452)
                └── Dispute thresholds (5546)
        └── Iconology (5589)
        └── Pitch tour (Driver.js) (5629)
```

## responsive.css

```
responsive.css
├── @media (max-width: 992px)
├── @media (min-width: 992px)
├── @media (max-width: 991.98px)
├── @media (max-width: 767.98px)
├── @media (max-width: 576px) / 575.98px
└── @media (prefers-reduced-motion: reduce)
```
