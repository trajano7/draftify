export function saveDraft(draft) {
    localStorage.setItem("draft", JSON.stringify(draft));
}

export function getDraft() {
    return JSON.parse(localStorage.getItem("draft")) || [];
}

export function clearDraft() {
    localStorage.removeItem("draft");
}
