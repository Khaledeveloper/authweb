const bcrypt = require('bcryptjs');
const hashed = require('../keys/admin.js');
const hashpass = hashed.hash;




const hashy= async () =>{
    
    const isTruePassword = await  bcrypt.compare("atobsa90" , hashed)
    return isTruePassword;
    
}
const fhashed= async () =>{

const h = await hashy();
console.log(h);

}


fhashed();