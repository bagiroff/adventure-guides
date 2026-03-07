This template converts a Feature Specification into an implementation task list.

The goal is to produce a step‑by‑step plan suitable for a junior developer.

LLM Workflow
1. Receive Input
Input:

FEATURES/<feature>.md
2. Phase 1 — Generate Parent Tasks
Create high‑level tasks only.

Always include:

0.0 Create feature branch
Typical number of parent tasks:

4–6
After generating parent tasks, stop and ask:

I have generated the high‑level tasks.
Respond with "Go" to generate the detailed sub‑tasks.
3. Phase 2 — Generate Sub‑Tasks
After confirmation, expand each parent task into smaller steps.

Each sub‑task should:

be actionable

correspond to a real code change

be small enough to implement safely

Output Location
TASKS/tasks-[feature-name].md
Example:

TASKS/tasks-prompt-logging.md
Task List Structure
## Relevant Files

- app/services/prompt_logger.py - Logging implementation
- app/routers/generate.py - Endpoint modification
- tests/test_prompt_logging.py - Unit tests for logging

### Notes

- Tests should be placed alongside the code when possible.
- Use pytest to execute tests.

---

## Instructions for Completing Tasks

IMPORTANT:

Update the checklist as tasks are completed.

Example:

- [ ] 1.1 Implement logging
→
- [x] 1.1 Implement logging

---

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 git checkout -b feature/<feature-name>

- [ ] 1.0 Implement logging service
  - [ ] 1.1 Create logging module
  - [ ] 1.2 Implement prompt capture

- [ ] 2.0 Integrate logging into API
  - [ ] 2.1 Update endpoint handler
  - [ ] 2.2 Add latency measurement

- [ ] 3.0 Add tests
  - [ ] 3.1 Create test cases
  - [ ] 3.2 Validate log output

- [ ] 4.0 Documentation
  - [ ] 4.1 Update README
  - [ ] 4.2 Document configuration
Interaction Model
The AI must pause after generating parent tasks and wait for:

Go
before generating sub‑tasks.

This ensures the implementation plan is validated before expanding details.

Target Audience
Assume the reader is a junior developer implementing the feature.

Tasks must therefore be:

explicit

ordered

unambiguous

Features define capabilities.

Tasks define implementation work.