<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Careers role content lives in `src/lib/careers-data.ts` and feeds the index and individual `/careers/$role` pages, keeping opportunity details consistent in one place.
Case-study text and per-study capabilities live in `src/lib/case-studies-data.ts`, while project artwork is mapped by ID in `src/lib/case-study-media.ts`, so the library and each detail page stay consistent.
Internal navigation feedback is rendered once in the root shell through `PageTransitionLoader`, keeping route transitions consistent without duplicating page-level loading UI.
The homepage platform showcase uses one shared tabbed split-stage: film on the left and platform narrative on the right, stacking vertically on mobile to preserve legibility.
AWS Amplify builds use the Nitro `aws-amplify` preset and convert relative CDN asset pointers to the public media origin before compilation so SSR, server routes, images, and videos remain deployable together.
