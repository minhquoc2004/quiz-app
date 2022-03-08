
const validator = (req, res, next) => {
    const data = req.body;
    if(!data.text || !data.text.trim()){
        return res.send("A question cannot be empty");
    }
    if(!Array.isArray(data.answers)){
        return res.send("A question must have at least two answers");
    }
    for(let i=0; i < data.answers.length; i++){
        if(!data.answers[i] || !data.answers[i].trim()){
            return res.send("An answer cannot be empty")
        }
    }
    if(data.correctAnswer == undefined){
        return res.send("You must choose the correct answer")
    }
    const index = data.answers.indexOf(data.correctAnswer);
    if(index == -1){
        return res.send("Somthing wrong");
    }
    next();
}

module.exports = validator;