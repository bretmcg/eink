# Next Steps

Ideas for improving and standardizing the project.

## 1. Standardize directory visibility

- `.articles/` is hidden, but `documents/`, `overlays/`, `themes/` are not
- Pick one convention (suggest visible directories since this isn't sensitive data)

## 2. Consolidate manifest pattern

Several index files exist: `articles.json`, `documents.json`, `card-designs.json`, `themes.json`. Consider a consistent schema:

```json
{
  "version": 1,
  "updated": "2026-01-22T09:10:00Z",
  "items": [...]
}
```

## 3. Improve `add-articles.sh`

- Validate the target file exists before writing
- Support appending (keep history of past article snapshots)
- Auto-detect latest folder in `.articles/` if no arg given

## 4. Sanitize article output filenames

Current: `Robert_Reich-Trump's_ICE_and_Hitler's_Brown_Shirts.md`

Apostrophes and special chars could cause shell/URL issues. Consider slugifying more aggressively.

## 5. Single entry point manifest

A top-level `gallery.json` that references all content types:

```json
{
  "articles": "articles.json",
  "documents": "documents.json",
  "cards": "card-designs.json",
  "themes": "themes.json"
}
```

## 6. Date folder naming

`2026-01-22__08-11` uses double underscore. Consider ISO-ish: `2026-01-22T08-11` or just keep the date without time if you only fetch once daily.
