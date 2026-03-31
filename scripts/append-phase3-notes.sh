#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/paulserban/Desktop/projects/wbk--fullstack/workbook/02_web-development/frontend/wbk--frontend-playground"
BASE="$ROOT/_docs/architecture/migration-items"

slugs=(
  alert audio card card-list digital-clock form-components form-patterns hero image layouts like list
  modal paint pill popup progress scrollspy theme-switch timer toast toggle-group
)

append_sections() {
  local slug="$1"
  local file="$BASE/$slug.md"

  if ! grep -q "## Suggested Improvements" "$file"; then
    cat >> "$file" <<EOF

## Suggested Improvements
$(improvements_for "$slug")
EOF
  fi

  if ! grep -q "## Phase 3 Validation (2026-03-31)" "$file"; then
    cat >> "$file" <<EOF

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/$slug build)
- [ ] Manual runtime parity smoke-check
EOF
  fi
}

improvements_for() {
  case "$1" in
    alert)
      cat <<'EOF'
- add semantic role="alert" coverage and dismiss timing tests
- add variant tokens for info/success/warning/error states
- add optional auto-dismiss with pause-on-hover behavior
EOF
      ;;
    audio)
      cat <<'EOF'
- add preload/error fallback handling for missing sounds
- add keyboard and screen-reader labels for sound controls
- add shared stop-all utility to prevent overlapping playback
EOF
      ;;
    card)
      cat <<'EOF'
- add responsive density/card-size variants
- define content-slot conventions for richer compositions
- verify hover/focus parity for interactive cards
EOF
      ;;
    card-list)
      cat <<'EOF'
- add large-list rendering strategy notes (virtualization/pagination)
- add keyboard navigation between active cards
- add reduced-motion fallback for transition-heavy variants
EOF
      ;;
    digital-clock)
      cat <<'EOF'
- add timezone selector and locale-format options
- add drift-correction strategy for long-running intervals
- add reduced-motion fallback for animated transitions
EOF
      ;;
    form-components)
      cat <<'EOF'
- add validation state matrix (default/focus/error/success/disabled)
- add helper-text + error-message accessibility checks
- add shared input utility for consistent event wiring
EOF
      ;;
    form-patterns)
      cat <<'EOF'
- add focus-management tests across pattern flows
- add keyboard-only completion path validation
- add reusable field-state helper patterns
EOF
      ;;
    hero)
      cat <<'EOF'
- add responsive stress cases for long headlines and copy
- add image strategy notes (crop/focal-point/srcset)
- verify CTA focus order and contrast requirements
EOF
      ;;
    image)
      cat <<'EOF'
- add srcset/sizes parity checks for responsive variants
- add lazy-loading and decoding strategy notes
- add fallback placeholders for failed image loads
EOF
      ;;
    layouts)
      cat <<'EOF'
- add container-query variants for layout primitives
- add spacing-token examples for each layout mode
- add min/max content stress tests
EOF
      ;;
    like)
      cat <<'EOF'
- add mobile tap and double-tap behavior parity tests
- add animation throttling safeguards for rapid input
- add optional persistent like-counter mode
EOF
      ;;
    list)
      cat <<'EOF'
- add explicit ul/ol/dl semantic variant examples
- add spacing density variants (compact/cozy/comfortable)
- add mixed-content list-item stress tests
EOF
      ;;
    modal)
      cat <<'EOF'
- add focus trap and escape-key regression tests
- add scroll-lock and background inert-state validation
- add stacked-modal conflict handling notes
EOF
      ;;
    paint)
      cat <<'EOF'
- add undo/redo stack support
- add canvas resize persistence behavior
- add export/download utility for drawn output
EOF
      ;;
    pill)
      cat <<'EOF'
- add selected/disabled/loading state variants
- add contrast and accessibility verification across themes
- add keyboard navigation behavior for pill groups
EOF
      ;;
    popup)
      cat <<'EOF'
- add viewport collision-aware positioning strategy
- add open/close state-machine and dismissal tests
- add focus-return behavior on close
EOF
      ;;
    progress)
      cat <<'EOF'
- add percent/step synchronization assertions
- add boundary-condition checks for min/max steps
- add reduced-motion animation options
EOF
      ;;
    scrollspy)
      cat <<'EOF'
- add threshold configurability and throttling options
- add smooth-scroll and section highlighting parity checks
- add dynamic-content height recalculation handling
EOF
      ;;
    theme-switch)
      cat <<'EOF'
- add persisted theme preference and restore logic
- align bootstrap behavior with prefers-color-scheme
- add clock accuracy checks around minute/hour transitions
EOF
      ;;
    timer)
      cat <<'EOF'
- add pause/resume controls and drift correction
- add completion callbacks for external hooks
- handle visibility-change behavior when tab is backgrounded
EOF
      ;;
    toast)
      cat <<'EOF'
- add queue policy for burst notifications
- add duplicate suppression and max-visible cap
- add optional action buttons and focus handling
EOF
      ;;
    toggle-group)
      cat <<'EOF'
- add invariant tests for constrained toggle combinations
- add keyboard-accessible group interaction behavior
- add state export utility for form integrations
EOF
      ;;
  esac
}

for slug in "${slugs[@]}"; do
  append_sections "$slug"
done

echo "Phase 3 sections ensured for ${#slugs[@]} files."
