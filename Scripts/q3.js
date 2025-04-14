document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const textInput = document.getElementById('text-input');
    const analysisResults = document.getElementById('analysis-results');

    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        if (!text) {
            alert('Please enter some text to analyze.');
            return;
        }

        // Basic text statistics
        const letters = text.replace(/[^a-zA-Z]/g, '').length;
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaces = text.split(' ').length - 1;
        const newlines = (text.match(/\n/g) || []).length;
        const specialChars = text.replace(/[a-zA-Z0-9\s\n]/g, '').length;

        // Pronouns list (common English pronouns)
        const pronouns = [
            'i', 'me', 'my', 'mine', 'myself',
            'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself',
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            'this', 'that', 'these', 'those',
            'who', 'whom', 'whose', 'which', 'what'
        ];

        // Prepositions list (common English prepositions)
        const prepositions = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'as', 'at',
            'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
            'concerning', 'considering',
            'despite', 'down', 'during',
            'except',
            'for', 'from',
            'in', 'inside', 'into',
            'like',
            'near',
            'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
            'past',
            'regarding',
            'since',
            'through', 'throughout', 'to', 'toward',
            'under', 'underneath', 'until', 'unto', 'up', 'upon',
            'with', 'within', 'without'
        ];

        // Indefinite articles
        const articles = ['a', 'an'];

        // Count pronouns
        const pronounCounts = {};
        const wordsInText = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        wordsInText.forEach(word => {
            if (pronouns.includes(word.toLowerCase())) {
                pronounCounts[word] = (pronounCounts[word] || 0) + 1;
            }
        });

        // Count prepositions
        const prepositionCounts = {};
        wordsInText.forEach(word => {
            if (prepositions.includes(word.toLowerCase())) {
                prepositionCounts[word] = (prepositionCounts[word] || 0) + 1;
            }
        });

        // Count articles
        const articleCounts = {};
        wordsInText.forEach(word => {
            if (articles.includes(word.toLowerCase())) {
                articleCounts[word] = (articleCounts[word] || 0) + 1;
            }
        });

        // Display results
        let resultsHTML = `
            <div class="result-section">
                <h3>Basic Text Statistics</h3>
                <div class="result-item">
                    <span>Letters:</span>
                    <span>${letters}</span>
                </div>
                <div class="result-item">
                    <span>Words:</span>
                    <span>${words}</span>
                </div>
                <div class="result-item">
                    <span>Spaces:</span>
                    <span>${spaces}</span>
                </div>
                <div class="result-item">
                    <span>Newlines:</span>
                    <span>${newlines}</span>
                </div>
                <div class="result-item">
                    <span>Special Characters:</span>
                    <span>${specialChars}</span>
                </div>
            </div>
        `;

        // Add pronouns section
        resultsHTML += `
            <div class="result-section">
                <h3>Pronouns Count</h3>
                <div class="result-grid">
        `;
        
        Object.entries(pronounCounts).sort((a, b) => b[1] - a[1]).forEach(([pronoun, count]) => {
            resultsHTML += `
                <div class="grid-item">
                    <strong>${pronoun}:</strong> ${count}
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
            </div>
        `;

        // Add prepositions section
        resultsHTML += `
            <div class="result-section">
                <h3>Prepositions Count</h3>
                <div class="result-grid">
        `;
        
        Object.entries(prepositionCounts).sort((a, b) => b[1] - a[1]).forEach(([preposition, count]) => {
            resultsHTML += `
                <div class="grid-item">
                    <strong>${preposition}:</strong> ${count}
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
            </div>
        `;

        // Add articles section
        resultsHTML += `
            <div class="result-section">
                <h3>Indefinite Articles Count</h3>
                <div class="result-grid">
        `;
        
        Object.entries(articleCounts).sort((a, b) => b[1] - a[1]).forEach(([article, count]) => {
            resultsHTML += `
                <div class="grid-item">
                    <strong>${article}:</strong> ${count}
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
            </div>
        `;

        analysisResults.innerHTML = resultsHTML;
        
        // Scroll to results
        analysisResults.scrollIntoView({ behavior: 'smooth' });
    });
});