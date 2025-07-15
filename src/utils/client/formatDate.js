export const formatDate = (dateString) => {
    if (!dateString) return "To be Updated";
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}