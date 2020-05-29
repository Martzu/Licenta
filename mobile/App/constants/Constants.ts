

export const GOOGLE_API_KEY = 'AIzaSyBDlY8RJxrk2UVf2dSe5Z9Ults6ylGqUVE';

export const DRIVING = 'DRIVING';

export const WALKING = 'WALKING';

export const BACKEND_URL = 'http://192.168.1.2:8080';

export const BICYCLING = 'BICYCLING';

let displayFromText;
export default displayFromText = (textToDisplay: string) => {
    let result;
    const splitElements = textToDisplay.split(" ");
    if(splitElements.length > 4){
        let abbreviation = '';
        splitElements.forEach(element => abbreviation += element[0] !== 's' ? element[0].toUpperCase() + '.' : '');
        result = abbreviation.substring(0, abbreviation.length - 1);
    }
    else{
        result = textToDisplay;
    }
    return result;
};
