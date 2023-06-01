export default function calculateGrade(totalMarks, obtainedMarks) {
    const percentage = (obtainedMarks / totalMarks) * 100;

    if (percentage >= 85) {
        return 'A+';
    } else if (percentage >= 80) {
        return 'A';
    } else if (percentage >= 75) {
        return 'B+';
    } else if (percentage >= 70) {
        return 'B';
    } else if (percentage >= 65) {
        return 'C+';
    } else if (percentage >= 60) {
        return 'C';
    } else if (percentage >= 55) {
        return 'D+';
    } else if (percentage >= 50) {
        return 'D';
    } else {
        return 'F';
    }
}