import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[8,"Blog title must contain at least 8 characters !"], 
        maxLength:[40,"Blog title cannot exceed 40 characters !"],
    },
    mainImage:{
       public_id:{  
        type:String,
        required:true,
       },
       url:{
        type:String,
        required:true,
       },
    },
    intro:{
        type:String,
        required:true,
        minLength:[250,"Blog intro must contain at least 250 characters !"], 
        
    },
    paraOneImage:{
        public_id:{  
            type:String,
           },
           url:{
            type:String,
           },
    },
    paraOneDescription:{
        type:String,
        minLength:[100,"Description must contain at least 100 characters !"], 
        
    }, 
    paraOneTitle:{
        type:String,
        minLength:[20,"Blog title must contain at least 20 characters !"],
    },
 paraTwoImage:{
        public_id:{  
            type:String,
           },
           url:{
            type:String,
           },
    },
    paraTwoDescription:{
        type:String,
        minLength:[100,"Description must contain at least 100 characters !"], 
        
    }, 
    paraTwoTitle:{
        type:String,
        minLength:[20,"Blog title must contain at least 20 characters !"],
    },
    paraThreeImage:{
        public_id:{  
            type:String,
           },
           url:{
            type:String,
           },
    },
    paraThreeDescription:{
        type:String,
        minLength:[100,"Description must contain at least 100 characters !"], 
        
    }, 
    paraThreeTitle:{
        type:String,
        minLength:[20,"Blog title must contain at least 20 characters !"],
    },
    category:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    authorName:{
        type:String,
        required:true,
    },
    authorAvatar:{
        type:String,
        required:true,
    },
    published:{
        type:Boolean,
        default:false,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export const Blog = mongoose.model("Blog", blogSchema);