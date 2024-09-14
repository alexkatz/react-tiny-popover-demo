This is a demo repo for `react-tiny-popover`. [It's live on GitHub Pages here.](https://alexkatz.github.io/react-tiny-popover-demo/)

If you want to run this repo locally, simply run `npm i` and `npm run dev` (though this repo uses the `pnpm` equivalent).

Inside, you'll find:

- `react-spring` (used internally for animation, including fading the popover in and out)
- `use-debounce` (used to fade the popover out before it leaves the DOM)
- `tailwind`(css styling)
- `jotai` (state management)
- `use-gesture` (to handle drag and hover)

The repo shows how one might integrate these tools with `react-tiny-popover` to create a smooth experience.
