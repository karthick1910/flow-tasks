const express = require('express')

const app = express()

app.use(express.json())

const fs =require("fs"); 

const jsonfile = 'file.json'


app.post('/list_books', (req,res) =>{
    fs.readFile(jsonfile, function(err, data){  
        if(err) throw err; 
        var books = JSON.parse(data);
        if ( books.length === 0 ) {
            res.send({'message': 'No books found'})
        }else {
            res.send(books);
        }
    }); 
});


app.post('/add_book', (req, res) => {
    fs.readFile(jsonfile, function(err, data){  
        if(err) throw err; 
        
        var books = JSON.parse(data);
        let new_book = req.body
        books.push(new_book)

        fs.writeFileSync(jsonfile, JSON.stringify(books));

        res.send("successfully inserted")
    })
})



app.post('/delete_book', (req, res) => {
    fs.readFile(jsonfile, function(err, data){ 
        
        if(err) throw err; 
  
        let author = req.body.author
        var books = JSON.parse(data);
        var books = books.filter(book => {
            return book['author'] != author;
        })

        fs.writeFileSync(jsonfile, JSON.stringify(books));

        res.send("successfully deleted")
    })
})




app.listen(process.env.PORT || 5000);




