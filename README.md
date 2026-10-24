# TaskNest Service Marketplace

TaskNest is a responsive, multi-page service marketplace front end for finding local home-service professionals, exploring services, and making a booking enquiry.

## Pages

- `index.html` - Home page with service categories, featured providers, a rotating hero message, and a rotating hero image.
- `services.html` - Service catalogue with city and area selectors. Service enquiries carry location and service details to the provider listings.
- `providers.html` - Provider listings with matching and highlighting based on service-page query parameters.
- `booking.html` - Booking form with service/provider selection, date and time selection, a live price summary, validation, and confirmation/login modals.
- `contact.html` - Contact form with required-field validation and an on-page submission confirmation, plus contact details and social links.
- `login.html` - Front-end login form and a placeholder message for password recovery.

## Shared behavior

- Responsive navigation with a mobile menu on the main pages.
- Consistent home-page header and footer on the contact page.
- Category, provider, booking, and contact links use local HTML pages in this folder.
- Page-specific styles and scripts are kept in matching files such as `home.css` / `home.js`, `booking.css` / `booking.js`, and `contact.css` / `contact.js`.
- Images are in `images/` where local assets are used; some page images are loaded from Unsplash and need an internet connection.

## Run locally

Open `index.html` in a modern browser. No package installation or build step is required.

The forms currently provide client-side demonstration behavior only. Contact messages are not sent to a server. Login is not connected to authentication, and booking uses the browser's `localStorage` flag `isLoggedIn` to demonstrate its login-required prompt.

## Recent fixes

- Made the home page's contact links explicitly resolve to `./contact.html`.
- Updated the contact page to use the same header, responsive navigation markup, and footer structure as the home page while retaining its contact content and styling.
- Aligned the contact and booking mobile menu handlers with the shared `nav-toggle` / `nav-menu` elements and `.open` state.
- Removed unused `Service_marketplace/navigation.css` and `Service_marketplace/navigation.js`; no active page referenced them.
- Consolidated project documentation into this root README.

## Project files

```text
index.html, home.css, home.js
services.html
providers.html
booking.html, booking.css, booking.js
contact.html, contact.css, contact.js
login.html, login.css, login.js
images/
```

`Service_marketplace/` is a legacy folder and is not used by the active pages in the project root.