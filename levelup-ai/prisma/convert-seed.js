const fs = require('fs');

// Read the seed file
let content = fs.readFileSync('./seed.ts', 'utf8');

// Replace testCases arrays with JSON.stringify
content = content.replace(/testCases: \[([\s\S]*?)\],\n    hints:/g, (match, cases) => {
  return `testCases: JSON.stringify([${cases}]),\n    hints:`;
});

// Replace hints arrays with JSON.stringify
content = content.replace(/hints: \[([\s\S]*?)\],\n    xpReward:/g, (match, hints) => {
  return `hints: JSON.stringify([${hints}]),\n    xpReward:`;
});

// Replace tags arrays with comma-separated strings
content = content.replace(/tags: \[([\s\S]*?)\],\n  \},/g, (match, tags) => {
  const tagList = tags.match(/"([^"]+)"/g);
  if (tagList) {
    const tagString = tagList.map(t => t.replace(/"/g, '')).join(',');
    return `tags: "${tagString}",\n  },`;
  }
  return match;
});

fs.writeFileSync('./seed-converted.ts', content);
console.log('Conversion complete! Check seed-converted.ts');
