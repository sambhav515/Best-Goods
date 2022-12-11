var express = require('express');
var router = express.Router();
var pool=require("./pool")
var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
/* GET users listing. */
router.get('/adminlogin', function(req, res, next) {
   res.render('loginform',{message:'',status:false})
});

router.get('/adminlogout', function(req, res, next) {
    localStorage.removeItem('ADMIN')
    res.redirect('/admin/adminlogin')
 });
router.get('/dashboard', function(req, res, next) {
   var query="select count(*) as countcategory from category;select count(*) as countproducts,sum(stock) as countstock from products;select count(*) as countbrands from brands;"
   pool.query(query,function(error,result){
   if(error)
   { console.log(error)
      res.render('dasboard',{status:false,message:'Server Error',result:[]})
   }
   else
   {
      console.log("xxxxxx",result[0][0].countcategory)
      var admin=JSON.parse(localStorage.getItem('ADMIN'))
      res.render('dasboard',{admin:admin ,status:false, message:'Server Error',result:result})
   }

   })
   
});




router.post('/check_admin_login', function(req, res, next) {
   pool.query("select * from admins where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
    if(error)
    { console.log(error)
      res.render('loginform',{message:'Server Error',status:true})
    }
    else
    {if(result.length==1)
      { localStorage.setItem('ADMIN',JSON.stringify(result[0]))
         res.redirect('/admin/dashboard')
      }
      else
      { res.render('loginform',{message:'Invalid Emailid/Mobileno/Password',status:true})}

    }
   


   })

   
});


module.exports = router;
