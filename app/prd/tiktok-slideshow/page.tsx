export default function TikTokSlideshowPRD() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">&larr; Back to AutoFlux</a>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            TikTok Slideshow Generator
          </h1>
          <p className="text-xl text-gray-400">Product Requirements Document</p>
        </div>

        {/* PRD Content */}
        <div className="prose prose-invert prose-lg max-w-none">

          {/* Introduction */}
          <section className="mb-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Introduction/Overview</h2>
            <p className="text-gray-300 mb-4">
              The TikTok Slideshow Generator is a web application that allows users to create viral-style TikTok slideshows for their products by analyzing existing viral TikTok slideshows and replicating their visual style, text fonts, and structure. Users provide a viral TikTok link and their product photos, and the system generates new slideshow images that match the viral content&apos;s aesthetic while featuring the user&apos;s product.
            </p>
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
              <p className="text-purple-200 font-medium">
                <strong>Problem Solved:</strong> Creating viral TikTok slideshow content requires design skills and understanding of trending styles. This tool automates the process by cloning the style of proven viral content and applying it to new products.
              </p>
            </div>
          </section>

          {/* Goals */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Goals</h2>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span className="text-gray-300">Enable users to generate TikTok slideshow images that match the style of viral content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span className="text-gray-300">Reduce content creation time from hours to minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span className="text-gray-300">Allow batch generation of multiple variations for A/B testing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <span className="text-gray-300">Provide seamless output delivery via Google Drive</span>
              </li>
            </ol>
          </section>

          {/* User Stories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">User Stories</h2>
            <div className="grid gap-4">
              {[
                { role: "product seller", want: "paste a viral TikTok slideshow link and have the system analyze its style", so: "I can replicate what's already working" },
                { role: "content creator", want: "upload my product photos and have AI generate hook/body slides in the viral style", so: "I don't need design skills" },
                { role: "marketer", want: "generate multiple variations of each slide type", so: "I can test different versions and find what converts best" },
                { role: "user", want: "receive my generated images and audio in a Google Drive folder", so: "I can easily access and upload them to TikTok" },
              ].map((story, i) => (
                <div key={i} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-gray-300">
                    <span className="text-pink-400 font-medium">As a {story.role}</span>, I want to {story.want}, <span className="text-blue-400">so {story.so}</span>.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Functional Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Functional Requirements</h2>

            <div className="space-y-8">
              {/* Input Collection */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Input Collection (Web Form)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Accept viral TikTok slideshow URL as input</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Accept product photos upload (up to 10 images)</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Accept folder name for organizing output</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Allow specifying variations: Hook (1 base), Body (4 base), Product (1 base)</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Display uploaded product photos for preview</li>
                </ul>
              </div>

              {/* TikTok Analysis */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">TikTok Analysis &amp; Extraction</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Extract individual slide images using RapidAPI</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Extract audio track from viral TikTok</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Categorize slides: hook, body, product (dynamic count)</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Extract all slides as Gemini reference inputs</li>
                </ul>
              </div>

              {/* AI Image Generation */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">AI Image Generation (Gemini 2.0 Flash)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> <strong>Single-Step Style Transfer:</strong> Send original to Gemini, match visual style + text font style with new contextual text</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> <strong>Hook Slide:</strong> Generate matching viral hook style adapted for user&apos;s product</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> <strong>Body Slides:</strong> Generate matching each viral body slide style</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> <strong>Product Slide:</strong> Apply text overlay matching viral style (no image gen)</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Max 5 variations per slide type</li>
                </ul>
              </div>

              {/* Output & Storage */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Output &amp; Storage</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Create Google Drive folder with user-specified name</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Upload all generated images</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Upload extracted audio file</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Provide direct link to Drive folder</li>
                  <li className="flex items-start gap-2"><span className="text-green-400">&#10003;</span> Service account auth (no per-user OAuth)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Non-Goals */}
          <section className="mb-12 p-6 bg-red-900/20 rounded-xl border border-red-800">
            <h2 className="text-2xl font-bold text-white mb-4">Non-Goals (Out of Scope)</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2"><span className="text-red-400">&#10007;</span> Video rendering - generates images only</li>
              <li className="flex items-start gap-2"><span className="text-red-400">&#10007;</span> Direct TikTok posting - manual upload required</li>
              <li className="flex items-start gap-2"><span className="text-red-400">&#10007;</span> Audio editing - extracted as-is</li>
              <li className="flex items-start gap-2"><span className="text-red-400">&#10007;</span> User authentication - single-user access</li>
              <li className="flex items-start gap-2"><span className="text-red-400">&#10007;</span> Scheduling/automation - one-off generation</li>
              <li className="flex items-start gap-2"><span className="text-red-400">&#10007;</span> Analytics/tracking</li>
            </ul>
          </section>

          {/* Technical Considerations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Considerations</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">APIs &amp; Services</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong>Gemini 2.0 Flash</strong> - Image generation</li>
                  <li><strong>RapidAPI TikTok Scraper</strong> - Extract slides/audio</li>
                  <li><strong>Google Drive API</strong> - Storage (service account)</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Architecture</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong>Backend:</strong> Python (Flask/FastAPI)</li>
                  <li><strong>Frontend:</strong> Simple HTML/CSS/JS</li>
                  <li><strong>Storage:</strong> Google Drive via service account</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Key Technical Challenges</h3>
              <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                <li>Style transfer via Gemini - ensuring accurate replication of visual + text font style</li>
                <li>Slide categorization - auto-identifying hook vs body vs product slides</li>
                <li>Contextual text generation - matching vibe while being product-appropriate</li>
              </ol>
            </div>
          </section>

          {/* Success Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Success Metrics</h2>
            <div className="grid gap-4">
              {[
                { metric: "95%+", desc: "TikTok slideshow URL extraction success rate" },
                { metric: "Visual Match", desc: "Generated images match viral source style" },
                { metric: "Font Accuracy", desc: "Text fonts/styles accurately replicated" },
                { metric: "< 5 min", desc: "Complete generation time for standard requests" },
                { metric: "100%", desc: "Successful Google Drive uploads with working links" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <span className="text-2xl font-bold text-green-400 min-w-[100px]">{item.metric}</span>
                  <span className="text-gray-300">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Open Questions */}
          <section className="mb-12 p-6 bg-blue-900/20 rounded-xl border border-blue-800">
            <h2 className="text-2xl font-bold text-white mb-4">Open Questions</h2>
            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
              <li>How should the system handle rate limits from TikTok scraper or Gemini API?</li>
              <li>Should slide categorization (hook/body/product) be automatic or user-defined?</li>
              <li>What product context should the user provide for AI text generation?</li>
            </ol>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-sm">PRD by AutoFlux | Building AI Automation Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}
