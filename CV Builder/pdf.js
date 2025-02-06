function showPage(pageId) {
document.querySelectorAll('.pages-container > div').forEach((page) => {
    page.classList.add('d-none');
});
document.getElementById(pageId).classList.remove('d-none');
}

function downloadTemplate(templateName) {
const link = document.createElement('a');
link.href = `templates/${templateName}`;
link.download = templateName;
link.click();
}