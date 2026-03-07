import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS_SRC = path.join(ROOT, '.agents', 'skills');
const CLAUDE_SKILLS = path.join(ROOT, '.claude', 'skills');
const COPILOT_PROMPTS = path.join(ROOT, '.github', 'prompts');

const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function log(symbol: string, color: string, message: string) {
  console.log(`  ${color}${symbol}${RESET} ${message}`);
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function upsertSymlink(linkPath: string, target: string, label: string) {
  if (fs.existsSync(linkPath)) {
    const existing = fs.readlinkSync(linkPath);
    if (existing === target) {
      log('~', YELLOW, `${label} — up-to-date`);
      return;
    }
    fs.unlinkSync(linkPath);
  }
  fs.symlinkSync(target, linkPath);
  log('✓', GREEN, `${label} — created`);
}

function removeOrphanSymlinks(dir: string, validNames: Set<string>, toName: (entry: string) => string | null) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const skillName = toName(entry);
    if (skillName === null) continue;
    if (!validNames.has(skillName)) {
      fs.unlinkSync(path.join(dir, entry));
      log('✗', RED, `${entry} — removed stale`);
    }
  }
}

function isSymlink(p: string) {
  try {
    return fs.lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}

// Discover skills
const skillDirs = fs.readdirSync(SKILLS_SRC).filter((name) => fs.statSync(path.join(SKILLS_SRC, name)).isDirectory());

const skillNames = new Set(skillDirs);

ensureDir(CLAUDE_SKILLS);
ensureDir(COPILOT_PROMPTS);

// Remove orphaned symlinks before creating new ones
removeOrphanSymlinks(CLAUDE_SKILLS, skillNames, (entry) => {
  const p = path.join(CLAUDE_SKILLS, entry);
  return isSymlink(p) ? entry : null;
});

removeOrphanSymlinks(COPILOT_PROMPTS, skillNames, (entry) => {
  if (!entry.endsWith('.prompt.md')) return null;
  const p = path.join(COPILOT_PROMPTS, entry);
  return isSymlink(p) ? entry.replace(/\.prompt\.md$/, '') : null;
});

// Upsert symlinks for each skill
console.log(`\nSyncing ${skillDirs.length} skill(s)...\n`);

for (const name of skillDirs) {
  // Claude: directory symlink → .agents/skills/<name>
  const claudeLink = path.join(CLAUDE_SKILLS, name);
  const claudeTargetAbs = path.join(SKILLS_SRC, name);
  const claudeTarget = path.relative(path.dirname(claudeLink), claudeTargetAbs);
  upsertSymlink(claudeLink, claudeTarget, `.claude/skills/${name}`);

  // Copilot: file symlink → .agents/skills/<name>/SKILL.md
  const copilotLink = path.join(COPILOT_PROMPTS, `${name}.prompt.md`);
  const copilotTargetAbs = path.join(SKILLS_SRC, name, 'SKILL.md');
  const copilotTarget = path.relative(path.dirname(copilotLink), copilotTargetAbs);
  upsertSymlink(copilotLink, copilotTarget, `.github/prompts/${name}.prompt.md`);
}

console.log('\nDone.\n');
