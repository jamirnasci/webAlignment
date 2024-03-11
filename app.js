const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const NW = require('./algorithms/NeedlemanWunsch')
const app = express()

app.use(express.static('views'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "views/index.html"))
})

app.post('/align', (req, res)=>{
    
    let seq1 = (req.body.seq1).replaceAll('\n', '')
    let seq2 = (req.body.seq2).replaceAll('\n', '')
    let match = Number(req.body.match)
    let mismatch = Number(req.body.mismatch)
    let gap = Number(req.body.gap)
    
    let [al1, al2, matches, totalGaps, score] = NW.alignment(seq1, seq2, match, mismatch, gap)
    let formatedSequences = NW.formatAlignment(al1, al2)
    console.log(formatedSequences)
    res.send(JSON.stringify({
        alignment:formatedSequences,
        matches:matches,
        totalGaps:totalGaps,
        score:score,
        size:al1.length
    }))
})

app.listen(8080, ()=>{console.log('running')})