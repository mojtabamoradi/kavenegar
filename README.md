# Kavenegar API Lab

A zero-build API playground made with semantic HTML, CSS, and vanilla JavaScript. No React or framework runtime is used.

The explorer covers the 50 routes currently exposed by the public SDK clients, organized into eight expandable topics. Every route generates package-native examples for .NET, Go, Java, Node.js, PHP, and Python.

`sms/makereceive` remains in the portable REST reference but is intentionally excluded because none of the six current SDK clients exposes a public method for it.

Developer-console features include inferred wire-type badges, native input modes, required-first forms, collapsible optional parameters, copyable cURL requests, reset/clear actions, cancellable requests, and animated loading/response states with reduced-motion support.

## Extend the endpoint catalog

Endpoints are declared with the `E(...)` helper at the top of `app.js`:

```javascript
E('unique-id', 'Topic name', 'Endpoint label', 'POST', 'resource/method', [
  F('parameter', 'Parameter label', 'Example value', true),
]);
```

The explorer automatically creates a collapsible topic, searchable navigation item, request form, live request, and six language examples. No navigation markup or rendering code needs to change.

## Run locally

Serve this directory with any static server. For example:

```powershell
npx serve .
```

Then open the printed local URL. Opening `index.html` directly also works in browsers that allow API requests from `file:` pages.

The API key is held in memory only. It is not written to local storage, session storage, logs, generated examples, or the DOM-visible endpoint URL.

If a browser blocks direct Kavenegar requests due to CORS policy, deploy the static app behind a same-origin server-side API proxy. Never put a long-lived API key in proxy source code.
