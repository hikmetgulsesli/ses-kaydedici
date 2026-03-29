# QA Test Report
**Date**: 2026-03-29
**Branch**: feature/prd
**Screens Tested**: 3/7
**Issues Found**: 9

## Summary
| Severity | Count |
|----------|-------|
| CRITICAL | 2 |
| HIGH     | 5 |
| MEDIUM   | 2 |
| LOW      | 0 |

## Screen Results
| # | Screen | Route | Status | Issues |
|---|--------|-------|--------|--------|
| 1 | EmptyState (Ana Sayfa) | / | PASS | 0 |
| 2 | ErrorState | /error | PASS | 0 |
| 3 | NotFound | /* (recordings, studio, settings) | FAIL | 2 |
| 4 | SES LABORATUVARI | /studio | FAIL | 2 |
| 5 | Kayıt Listesi | /recordings | FAIL | 2 |
| 6 | Ayarlar | /settings | FAIL | 2 |
| 7 | RecordingDetail | /recordings/:id | FAIL | 1 |

## Issues Detail

### CRITICAL
1. **[Ayarlar] Page is non-existent** — /settings returns 404 page instead of Settings screen
2. **[Kayıt Listesi] Page is non-existent** — /recordings returns 404 page instead of RecordingList screen

### HIGH
1. **[Studio] Page is non-existent** — /studio returns 404 page instead of RecordingStudio screen
2. **[RecordingDetail] Page is non-existent** — /recordings/:id returns 404 page instead of RecordingDetail screen
3. **[Home] Bottom nav links are dead** — All 3 nav links (Kitaplık, Kaydet, Ayarlar) use href="#" and do not navigate
4. **[Home] EmptyState button non-functional** — "Kayıt Yapmaya Başla" button has no wired handler (onStartRecording prop is passed but clicking does nothing)
5. **[Home] Settings icon non-functional** — Header settings button has no click handler or navigation

### MEDIUM
1. **[Home] Color token mismatch** — Active nav uses `--color-primary-container` (#22c55e) but design-tokens.css defines primary as `--color-primary` (#4be277); App.css overrides active state to use primary-container
2. **[Error] Bottom nav links are dead** — All 4 nav links use href="#" and do not navigate

## Root Cause Analysis

**Routing not configured**: App.tsx only defines 3 routes: `/`, `/error`, and `*` (NotFound). The actual screen components (RecordingStudio, RecordingList, RecordingDetail, Settings) exist in `src/screens/` but are NOT registered in the router. All routes for these screens fall through to the NotFound page.

**Navigation links dead**: BottomNav in EmptyState uses `href="#"` instead of React Router `<Link>` components. The `onStartRecording` callback is passed to EmptyState but the button's onClick only calls it once — subsequent clicks do nothing because the handler isn't re-invoked properly.

**Settings icon dead**: The settings button in HomePage's header has no onClick handler wired to navigate to `/settings`.

## Screens Tested
- / (EmptyState with hasRecordings=false)
- /error (ErrorState)
- /* (NotFound — covers /recordings, /studio, /settings, /recordings/:id which all return 404)
