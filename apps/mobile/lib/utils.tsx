export const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.substring(0, n - 1) + '...' : str;
}

export function enumToSentenceCase(enumValue: string) {
    // Split the input string by underscores
    const words = enumValue.split("_");

    // Capitalize the first letter of each word and convert the rest to lowercase
    const sentenceCaseWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join the words back together with a space between them
    return sentenceCaseWords.join(" ");
}

export const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "IN_PROGRESS":
            return "blue";
        case "FINISHED":
            return "green";
        case "NOT_STARTED":
            return "yellow";
    }
};