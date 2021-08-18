/////////////////////////////////////////////////////////////////////////////////////////////////Question No. 1
// Here i'm using postgres database where "Account" is the table name 

const { Pool } = require('pg');
//Making connection with database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'dcm123',
    port: 5432,
});
//Function to add customer to the database
function addCustomer(email, password) {
    return new Promise((resolve, reject) => {
        validator(password) // First validate that password has special character or not
            .then(() => { return isEmailExist(email); }) // If password is ok then check user's email exist or not
            .catch((e) => { console.log(e) });
        pool.query("INSERT INTO Account(email,password) values($1,$2)", [email, password], (err, res) => {
            if (err) {
                reject(err);
            } else resolve("Your have successfully added!");
        });

    });

}

function isEmailExist(email) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT email FROM Account where email =$1 ", [email], (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res.rowCount) {
                    reject("Email Already exist!");
                } else resolve();
            }
        });
    });
}

function validator(passowrd) {
    return new Promise((resolve, reject) => {
        const format = "/^[!@#$%^&*()_+\-=\[\]{};':|,.<>\/?]*$/";
        if (passowrd.length >= 8) {
            for (let i = 0; i < passowrd.length; i++) {
                for (let j = 0; j < format.length; j++) {
                    if (passowrd[i] === format[j]) {
                        resolve();
                    }
                }
            }
            reject("Password should have atleast one special character!");

        } else {
            reject("Password should have atleast one special character!");
        }
    });
}
addCustomer("ravi@gmail.com", "123dd@")
    .then((data) => console.log(data))
    .catch((e) => console.log(e));