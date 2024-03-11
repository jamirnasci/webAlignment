function createAlignmentComponent(matches, totalGaps, score, alignment, size) {
    console.log(alignment)
    let component = 
    `<div class="statistics">
            <h1>Statistics</h1>
            <p>Matches: ${matches}</p>
            <p>Total Gaps: ${totalGaps}</p>
            <p>Score: ${score}</p>
            <p>Similarity: ${Number(matches) / Number(size)}</p>
            <p>Length: ${size}</p>
    </div><br>
    <div class="mono-area"><h1>Alignment</h1>${alignment}</div>`
    return component
}

async function requestAlignment() {
    let seq1 = document.getElementById('seq1').value
    let seq2 = document.getElementById('seq2').value

    if(seq1.length > 0 && seq2.length > 0){
        let response = await fetch("/align", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                seq1: seq1,
                seq2: seq2,
                match: document.getElementById('match').value,
                mismatch: document.getElementById('mismatch').value,
                gap: document.getElementById('gap').value
            })
        })
        let jsonResponse = await response.json()
        let alignmentComponent = await createAlignmentComponent(
            jsonResponse.matches,
            jsonResponse.totalGaps,
            jsonResponse.score,
            jsonResponse.alignment,
            jsonResponse.size
        )
        document.getElementsByTagName('body')[0].innerHTML = alignmentComponent
    }else{
        alert('Insira as 2 sequencias')
    }

}