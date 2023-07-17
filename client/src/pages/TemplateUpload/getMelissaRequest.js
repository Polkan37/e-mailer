export default function getMelissaRequest(language, subject, html) {
    const htmlLang = "html" + (language === "ru" ? "" : `_${language}`);
    const content = {};
    content[language] = {};
    content[language][htmlLang] = html;
    if (subject) {
        const subjectKey =
            "subject" + (language === "ru" ? "" : `_${language}`);
        content[language][subjectKey] = subject;
    }
    return {
        content: content,
    };
}