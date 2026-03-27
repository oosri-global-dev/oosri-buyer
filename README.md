## Oosri Buyer Frontend

# Clone the repo
git clone https://github.com/oosri-global-dev/oosri-buyer.git
# Move to a new branch
cd oosri-buyer
# To start the project
npm run dev

## Deployment environment variables

Set these in Netlify for `oosri-buyer` before deploying:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

If `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is omitted, Google login/register will stay visible but disabled and the app will not initialize Google OAuth.
