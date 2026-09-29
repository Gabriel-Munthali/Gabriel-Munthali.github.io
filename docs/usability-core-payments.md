# Usability checklist: Core Payments & Merchant Management

Usability findings checklist from the September 2026 study. Tick an item when the new design covers it. Severity labels (Critical, Major, Moderate, Minor) come from the study.

**Source:** OneKhusa Usability Testing: Core Payments & Merchant Management (Lawrence Banda, UX/UI Designer, 14–15 September 2026). Tested on the functional Merchant Sandbox / UAT, not a Figma prototype.

Further reading on this format: [How to rate severity of usability problems](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/), [Usability testing 101](https://www.nngroup.com/articles/usability-testing-101/).

---

## Study snapshot

| | |
| --- | --- |
| **Goal** | Evaluate core OneKhusa workflows: developer setup (API keys, organisation ID, webhooks), financial flows (balance, request to pay, single transfer, batch CSV payroll), and admin tasks (roles and permissions). |
| **Participants** | Software developers / systems engineers, and business owners / operators (non-developer merchants). N = 7. |
| **Method** | Moderated, qualitative, semi-structured sessions. Hybrid (remote video and on-site). Sandbox / UAT with test credentials. |
| **Location** | Angel Dimension Office, Area 47, Lilongwe. |

### Research questions

1. How intuitive is primary navigation for initiating disbursements vs topping up (request to pay)?
2. Where do users expect to find account balance during their daily workflow?
3. Can users set up and understand multi-approver payout authorization levels?
4. Do API-focused personas navigate integration settings, key generation, and webhook configuration intuitively?

### Executive summary (priority recommendations)

- Reduce manual copy-and-paste steps; pursue push-to-pay as the highest-impact payment improvement.
- Add guided onboarding: first-login walkthrough or demo for business users, clearer setup guidance for developers.
- Put account balance and key status on the dashboard, and provide visible human support channels.

---

## Task success rates (lowest first)

Ordered by success rate so the worst gaps stay visible. N = 7.

| Feature area | Task | Success | Impact |
| --- | --- | --- | --- |
| Merchant & role management | Verify active permissions for a user account | 14% (1/7) | Critical |
| Merchant & role management | Locate team access and permissions controls | 29% (2/7) | Critical |
| API keys & integration | Locate Organisation ID and existing API credentials | 43% (3/7) | Major |
| Request to pay | Navigate to section and check account balance to initiate request | 43% (3/7) | Major |
| Batch disbursements | Track overall batch progress and identify individual failed payments | 43% (3/7) | Major |
| Merchant & role management | Add user and assign view-only permissions | 47% (3/7) | Major |
| API keys & integration | Verify API key status and readiness | 57% (4/7) | Moderate |
| Webhook configuration | Send test payload / verify webhook endpoint | 57% (4/7) | Moderate |
| Request to pay | Initiate MWK 3,000 request with description and reference | 57% (4/7) | Major |
| Request to pay | Locate section to verify received payment | 57% (4/7) | Moderate |
| Single transfer | Navigate to single transfer and locate source balance | 57% (4/7) | Moderate |
| Batch disbursements | Upload CSV, review errors, and approve bulk payout | 57% (4/7) | Major |
| Webhook configuration | Locate automated webhook notifications setup | 71% (5/7) | Minor |
| Single transfer | Initiate MWK 15,000 transfer to vendor account | 71% (5/7) | Minor |
| Single transfer | Verify transfer status / completion | 71% (5/7) | Minor |
| Batch disbursements | Locate batch payout file upload area | 71% (5/7) | Minor |
| API keys & integration | Generate a new API key for production | 86% (6/7) | Minor |
| Webhook configuration | Add new webhook URL and configure event triggers | 86% (6/7) | Minor |

---

## Themes and design checklist

Ticked items are already covered in this design lab. Unticked items still need work (including partial coverage).

### 1. Guided first-run experience

> “I wouldn't be able to know where I can add or remove users, give them permissions.” (Participant 5)

Primary page: [pages/merchant-portal/index.html](../pages/merchant-portal/index.html)

- [ ] First-login walkthrough (or demo environment) for business users and non-developers
- [ ] Walkthrough points to Organisation ID, API keys, webhooks, balances, and common payment tasks
- [ ] In-product tutorials or demo videos (not only external docs)
- [ ] Dashboard feels approachable for first-time users (study: clean but overwhelming / complex for non-developers)

### 2. Visible money and workflow status

> “I was expecting to see account balance here. On the dashboard.” (Participant 3)

Pages: [pages/merchant-portal/index.html](../pages/merchant-portal/index.html), [pages/merchant-portal/disbursements/batch.html](../pages/merchant-portal/disbursements/batch.html), [pages/merchant-portal/disbursements/single.html](../pages/merchant-portal/disbursements/single.html), [pages/merchant-portal/apikeys/index.html](../pages/merchant-portal/apikeys/index.html)

- [x] Account balance is prominent on the dashboard (Sandbox balance is the first stat card on home)
- [ ] Clear batch submission status after upload / approval
- [ ] Batch progress shows overall state and individual failed payments (43% success in study)
- [ ] Stronger review and error feedback before batch approval (57% success)
- [ ] API key status and readiness messaging is unambiguous (57% success)
- [ ] Individual-transfer scheduling considered alongside batch scheduling
- [ ] Transaction states have high-level visibility after request to pay and single transfer

### 3. Reduce payment-request friction

Pages: [pages/merchant-portal/collections/rtp.html](../pages/merchant-portal/collections/rtp.html), [pages/merchant-portal/collections/received.html](../pages/merchant-portal/collections/received.html)

- [ ] Push-to-pay path that avoids manual copy-and-paste of account numbers (highest-impact payment finding)
- [ ] Request to pay flow starts from a place where balance is visible (43% success)
- [x] Create request with description and reference without unnecessary friction (57% success)
- [ ] Easy path from request to verifying received payment (57% success)
- [ ] Explore stored customer details for repeat payees / payers
- [ ] Explore consented recurring or subscription payments
- [x] Primary navigation distinguishes disbursements (send) vs topping up / request to pay clearly

### 4. Roles and permissions

> “How do I tell which what each role does? I don't know what each role does.” (Participant 6)

Page: [pages/merchant-portal/users/index.html](../pages/merchant-portal/users/index.html)

- [x] Roles and permissions are a clearly named, easy-to-find area (tested product: hidden under Settings, 29% success; lab has top-level Users in the sidebar)
- [x] Role labels are clear (including labels such as Operator) (lab: Add/Edit user and Users filter use Merchant Administrator, Merchant Operator, Merchant Viewer per [User Roles](https://docs.onekhusa.com/api-reference/users/get-user-roles))
- [ ] Each role’s capabilities are explained in the UI
- [ ] User’s active role / permissions visible on their profile (14% success verifying active permissions)
- [ ] Add user and assign view-only (or other) permissions without guesswork (47% success)
- [ ] Support custom / flexible permission configuration where possible
- [ ] Multi-approver payout authorization levels are understandable if offered

### 5. Developer tooling and human support

> “Maybe a help desk number that you can as well call.” (Participant 2)
>
> “You guys did not get back to me from support. I sent 2 emails, nothing.” (Participant 2)

Pages: [pages/merchant-portal/apikeys/index.html](../pages/merchant-portal/apikeys/index.html), [pages/merchant-portal/webhooks/index.html](../pages/merchant-portal/webhooks/index.html), [pages/merchant-portal/webhooks/notifications.html](../pages/merchant-portal/webhooks/notifications.html)

- [x] Organisation ID and existing API credentials discoverable in one coherent place (43% success; study: information split across areas; lab: info callout hint + copy on [API Keys](../pages/merchant-portal/apikeys/index.html); also in Account details drawer / Profile)
- [x] Generate a new API key remains straightforward (86% success: keep this strong)
- [x] Webhook setup remains findable in sidebar / Developers (71–86% success: keep this strong)
- [ ] Clearer guidance to send a test payload and verify the endpoint (57% success)
- [ ] Webhook and API examples / docs linked from the product
- [ ] SDK languages prioritized by demand
- [ ] Visible human escalation for failed financial transactions (phone or help desk, not only chatbot)
- [ ] Dependable support response path so integrations are not abandoned after unanswered emails

---

## Research insights (reference)

1. **Visually strong, first-time usability uneven.** Clean UI; still overwhelming without prior platform knowledge.
2. **Permissions are the clearest recurring problem.** Hard to find, unclear labels, weak visibility of active permissions.
3. **Core setup information is fragmented.** Study: Organisation ID, API keys, and related items lived in different places. Lab: Organisation ID lives in Account details (Profile) and as an info callout hint on API Keys.
4. **End-user payment experience has too much manual work.** Copy-paste account numbers; users expect push-to-pay completion.
5. **Financial information and transaction states should be more visible.** Balance on dashboard; batch status; clearer API key status.
6. **Developer workflows are viable; education and support are essential.** Keys and basic webhooks work; tutorials, SDKs, webhook guidance, and human escalation still needed.

---

## How to use this file

1. Work through Critical and Major items first (roles and permissions, request to pay friction, batch status). Organisation ID / credentials discovery is covered in the lab.
2. Tick a checkbox only when the new design (or product behavior) fully addresses that finding. Note the page or pattern in the checklist line when you tick it.
3. Leave partial coverage unchecked until the gap is closed.
4. When applying a UX fix in the lab, update this file in the same change so checklist state matches the UI.
5. When promoting UI to the org design repo, use this list as the acceptance checklist for merchant-portal flows.
