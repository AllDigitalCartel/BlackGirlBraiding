#!/usr/bin/env node
/**
 * One command, both destinations.
 *
 *   npm run ship -- "what changed"
 *
 * Commits everything, pushes to every git remote, then deploys to Firebase.
 * The Firebase deploy runs the predeploy hook in firebase.json, which is the
 * real build, so the sitemap and the heading audit cannot be skipped.
 *
 * If any push fails the deploy does not run: GitHub and Firebase are meant to
 * agree, and a deploy whose source is not on GitHub breaks that.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (cmd, quiet = false) =>
  execSync(cmd, { stdio: quiet ? 'pipe' : 'inherit', encoding: 'utf8' });
const read = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const message = process.argv.slice(2).join(' ').trim();
const branch = read('git rev-parse --abbrev-ref HEAD');
const remotes = read('git remote').split('\n').filter(Boolean);

if (!remotes.length) {
  console.error('No git remotes. Nothing to push to.');
  process.exit(1);
}

// 1. Commit, if there is anything to commit.
if (read('git status --porcelain')) {
  if (!message) {
    console.error('Uncommitted changes need a message:  npm run ship -- "what changed"');
    process.exit(1);
  }
  run('git add -A');
  // The message goes through a file, never through the shell. Passing it as an
  // argument put it inside double quotes, where /bin/sh expanded $60 and $800
  // into nothing and JSON escaping turned real newlines into literal \n. Two
  // commit messages in this repo's history lost their prices that way.
  const msgFile = join(tmpdir(), `ship-msg-${process.pid}.txt`);
  writeFileSync(msgFile, message.endsWith('\n') ? message : message + '\n', 'utf8');
  try {
    run(`git commit -F ${JSON.stringify(msgFile)}`);
  } finally {
    try { unlinkSync(msgFile); } catch {}
  }
  console.log(`\nCommitted on ${branch}.`);
} else {
  console.log(`\nNothing to commit on ${branch}, shipping what is already here.`);
}

// 2. Push everywhere before deploying.
for (const remote of remotes) {
  console.log(`\nPushing to ${remote}...`);
  run(`git push ${remote} ${branch}`);
}

// 3. Deploy. predeploy in firebase.json runs the full build.
console.log('\nDeploying to Firebase...\n');
run('firebase deploy --only hosting');

const url = read('node -e "import(\'./src/data/site.js\').then(m=>console.log(m.default.origin))"');
console.log(`\nLive: ${url}`);
console.log(`On GitHub: ${remotes.join(', ')} (branch ${branch})`);
