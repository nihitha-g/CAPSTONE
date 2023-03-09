 const express = require('express')
const routes = express.Router()
const compiler = require('compilex')

const bodyParser = require('body-parser')
routes.use(bodyParser.urlencoded({ extended: false }))

routes.use(bodyParser.json())
var option = {stats : true};
compiler.init(option);

routes.post('/compilecode',function(req,res){
    console.log(req.body)
    var code = req.body.code;	
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    
    if((lang === "C") || (lang === "C++"))
    {        
        if(inputRadio === "true")
        {    
        	var envData = { OS : "linux" , cmd : "g++"};	   	
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
        			res.send(data.error);    		
        		}
        		else
        		{
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {
	   	
	   	var envData = { OS : "linux" , cmd : "g++"};	   
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
        		res.send(data.error);
        	}    	
        	else
        	{
        		res.send(data.output);
        	}
    
            });
	   }
    }
    if(lang === "Java")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "linux" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                res.send(data);
            });

        }

    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
                console.log("hi")
            });            
        }
        else
        {
            console.log("python")
            var envData = { OS : "linux"};
            compiler.compilePython(envData , code , function(data){
                console.log(data)
                res.send(data)
            });
        }
    }
    if( lang === "CS")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compileCSWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "linux"};
            compiler.compileCS(envData , code , function(data){
                res.send(data);
            });
        }

    }
    
    if( lang === "VB")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compileVBWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "linux"};
            compiler.compileVB(envData , code , function(data){
                res.send(data);
            });
        }

    }
})

routes.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        console.log(data)
    });
});

module.exports = routes