const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getEstimate = async (req, res) => {
  try {
    const { projectType, numPages, features, timeline, projectDetails } = req.body;

    const prompt = `You are a professional web development pricing consultant.
A client needs a price estimate for a web development project with these details:

Project Type: ${projectType}
Number of Pages: ${numPages}
Timeline: ${timeline}
Additional Features: ${features.length > 0 ? features.join(', ') : 'None'}
Project Description: ${projectDetails}

Respond with ONLY a valid JSON object. All values must be plain strings.
Use \\n to separate each item in breakdown and timeline so they appear on their own line.

Example format:
{
  "estimatedCost": "$3,000 - $5,000",
  "breakdown": "Design: $800 - $1,200\\nFrontend Development: $1,200 - $1,800\\nBackend Integration: $600 - $800\\nTesting & Deployment: $400 - $600",
  "timeline": "Week 1-2: Planning and design mockups\\nWeek 3-5: Development and build\\nWeek 6: Testing and revisions\\nWeek 7: Launch and deployment"
}

Now provide the estimate for the project described above in exactly that format:`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const estimate = JSON.parse(cleaned);
    res.json(estimate);

  } catch (error) {
    console.error('AI estimate error:', error.message);
    res.status(500).json({ message: 'Failed to generate estimate. Please try again.' });
  }
};

module.exports = { getEstimate };