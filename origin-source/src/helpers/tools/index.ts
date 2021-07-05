import XLSX from 'xlsx';

/**
 * 
 * @param {url} string 
 * @returns {object} 
 */
interface IUrl {
    (url?: string):object
};

   
var getAllUrlParams: any = function (url:string):any {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj:any = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName;
            if (typeof paramValue === 'string') paramValue = paramValue;

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var value:any = /\[(\d+)\]/.exec(paramName);
                    var index=value[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}
export const encodeBase64  = function(rawString:string){
    return new Buffer(rawString).toString('base64');
}

export const decodeBase64 = function(encodedString:string){
    return new Buffer(encodedString, 'base64').toString();
} 
export const currencyFormat = function(num:any) {
    if(typeof num == "string"){
       return  num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    else if (typeof num == "number"){
       return   num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+" vnđ"
    }
    return ""
}

export const exportFile=(data:any)=> {
    const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
};

export function toASCII(alias = '') {
    var str = alias
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|\]|~|$|-|_/g, "-")
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/ + /g, " ") //thay thế 2- thành 1-
    str = str.replace(/^ +| +$/g, "")
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
    return str
}

export function cleanQueryParams(query:any){
    for (var propName in query) {
        if (!query[propName]) {
          delete query[propName];
        }
      }
      return query 
}
export default {
    exportFile,
    getAllUrlParams,
    currencyFormat,
    encodeBase64,
    decodeBase64,
    toASCII,
    cleanQueryParams
}