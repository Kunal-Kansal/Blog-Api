const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog',(req,res)=>{
    const {page, search} = req.query;
   Blog.find({topic: search},(err, foundBlog)=>{    
    if(err) console.log(err);
    else  {
        res.send({
        status: (foundBlog.length>0)?"success" : 'failed',
        result: (foundBlog.length>0)? foundBlog : 'not found'
    });
}})})

router.post("/blog", (req,res)=>{
    const{topic,des,pat,pby} = req.body;
    blog.create({
        topic: topic,
        description: des,
        posted_at: pat,
        posted_by: pby 
    },(err, newblog)=>{
        if(err)res.send(err)
        else{
            newblog.save()
            res.json({status: "success",result: newblog
        })
        }
    })
})

router.put('/blog/:topic',(req,res)=>{
    const {des,pat,pby} = req.body;
    Blog.findOneAndUpdate({topic:req.params.topic},
        {
            description : des,
            posted_at : pat,
            posted_by : pby,
        },{returnOrignal: false},(err,update)=>{
            if(err){res.send(err)}
            else{
                res.send({
                    status: (update)?'success' : 'failed',
                    result: (update)? update : 'notfound'
                })
            }
        })
})

router.delete('/blog/:topic',(req,res) =>{
    const{topic} = req.params;
    Blog.findOneAndDelete({topic: topic},(err,deleted)=>{
        if(err)res.send(err)
        else{
            res.send({
                status: (deleted)?'success' : 'failed',
                result: (deleted)? deleted : 'notfound'
            })
        }
    })
})

module.exports = router;