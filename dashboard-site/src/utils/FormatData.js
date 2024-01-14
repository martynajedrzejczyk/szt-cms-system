export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month < 10 ? `0${month}` : month; // Fix the expression by assigning the formatted month value back to the 'month' variable
    let day = d.getDate(); // Assign the formatted day value back to the 'day' variable
    day = day < 10 ? `0${day}` : day; // Fix the expression by assigning the formatted day value back to the 'day' variable

    //and hours, minutes, seconds ...
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}