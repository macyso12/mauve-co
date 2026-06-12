<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0 (initial ratification)
Added principles:
  - I. Code Quality
  - II. Testing Standards (NON-NEGOTIABLE)
  - III. User Experience Consistency
  - IV. Performance Requirements
Added sections:
  - Quality Gates
  - Governance
Templates reviewed:
  - .specify/templates/plan-template.md  ✅ Constitution Check section present; performance/testing fields align
  - .specify/templates/spec-template.md  ✅ Success Criteria section supports measurable UX/perf outcomes
  - .specify/templates/tasks-template.md ✅ Test-first task ordering and Polish phase align with principles
Deferred items: none
-->

# mauve-co Constitution

## Core Principles

### I. Code Quality

Every piece of code merged to the main branch MUST meet the following baseline:

- Code MUST be readable: names are self-explanatory; logic is linear where possible.
- Functions and modules MUST have a single, well-defined responsibility (SRP).
- Duplication MUST be eliminated at the abstraction boundary — three or more identical
  blocks MUST be extracted; fewer than three SHOULD remain inline.
- All public interfaces MUST be typed (static types, contracts, or schemas).
- Code MUST pass linting and formatting checks in CI with zero warnings suppressed
  without explicit justification in a code comment.
- Complexity MUST be justified: any cyclomatic complexity above 10 in a single function
  MUST be accompanied by a comment explaining why it cannot be simplified.

### II. Testing Standards (NON-NEGOTIABLE)

Test-driven development is mandatory for all feature work:

- Tests MUST be written before implementation (TDD Red-Green-Refactor cycle).
- A PR MUST NOT be merged if any test it touches was written after the implementation
  it covers, unless the PR is a pure bug fix with a regression test.
- Unit tests MUST cover all public functions and MUST assert on behavior, not
  implementation details.
- Integration tests MUST cover every inter-service boundary and every user-facing flow.
- Contract tests MUST be written for any shared schema, API endpoint, or event payload
  that crosses a module boundary.
- Test coverage MUST not decrease on any PR; the baseline is enforced by CI.
- Flaky tests MUST be fixed or quarantined within one sprint of detection; they MUST
  NOT be silently skipped.
- Every failing test suite MUST block merge — no exceptions, no `--skip` overrides
  in CI without an approved incident justification.

### III. User Experience Consistency

All user-facing surfaces MUST conform to a single, coherent design and interaction model:

- Visual language MUST follow the established design system (tokens, spacing, typography,
  color palette). Ad-hoc styles that bypass the system are prohibited.
- Interaction patterns MUST be consistent: the same user action MUST produce the same
  result everywhere in the product (e.g., a destructive action always requires
  confirmation; navigation always follows the same hierarchy).
- Error messages MUST be human-readable, actionable, and consistent in tone and format.
  Technical stack traces MUST never be exposed to end users.
- Accessibility MUST meet WCAG 2.1 AA as a minimum for all new UI work.
- All user-facing copy MUST be reviewed for clarity before merge; placeholder text
  (e.g., "Lorem ipsum", "[TODO]") MUST NOT reach production.
- New UX patterns that deviate from existing conventions MUST be documented in the
  design system and approved before implementation begins.

### IV. Performance Requirements

Performance is a feature and MUST be treated as a first-class concern:

- API endpoints and page loads MUST meet defined p95 latency targets before a feature
  ships. Default targets (unless overridden per feature): **200 ms p95** for API,
  **2 s p95** for full page load on a median device.
- Background jobs and batch processes MUST define and document throughput targets in
  their feature spec.
- Performance regressions of more than **10%** against the established baseline MUST
  block merge. Baselines are tracked in CI via load/benchmark tests.
- Memory usage MUST not grow unboundedly; any feature introducing unbounded state
  MUST implement eviction, pagination, or streaming.
- Third-party dependencies MUST be evaluated for bundle size and runtime overhead
  before adoption; additions that increase the production bundle by more than **5%**
  require explicit approval.

## Quality Gates

Every PR MUST pass the following gates before merge:

1. **Code Quality**: Linting, formatting, and type-check CI jobs are green.
2. **Test Coverage**: Coverage does not decrease; all tests pass.
3. **Performance**: No benchmark regression > 10% vs. baseline.
4. **UX Review**: Any UI change has been reviewed against the design system.
5. **Constitution Check**: The plan template's Constitution Check section has been
   filled and all applicable principles are satisfied or violations are documented
   in the Complexity Tracking table.

## Governance

- This constitution supersedes all team conventions, wiki pages, and verbal agreements.
- Amendments require: (a) a written proposal describing the change and rationale,
  (b) approval from at least two senior contributors, and (c) a migration plan for
  existing code that violates the new rule.
- The constitution version follows semantic versioning:
  - **MAJOR**: A principle is removed or redefined in a backward-incompatible way.
  - **MINOR**: A new principle or section is added, or guidance is materially expanded.
  - **PATCH**: Clarifications, wording fixes, or non-semantic refinements.
- All PRs and code reviews MUST verify compliance with the applicable principles.
- Complexity MUST be justified; if a rule cannot be followed, the reason MUST be
  documented in the Complexity Tracking table of the relevant plan.

**Version**: 1.0.0 | **Ratified**: 2026-06-12 | **Last Amended**: 2026-06-12
