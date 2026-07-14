const express = require("express");
const app=express();
const path=require("path");
const fs=require("fs");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


app.get("/",(req,res)=>{
    fs.readdir('./Notes',(err,Notes)=>{
        res.render('index',{Notes:Notes});
    })
})

app.get("/edit/:file",(req,res)=>{
    res.render('edit',{old:req.params.file,fileTitle:req.params.file})
})

app.get("/Notes/:filename",(req,res)=>{
   fs.readFile(`./Notes/${req.params.filename}`,"utf-8",(err,data)=>{
        res.render('show',{title:req.params.filename ,data:data})
    })
})
 
app.post('/editing',(req,res)=>{
    fs.rename(`./Notes/${req.body.oldName}`,`./Notes/${req.body.newName.split(' ').join('')}`,(err)=>{
       if(err)throw err;
       else{res.redirect('/')}
    })
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./Notes/${req.body.title.split(' ').join('')}.txt`,req.body.description,(err)=>{
        res.redirect('/')
    })
})

app.listen(3000);