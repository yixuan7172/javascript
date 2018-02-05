//是否是有效的JSON
const isValidJson = obj => {
    try {
        JSON.parse(obj)
        return true
    } catch (e) {
        return false
    }
}
let json = "{'a':1}"
console.log(JSON.stringify(num));
console.log(json);
console.log(isValidJson(json));