# Anormos

Anormos builds operational platforms, intelligent software, and digital products for consequential work. This project contains the Anormos website, including its services, platforms, case studies, careers, and contact pages.

## Development

Install the project dependencies and start the development server:

```sh
bun install
bun run dev
```

## AWS Amplify Hosting

The repository includes `amplify.yml` for a server-rendered Amplify deployment. Connect the repository in Amplify Hosting; the build produces the required `.amplify-hosting` output and rewrites hosted media pointers to their public CDN origin.

Add `LOVABLE_API_KEY` as a server-side Amplify environment variable to keep the conversational agent available. All pages, images, and videos work without additional AWS storage configuration.
