
export function isMailValid(email){
	if(email.length < 8 || email.length > 30) return false;
	if(email.indexOf("@") < 2) return false;
	if(email.split('@').length > 2) return false;
	return true;	
}

export function isNameValid(name){
	if(name.length < 2 || name.length > 20) return false;
	if(name.indexOf('*') > -1 || name.indexOf('$') > -1 
	|| name.indexOf('&') > -1 || name.indexOf('#') > -1 
	|| name.indexOf("\\") > -1 || name.indexOf('@') > -1 ){
	return false;
	}
	return true;	
}
export function getCurrentDate() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = '0' + (date.getMonth()+1);
    const day = '0' + date.getDate();
    const currentDate = day.substr(-2) + '/' + month.substr(-2) + '/' + year;
    return currentDate;
}
export function getCurrentHour() {
    const date = new Date();
    const hour = '0' + date.getHours()
    const minute = '0' + date.getMinutes();
    const currentHour = hour.substr(-2) + ':' + minute.substr(-2);
    return currentHour;
}

export function pushData(path, data, firebaseDb) {
    let dataToPush = firebaseDb.child(path);
    dataToPush.push(data); 
}