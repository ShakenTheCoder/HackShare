const fs = require('fs');
let content = fs.readFileSync('/Users/ioan_andrei/HackShare/frontend/app/page.tsx', 'utf8');

content = content.replace(
`  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Call backend to store email
    }
  };`,
`  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (response.ok) {
          setSubmitted(true);
        } else {
          console.error('Failed to submit email');
        }
      } catch (err) {
        console.error('Error submitting email', err);
      }
    }
  };`
);

fs.writeFileSync('/Users/ioan_andrei/HackShare/frontend/app/page.tsx', content);
