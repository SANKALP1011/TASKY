module.exports = CurrentDate;

function CurrentDate(){
    var Today = new Date();
    let Represntation = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    var dateToString = Today.toLocaleDateString("en-us",Represntation);
    return dateToString;
}