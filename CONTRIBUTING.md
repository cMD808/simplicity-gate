# Contributing to Simplicity Gate

Thanks for your interest in making AI agents less over-engineered. Here's how to contribute.

## Ways to Contribute

### Add an Example

The most valuable contribution. Show a real-world case where a lower tier beats a higher one.

1. Fork the repo
2. Create `examples/your-example.md` following the template below
3. Submit a pull request

**Example template:**

```markdown
# Example: [Title] — [Higher Tier] vs [Lower Tier]

## Scenario
What is the agent proposing to build?

## Proposal
YAML block with the proposal details (tier, tool, dependencies, requirements).

## Proposed Solution (Tier N — REJECTED)
The over-engineered version. Show the actual code.

## Recommended Solution (Tier M — PASS)
The simpler version. Show the actual code.

## Verdict
The formatted gate verdict.

## When [Higher Tier] IS Justified
When the higher tier is actually the right choice.
```

### Add Agent Support

Test Simplicity Gate with a new agent and document the integration:

1. Create or identify the agent's instruction file location
2. Add a row to the Quick Start table in `README.md`
3. Verify the agent follows the tier hierarchy correctly
4. Submit a PR with your findings

### Improve the Skill

- Clarify ambiguous rules
- Add new tiers or adjust tier boundaries
- Improve verdict formatting
- Add edge cases to `SKILL.md`

### Report Issues

- False PASS verdicts (lower tier was available but not caught)
- False REJECT verdicts (higher tier was necessary but blocked)
- Missing tiers or tools in the hierarchy

## Guidelines

- **Be specific.** Show actual code, not abstract descriptions.
- **Be honest.** If a higher tier is justified, say so and explain why.
- **Keep it simple.** The examples should be short and clear.
- **One example per file.** Don't combine multiple scenarios.

## Development

No build step needed. This is a markdown-based skill.

To test with an agent:
1. Copy `SKILL.md` into the agent's instruction file
2. Ask the agent to evaluate a proposal
3. Check the verdict
4. If wrong, file an issue or improve the rules

## Code of Conduct

Be kind. We're all trying to write less code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
