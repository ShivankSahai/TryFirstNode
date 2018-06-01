let express=require('express')
let hbs=require('hbs')
let fs=require('fs')

let app=express()

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')

app.use((request,response,next)=>{
    let now=new Date().toString()
    let log=`${now} ${request.method} ${request.url}`
    console.log(log)

    fs.appendFileSync('server.log',log+'\n')

    next()
})

// app.use((request,response,next)=>{
//     response.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})
app.get('/',(request,response)=>{
    // response.send('<h1>Hello Express!</h1>')
    response.render('home.hbs',{
        hello: 'Hey there!',
        name:'Khalnayak',
        age:19,
        aboutPageTitle: 'Home Page',
    })
})

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        aboutPageTitle: 'About us Shivank' 
    })
})

app.get('/bad',(request,response)=>{
    response.send({
        errorMessage: 'Something went wrong'
    })
})

app.listen(3000)