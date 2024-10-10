import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const GIT_DIR = '.git-like';
const OBJECTS_DIR = path.join(GIT_DIR, 'objects');
const HEAD_FILE = path.join(GIT_DIR, 'HEAD');
const INDEX_FILE = path.join(GIT_DIR, 'index');

function init() {
  if (fs.existsSync(GIT_DIR)) {
    console.log('Git-like repository already initialized.');
    return;
  }
  fs.mkdirSync(GIT_DIR);
  fs.mkdirSync(OBJECTS_DIR);
  fs.writeFileSync(HEAD_FILE, '');
  fs.writeFileSync(INDEX_FILE, '');
  console.log('Initialized empty Git-like repository');
}

function add(files = ['.']) {
  const index = new Set(fs.readFileSync(INDEX_FILE, 'utf-8').split('\n').filter(Boolean));
  files.forEach(file => {
    if (file === '.') {
      addDirectory('.');
    } else if (fs.statSync(file).isDirectory()) {
      addDirectory(file);
    } else {
      index.add(file);
    }
  });
  fs.writeFileSync(INDEX_FILE, Array.from(index).join('\n'));
  console.log('Added files to index');
}

function addDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      addDirectory(filePath);
    } else {
      const index = new Set(fs.readFileSync(INDEX_FILE, 'utf-8').split('\n').filter(Boolean));
      index.add(filePath);
      fs.writeFileSync(INDEX_FILE, Array.from(index).join('\n'));
    }
  });
}

function commit(message) {
  if (!message) {
    console.error('Please provide a commit message');
    return;
  }
  const index = fs.readFileSync(INDEX_FILE, 'utf-8').split('\n').filter(Boolean);
  const commitHash = crypto.createHash('sha1').update(Date.now().toString()).digest('hex');
  const commitDir = path.join(OBJECTS_DIR, commitHash);
  fs.mkdirSync(commitDir);
  index.forEach(file => {
    const content = fs.readFileSync(file);
    fs.writeFileSync(path.join(commitDir, file), content);
  });
  fs.writeFileSync(path.join(commitDir, 'message'), message);
  fs.writeFileSync(HEAD_FILE, commitHash);
  fs.writeFileSync(INDEX_FILE, '');
  console.log(`Created commit ${commitHash}`);
}

function status() {
  const index = new Set(fs.readFileSync(INDEX_FILE, 'utf-8').split('\n').filter(Boolean));
  console.log('Changes to be committed:');
  index.forEach(file => console.log(`  ${file}`));
}

function log() {
  const head = fs.readFileSync(HEAD_FILE, 'utf-8').trim();
  if (!head) {
    console.log('No commits yet');
    return;
  }
  const commits = fs.readdirSync(OBJECTS_DIR);
  commits.reverse().forEach(commit => {
    const message = fs.readFileSync(path.join(OBJECTS_DIR, commit, 'message'), 'utf-8');
    console.log(`commit ${commit}`);
    console.log(message);
    console.log();
  });
}

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'init':
    init();
    break;
  case 'add':
    add(args);
    break;
  case 'commit':
    commit(args[0]);
    break;
  case 'status':
    status();
    break;
  case 'log':
    log();
    break;
  default:
    console.log('Unknown command');
}