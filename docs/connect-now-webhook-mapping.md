# /connect-now webhook mapping reference

`/connect-now` is a copy of `/connect` that fires its own GoHighLevel inbound
webhook, so the two pages can be routed, tagged, and reported on separately
while sending the identical payload shape.

| | |
| --- | --- |
| Page | `https://getappointly.co/connect-now` (noindex, follow) |
| Code | `app/connect-now/apply-client.tsx` |
| Webhook | `https://services.leadconnectorhq.com/hooks/bv8PsVl3lvidD0j8bBqP/webhook-trigger/69c59715-edb9-4231-bf64-1d2b255fa681` |
| Method | `POST`, `Content-Type: application/json`, `keepalive: true` |
| Fires when | The visitor submits step 4 of the qualification modal |
| Also fires | Meta Pixel `Lead`, immediately before the POST |
| Then | The modal swaps to the GHL booking widget, prefilled |

The POST is fire and forget. A failed request is logged to the console as
`connect-now webhook failed:` and never blocks the booking widget, so a lead can
reach the calendar even if the webhook is down. Treat the calendar booking, not
the webhook, as the source of truth for whether a call exists.

## Sample payload

Every key is always present. Fields the visitor did not supply, and tracking
values that were not on the landing URL, arrive as empty strings rather than
being omitted, so the GHL field mapping stays stable across requests.

```json
{
  "first_name": "Dave",
  "last_name": "Van Otten",
  "phone": "(616) 555-0142",
  "email": "dave@vanottencoatings.com",
  "role": "Owner / CEO",
  "revenue": "$500K - $1M Per Year",
  "reps": "1-3 reps",
  "fbclid": "IwAR2xQ9abcdEFGhijkLMNop",
  "fbc": "fb.1.1758412800000.IwAR2xQ9abcdEFGhijkLMNop",
  "fbp": "fb.1.1758412800000.1234567890",
  "utm_source": "facebook",
  "utm_medium": "paid",
  "utm_campaign": "fc-apply-broad-0925",
  "utm_term": "",
  "utm_content": "vsl-hook-b",
  "source": "connect-now-page",
  "page_url": "https://getappointly.co/connect-now?utm_source=facebook&utm_medium=paid&utm_campaign=fc-apply-broad-0925&utm_content=vsl-hook-b&fbclid=IwAR2xQ9abcdEFGhijkLMNop"
}
```

## Field mapping

| Payload key | Maps to in GHL | Type | Notes |
| --- | --- | --- | --- |
| `first_name` | First Name | Standard | First whitespace-separated word of the name field |
| `last_name` | Last Name | Standard | Everything after the first word. Empty if they typed one word |
| `phone` | Phone | Standard | **As typed**, not normalized. See the gotcha below |
| `email` | Email | Standard | Required by the form, so never empty |
| `role` | Role | Custom, single line | One of four fixed values, listed below |
| `revenue` | Annual Revenue | Custom, single line | One of four fixed values, listed below |
| `reps` | Sales Reps | Custom, single line | One of four fixed values, listed below |
| `fbclid` | Meta Click ID | Custom, single line | Empty unless the visitor arrived from a Meta ad |
| `fbc` | Meta fbc Cookie | Custom, single line | Read from the `_fbc` cookie. Needed for CAPI matching |
| `fbp` | Meta fbp Cookie | Custom, single line | Read from the `_fbp` cookie. Needed for CAPI matching |
| `utm_source` | UTM Source | Custom, single line | |
| `utm_medium` | UTM Medium | Custom, single line | |
| `utm_campaign` | UTM Campaign | Custom, single line | |
| `utm_term` | UTM Term | Custom, single line | Usually empty on Meta traffic |
| `utm_content` | UTM Content | Custom, single line | Ad or creative level, when the URL carries it |
| `source` | Lead Source | Custom, single line | Always the literal `connect-now-page`. This is the field that separates this page from `/connect`, which sends `apply-page` |
| `page_url` | Landing Page URL | Custom, multi line | Full URL including the query string, captured on load |

Map `source` first. A single workflow filter on `source = connect-now-page`
gives you this page's leads without touching the `/connect` automation.

### Fixed option values

Map these to dropdowns only if the dropdown options match these strings
character for character, otherwise keep them as single line text fields.

| Field | Values |
| --- | --- |
| `role` | `Owner / CEO`, `Marketing or Sales Leader`, `Salesperson`, `Other` |
| `revenue` | `$0 - $500K Per Year`, `$500K - $1M Per Year`, `$1M - $5M Per Year`, `$5M+ Per Year` |
| `reps` | `I run all the leads myself`, `1-3 reps`, `4-10 reps`, `10+ reps` |

### Phone format gotcha

The payload sends the phone exactly as the visitor typed it, for example
`(616) 555-0142` or `616-555-0142`. Only the booking widget prefill is
normalized to E.164 (`+16165550142`). If Lead Connector SMS is expected to fire
off this contact, either normalize the number inside the GHL workflow or change
the POST in `app/connect-now/apply-client.tsx` to send
`normalizePhone(phone)`, which is already defined in that file.

### Attribution timing

`readTracking()` runs once on page load, so the UTM and Meta values describe the
URL the visitor landed on, not the URL at submit time. A visitor who lands with
UTMs and then navigates within the page still reports the original values.

## Registering the payload in GHL

GHL learns the field list from a sample request. Fire one into the trigger
before mapping anything:

```bash
curl -X POST \
  "https://services.leadconnectorhq.com/hooks/bv8PsVl3lvidD0j8bBqP/webhook-trigger/69c59715-edb9-4231-bf64-1d2b255fa681" \
  -H "Content-Type: application/json" \
  -d @docs/connect-now-sample-payload.json
```

Then open the workflow, choose Inbound Webhook as the trigger, and the keys
above appear as mappable fields. Delete the test contact afterward, and keep it
out of any reporting window you care about.
