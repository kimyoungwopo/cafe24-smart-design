# Contributing

Thanks for improving Cafe24 Smart Design references.

## Development

```bash
npm install
npm run check
```

## Registry rules

- Add new modules to `data/modules.json`.
- Add new variables to `data/variables.json`.
- Add new modifiers to `data/modifiers.json`.
- Include a source field for every entry. Add `verification` only when an official example has been checked: `status: official_example`, `sourceUrl`, `verifiedAt` (YYYY-MM-DD), and a precise `scope`. An absent field means verification is not recorded, not that the item is invalid.
- Run `npm run validate:data` before opening a PR.

## Documentation

The Markdown files in `references/` are the human-readable reference. Keep them aligned with `data/` until full generation is added. Run `npm run sync:docs` after changing registry counts; `npm run check` checks those summary counts.

## Pull requests

Use small PRs and include:

- What changed
- Source/verification notes
- Test output
