const express=require('express');
const mongoose=require('mongoose');

const Product=require('./models/Product');
const Customer=require('./models/Customer');
const Order=require('./models/Order');
const port = process.env.PORT || 3000;

const Object = require('mongodb').ObjectID;
const app=express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

const dbURI="mongodb+srv://admin:admin1234@cluster0.6unm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var Publishable_Key = 'pk_test_51IpTWLSBDTaEtbuwAkL9Ah4srg7zKMKbCjayLw18JeqVGEy13NRXpaWfPU8Q0wfuBan200yv6lJAQXTYDiNBdPgm00Ax7kKpLi';
var Secret_Key = 'sk_test_51IpTWLSBDTaEtbuwEfSoY1TIjERCLc16ARrIkD1c20tI9gwYcqRqtaw4nsCpiU4f6WmIm686Eg9kP7Cn97Y0emkS00RUix2U2Y';

const stripe = require('stripe')(Secret_Key)
//Connect with mongo.
mongoose.connect(dbURI,{
        useUnifiedTopology:true,useNewUrlParser:true}
    )
    .then((result)=>{
        app.listen(port);
    })
    .catch((err)=>{
        console.log(err);
    });

//Index Page - Login
app.get('/',(req,res)=>{
    Product.find()
    .then((result)=>{
        console.log(result);
        res.render('index',{productlist:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/index',(req,res)=>{
    Product.find()
    .then((result)=>{
        console.log(result);
        res.render('index',{productlist:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get('/checkout/:id',(req,res)=>{
	const productid=Object(req.params.id);
	Product.findById(productid)
	.then((result)=>{
		console.log(result);
		res.render('checkout',{data:result});
	})
	.catch((err)=>{
		console.log(err);
	})
	
})
let total;
app.post('/checkout/placeorder',(req,res)=>{
	console.log(req.body);
	const order=new Order(req.body);
	order.save()
	.then((result)=>{
		console.log("success");
		const productId=Object(req.body.ProductId);
		Product.findById(productId)
		.then((data)=>{
			total=data.price*100;
			console.log(total);
			res.render('paymentApi',{key:Publishable_Key,price:total});
		})
		.catch((err)=>{
			console.log(err);
		})
	})
	.catch((err)=>{
		console.log(err);
	})
})

app.get('/product/:id',(req,res)=>{
    const productid = Object(req.params.id);
    Product.findById(productid)
    .then((result)=>{
        console.log(result);
        res.render('product',{data:result});
    })
    .catch((err)=>{
        console.log(err);
    })
})



/*app.get('/product',(req,res)=>{
    res.render('product');
})*/

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/registration',(req,res)=>{
	res.render('registration');
})

app.get('/login',(req,res)=>{
	res.render('login');
})

app.post('/registration',(req,res)=>{
	const customer=new Customer(req.body);
	customer.save()
	.then((result)=>{
		Product.find()
		.then((result)=>{
			console.log(result);
			res.render('index',{productlist:result});
		})
		.catch((err)=>{
			console.log(err);
		})
	})
	.catch((err)=>{
		console.log(err);
	})
})
app.get('/paymentApi/:rate', function(req, res){ 
	const price=req.params.rate;
	total = price*100;
	console.log(price);
	res.render('paymentApi',{price:total,key:Publishable_Key});
}) 

app.post('/payment', function(req, res){ 

	// Moreover you can take more details from user 
	// like Address, Name, etc from form 
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken, 
		name: 'Dhruvil Shah', 
		address: { 
			line1: 'TC 9/4 Old MES colony', 
			postal_code: '380009', 
			city: 'Ahmedabad', 
			state: 'Ahmedabad', 
			country: 'India', 
		} 
	}) 
	.then((customer) => { 

		return stripe.charges.create({ 
			amount: total,	 // Charing Rs 25 
			description: 'Buying the Products from Quick cart', 
			currency: 'INR', 
			customer: customer.id 
		}); 
	}) 
	.then((charge) => { 
		//res.send("Success") // If no error occurs 
		res.render('thankyou');

		//console.log(charge);
	}) 
	.catch((err) => { 
		res.send(err)	 // If some error occurs 
	}); 
})