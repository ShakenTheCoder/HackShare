const fs = require('fs');

const runPatch = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let target = "const [visitors, setVisitors] = useState(35);";
  let replacement = `const [visitors, setVisitors] = useState(35);

  useEffect(() => {
    // Only fetch on mounted client
    fetch('/api/visitors', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.count) {
          setVisitors(data.count);
        }
      })
      .catch(err => console.error("Error fetching visitors", err));
  }, []);`;
  
  if (!content.includes("fetch('/api/visitors'")) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filePath, content);
  }
}

runPatch('/Users/ioan_andrei/HackShare/frontend/app/page.tsx');
runPatch('/Users/ioan_andrei/HackShare/frontend/app/about/page.tsx');
runPatch('/Users/ioan_andrei/HackShare/frontend/app/kostly-campaign/page.tsx');
